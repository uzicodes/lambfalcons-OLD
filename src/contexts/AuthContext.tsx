import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChange, getCurrentUserData, logoutUser, updateUserProfile, updateUserProfilePicture, updateUserLocation } from '../utils/firebaseAuth';
import { uploadProfileImage, compressImage } from '../utils/imageUpload';
import { UserData } from '../utils/firebaseAuth';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Omit<UserData, 'id' | 'email' | 'createdAt'>>) => Promise<void>;
  updateProfilePicture: (file: File) => Promise<void>;
  updateLocation: (location: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
      
      if (firebaseUser) {
        try {
          const data = await getCurrentUserData(firebaseUser.uid);
          setUser(firebaseUser);
          setUserData(data);
          console.log('User data loaded:', data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(firebaseUser);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
        console.log('User logged out');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (updates: Partial<Omit<UserData, 'id' | 'email' | 'createdAt'>>) => {
    if (!user) throw new Error('No user is currently signed in');
    try {
      await updateUserProfile(user.uid, updates);
      // Refresh user data after update
      const updatedData = await getCurrentUserData(user.uid);
      setUserData(updatedData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const updateProfilePicture = async (file: File) => {
    if (!user) throw new Error('No user is currently signed in');
    try {
      // Compress the image first
      const compressedFile = await compressImage(file);
      
      // Upload to Firebase Storage
      const downloadURL = await uploadProfileImage(compressedFile, user.uid);
      
      // Update the profile picture URL in Firestore
      await updateUserProfilePicture(user.uid, downloadURL);
      
      // Refresh user data after update
      const updatedData = await getCurrentUserData(user.uid);
      setUserData(updatedData);
    } catch (error) {
      console.error('Update profile picture error:', error);
      throw error;
    }
  };

  const updateLocation = async (location: string) => {
    if (!user) throw new Error('No user is currently signed in');
    try {
      await updateUserLocation(user.uid, location);
      // Refresh user data after update
      const updatedData = await getCurrentUserData(user.uid);
      setUserData(updatedData);
    } catch (error) {
      console.error('Update location error:', error);
      throw error;
    }
  };

  const value = {
    user,
    userData,
    loading,
    logout,
    updateProfile,
    updateProfilePicture,
    updateLocation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 