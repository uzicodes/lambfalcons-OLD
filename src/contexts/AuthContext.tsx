import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { getCurrentUserData, logoutUser, updateUserProfile, updateUserProfilePicture, updateUserLocation, onAuthStateChange } from '../utils/firebaseAuth';
import { compressImage, convertImageToBase64 } from '../utils/imageUpload';
import { UserData } from '../utils/firebaseAuth';

interface AuthContextType {
  user: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<Omit<UserData, 'id' | 'email' | 'createdAt'>>) => Promise<void>;
  updateProfilePicture: (file: File) => Promise<void>;
  updateLocation: (location: string) => Promise<void>;
  profilePictureTimestamp: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [profilePictureTimestamp, setProfilePictureTimestamp] = useState(Date.now());

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const data = await getCurrentUserData(firebaseUser.uid);
          setUser(firebaseUser);
          setUserData(data);
        } catch (error) {
          setUser(firebaseUser);
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
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
      const updatedData = await getCurrentUserData(user.uid);
      setUserData(updatedData);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const updateProfilePicture = async (file: File) => {
    if (!user) return;
    
    try {
      const compressedFile = await compressImage(file);
      const base64Data = await convertImageToBase64(compressedFile);
      await updateUserProfilePicture(user.uid, base64Data);
      setUserData(prev => prev ? { ...prev, profilePicture: base64Data } : null);
      setProfilePictureTimestamp(Date.now());
    } catch (error) {
      console.error('Error updating profile picture:', error);
      throw error;
    }
  };

  const updateLocation = async (location: string) => {
    if (!user) throw new Error('No user is currently signed in');
    
    try {
      await updateUserLocation(user.uid, location);
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
    profilePictureTimestamp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 