import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ErrorPopupProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  type?: 'error' | 'warning' | 'info';
  showRegisterButton?: boolean;
  onRegister?: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isVisible,
  message,
  onClose,
  type = 'error',
  showRegisterButton = false,
  onRegister
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          backgroundColor: '#fef3c7',
          borderColor: '#f59e0b',
          iconColor: '#f59e0b',
          textColor: '#92400e'
        };
      case 'info':
        return {
          backgroundColor: '#dbeafe',
          borderColor: '#3b82f6',
          iconColor: '#3b82f6',
          textColor: '#1e40af'
        };
      default: // error
        return {
          backgroundColor: '#fee2e2',
          borderColor: '#ef4444',
          iconColor: '#ef4444',
          textColor: '#991b1b'
        };
    }
  };

  const typeStyles = getTypeStyles();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      animation: 'slideIn 0.3s ease-out',
    }}>
      <div style={{
        backgroundColor: typeStyles.backgroundColor,
        border: `2px solid ${typeStyles.borderColor}`,
        borderRadius: '12px',
        padding: '16px 20px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        position: 'relative',
        backdropFilter: 'blur(10px)',
      }}>
        {/* Icon */}
        <div style={{
          flexShrink: 0,
          marginTop: '2px',
        }}>
          <AlertCircle 
            size={20} 
            color={typeStyles.iconColor}
          />
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          minWidth: 0,
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: typeStyles.textColor,
            marginBottom: '4px',
            lineHeight: '1.4',
          }}>
            {type === 'error' ? 'Login Failed' : 
             type === 'warning' ? 'Warning' : 'Information'}
          </div>
          <div style={{
            fontSize: '14px',
            color: typeStyles.textColor,
            opacity: 0.9,
            lineHeight: '1.5',
          }}>
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {showRegisterButton && onRegister && (
            <button
              onClick={onRegister}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                fontSize: '12px',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }}
            >
              Register
            </button>
          )}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              color: typeStyles.iconColor,
              opacity: 0.7,
              transition: 'opacity 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPopup; 