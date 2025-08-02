import React, { useState } from 'react';
import { useInactivityTimeout } from '../hooks/useInactivityTimeout';
import InactivityWarning from './InactivityWarning';
import { SESSION_CONFIG } from '../config/session';

interface InactivityWrapperProps {
  children: React.ReactNode;
}

const InactivityWrapper: React.FC<InactivityWrapperProps> = ({ children }) => {
  const [showWarning, setShowWarning] = useState(false);

  const { resetTimers } = useInactivityTimeout({
    timeoutMinutes: SESSION_CONFIG.TIMEOUT_MINUTES,
    warningMinutes: SESSION_CONFIG.WARNING_MINUTES,
    onWarning: () => {
      setShowWarning(true);
    },
    onLogout: () => {
      setShowWarning(false);
    }
  });

  const handleExtendSession = () => {
    setShowWarning(false);
    resetTimers();
  };

  const handleLogoutNow = () => {
    setShowWarning(false);
    // The logout will be handled by the hook
  };

  return (
    <>
      {children}
      <InactivityWarning
        isVisible={showWarning}
        timeRemaining={SESSION_CONFIG.WARNING_MINUTES * 60 * 1000} // Convert minutes to milliseconds
        onExtend={handleExtendSession}
        onLogout={handleLogoutNow}
      />
    </>
  );
};

export default InactivityWrapper; 