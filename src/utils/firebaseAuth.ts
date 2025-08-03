import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential,
  deleteUser,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  location?: string;
  profilePicture?: string;
  createdAt: Date;
}

// Register new user
export const registerUser = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string, 
  contactNumber: string
): Promise<UserData> => {
  try {
    // Create user in Firebase Auth
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    const userData: Omit<UserData, 'id'> = {
      firstName,
      lastName,
      email,
      contactNumber,
      createdAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    // Send email verification to new user
    try {
      await sendVerificationEmail(user);
    } catch (emailError) {
      // Don't fail registration if email verification fails
      console.warn('Failed to send verification email:', emailError);
    }

    return {
      id: user.uid,
      ...userData,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // Preserve the original Firebase error code and message
    const firebaseError = new Error(error.message);
    (firebaseError as any).code = error.code;
    throw firebaseError;
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get current user data from Firestore
export const getCurrentUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      
      // Convert Firestore timestamp to JavaScript Date if needed
      let createdAt = data.createdAt;
      if (createdAt && typeof createdAt.toDate === 'function') {
        // This is a Firestore timestamp
        createdAt = createdAt.toDate();
      } else if (createdAt && typeof createdAt === 'object' && createdAt.seconds) {
        // This is a Firestore timestamp object
        createdAt = new Date(createdAt.seconds * 1000);
      }
      
      return {
        id: uid,
        ...data,
        createdAt: createdAt,
      } as UserData;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Update user profile data
export const updateUserProfile = async (
  uid: string, 
  updates: Partial<Omit<UserData, 'id' | 'email' | 'createdAt'>>
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, updates, { merge: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update user profile picture
export const updateUserProfilePicture = async (userId: string, profilePicture: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { profilePicture }, { merge: true });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw new Error('Failed to update profile picture');
  }
};

// Update user location
export const updateUserLocation = async (uid: string, location: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { location }, { merge: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update user phone number
export const updateUserPhoneNumber = async (uid: string, contactNumber: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { contactNumber }, { merge: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete user account
export const deleteUserAccount = async (): Promise<void> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }

    // Delete user document from Firestore
    await deleteDoc(doc(db, 'users', currentUser.uid));

    // Delete user from Firebase Auth
    await deleteUser(currentUser);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin + '/login', // Redirect back to login after reset
      handleCodeInApp: false
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Send email verification to new user
export const sendVerificationEmail = async (user: FirebaseUser): Promise<void> => {
  try {
    await sendEmailVerification(user, {
      url: window.location.origin + '/profile', // Redirect to profile after verification
      handleCodeInApp: false
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}; 