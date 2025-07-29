import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  UserCredential,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
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
    throw new Error(error.message);
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
      return {
        id: uid,
        ...userDoc.data(),
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