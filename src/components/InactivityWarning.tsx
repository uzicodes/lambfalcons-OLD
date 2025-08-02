import React, { useState, useEffect } from 'react';
import { SESSION_CONFIG } from '../config/session';

interface InactivityWarningProps {
  isVisible: boolean;
  timeRemaining: number;
  onExtend: () => void;
  onLogout: () => void;
}

const InactivityWarning: React.FC<InactivityWarningProps> = ({
  isVisible,
  timeRemaining,
  onExtend,
  onLogout
}) => {
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    if (!isVisible) {
      setCountdown(timeRemaining);
      return;
    }

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1000) {
          clearInterval(interval);
          onLogout();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, timeRemaining, onLogout]);

  if (!isVisible) return null;

  const minutes = Math.floor(countdown / 60000);
  const seconds = Math.floor((countdown % 60000) / 1000);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: '#1f2937',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        border: '2px solid #ef4444',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ef4444',
          marginBottom: '16px',
        }}>
          {SESSION_CONFIG.WARNING_MESSAGE.TITLE}
        </div>
        
        <p style={{
          color: '#d1d5db',
          marginBottom: '24px',
          lineHeight: '1.5',
        }}>
          {SESSION_CONFIG.WARNING_MESSAGE.DESCRIPTION}{' '}
          <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
          {' '}due to inactivity.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}>
          <button
            onClick={onExtend}
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#059669';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#10b981';
            }}
          >
            {SESSION_CONFIG.WARNING_MESSAGE.EXTEND_BUTTON}
          </button>
          
          <button
            onClick={onLogout}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }}
          >
            {SESSION_CONFIG.WARNING_MESSAGE.LOGOUT_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityWarning; 