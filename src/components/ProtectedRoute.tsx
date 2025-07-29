import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // User is not authenticated, redirect to login
        router.push('/login');
      } else if (!requireAuth && user) {
        // User is authenticated but on a public page, redirect to profile
        router.push('/profile');
      }
    }
  }, [user, loading, requireAuth, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#ffffff'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // If authentication check passes, render children
  if (requireAuth && user) {
    return <>{children}</>;
  }

  if (!requireAuth && !user) {
    return <>{children}</>;
  }

  // Don't render anything while redirecting
  return null;
}; 