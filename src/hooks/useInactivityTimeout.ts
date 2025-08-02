import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { SESSION_CONFIG } from '../config/session';

interface UseInactivityTimeoutOptions {
  timeoutMinutes?: number;
  warningMinutes?: number;
  onWarning?: () => void;
  onLogout?: () => void;
}

export const useInactivityTimeout = ({
  timeoutMinutes = SESSION_CONFIG.TIMEOUT_MINUTES,
  warningMinutes = SESSION_CONFIG.WARNING_MINUTES,
  onWarning,
  onLogout
}: UseInactivityTimeoutOptions = {}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Convert minutes to milliseconds
  const timeoutMs = timeoutMinutes * 60 * 1000;
  const warningMs = warningMinutes * 60 * 1000;

  // Reset timers on user activity
  const resetTimers = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Set warning timer
    warningTimeoutRef.current = setTimeout(() => {
      if (onWarning) {
        onWarning();
      }
    }, timeoutMs - warningMs);

    // Set logout timer
    timeoutRef.current = setTimeout(async () => {
      try {
        await logout();
        router.push('/login');
        if (onLogout) {
          onLogout();
        }
      } catch (error) {
        console.error('Auto logout error:', error);
      }
    }, timeoutMs);
  }, [timeoutMs, warningMs, logout, router, onWarning, onLogout]);

  // Handle user activity events
  const handleActivity = useCallback(() => {
    if (user) {
      resetTimers();
    }
  }, [user, resetTimers]);

  useEffect(() => {
    if (!user) {
      // Clear timers if user is not logged in
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      return;
    }

    // Set up activity listeners
    const events = SESSION_CONFIG.ACTIVITY_EVENTS;

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Initialize timers
    resetTimers();

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [user, handleActivity, resetTimers]);

  // Return functions to manually reset or check status
  return {
    resetTimers,
    getTimeRemaining: () => {
      const timeSinceActivity = Date.now() - lastActivityRef.current;
      return Math.max(0, timeoutMs - timeSinceActivity);
    },
    getTimeUntilWarning: () => {
      const timeSinceActivity = Date.now() - lastActivityRef.current;
      return Math.max(0, (timeoutMs - warningMs) - timeSinceActivity);
    }
  };
}; 