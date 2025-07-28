import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChange, getCurrentUserData, logoutUser } from '../utils/firebaseAuth';
import { UserData } from '../utils/firebaseAuth';

interface AuthState {
  user: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    userData: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        try {
          const userData = await getCurrentUserData(user.uid);
          setAuthState({
            user,
            userData,
            loading: false,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuthState({
            user,
            userData: null,
            loading: false,
          });
        }
      } else {
        setAuthState({
          user: null,
          userData: null,
          loading: false,
        });
      }
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

  return {
    ...authState,
    logout,
  };
}; 