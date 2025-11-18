import React, { useState, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { loginUser, sendPasswordReset } from '../utils/firebaseAuth';
import { Eye, EyeOff } from 'lucide-react';
import { RiHome5Line } from "react-icons/ri";
import ErrorPopup from '../components/ErrorPopup';
import Loader from '../components/Loader';

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#000000',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(8px)',
    opacity: 0.3,
    zIndex: 0,
  },
  loginBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    borderRadius: '20px',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid rgba(255,255,255,0.1)',
    position: 'relative',
    zIndex: 1,
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  logoText: {
    fontSize: '34px',
    fontWeight: 'bold',
    color: '#d0ece7',
    fontFamily: "'Lilita One', cursive",
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center' as const,
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: 'rgba(255,255,255,0.8)',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 2px rgba(59,130,246,0.2)',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#2563eb',
    transform: 'scale(1.02)',
  },
  passwordInputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    width: '100%',
    padding: '12px',
    paddingRight: '45px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  eyeIcon: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.6)',
    transition: 'color 0.3s ease',
    zIndex: 2,
  },
  eyeIconHover: {
    color: 'rgba(255,255,255,0.9)',
  },
  forgotPassword: {
    textAlign: 'center' as const,
    marginTop: '16px',
  },
  forgotPasswordLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
  },
  registerLink: {
    textAlign: 'center' as const,
    marginTop: '20px',
    color: 'rgba(255,255,255,0.6)',
  },
  registerLinkText: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  homeButton: {
    display: 'block',
    marginTop: '20px',
    textAlign: 'center',
    color: '#3b82f6',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  homeButtonHover: {
    color: '#2563eb',
  },
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHomeButtonHovered, setIsHomeButtonHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [messageType, setMessageType] = useState<'error' | 'warning' | 'info'>('error');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setShowError(false);
    router.push('/register');
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address first, then click "Forgot Password?"');
      setMessageType('warning');
      setShowError(true);
      setShowRegisterButton(false);
      return;
    }

    setIsResetLoading(true);
    try {
      await sendPasswordReset(email);
      setErrorMessage(`Password reset email sent to ${email}.\n\nPlease check your inbox and follow the instructions to reset your password.\n\n📧 Don't see the email? Check your spam/junk folder - it might have landed there!`);
      setMessageType('info');
      setShowError(true);
      setShowRegisterButton(false);
    } catch (error: any) {
      let errorMsg = 'Failed to send password reset email. Please try again.';
      
      // Check for specific Firebase error codes
      const errorCode = error.code || '';
      
      if (errorCode === 'auth/user-not-found') {
        errorMsg = 'No account found with this email address. Please check your email or register a new account.';
        setShowRegisterButton(true);
      } else if (errorCode === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid email address.';
        setShowRegisterButton(false);
      } else if (errorCode === 'auth/too-many-requests') {
        errorMsg = 'Too many password reset attempts. Please wait a moment before trying again.';
        setShowRegisterButton(false);
      } else if (error.message.includes('auth/user-not-found')) {
        // Fallback to message checking
        errorMsg = 'No account found with this email address. Please check your email or register a new account.';
        setShowRegisterButton(true);
      } else if (error.message.includes('auth/invalid-email')) {
        errorMsg = 'Please enter a valid email address.';
        setShowRegisterButton(false);
      } else if (error.message.includes('auth/too-many-requests')) {
        errorMsg = 'Too many password reset attempts. Please wait a moment before trying again.';
        setShowRegisterButton(false);
      }
      
      setErrorMessage(errorMsg);
      setMessageType('error');
      setShowError(true);
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Use Firebase Auth directly
      await loginUser(email, password);
      
      // After successful login, redirect to profile
      router.push('/profile');
    } catch (error: any) {
      setIsLoading(false);
      // Parse Firebase error messages and show user-friendly messages
      let userFriendlyMessage = 'Login failed. Please try again.';
      
      // Check for error code first (Firebase error codes)
      const errorCode = (error as any).code || '';
      if (errorCode) {
        if (errorCode === 'auth/invalid-credential') {
          // For security, Firebase doesn't distinguish between wrong password and non-existent email
          // We'll show a general message that covers both cases
          userFriendlyMessage = 'Invalid email or password. Please check your credentials and try again.';
          // Show register button for invalid credential errors to help users who might not have an account
          setShowRegisterButton(true);
        } else if (errorCode === 'auth/user-not-found') {
          userFriendlyMessage = 'No account found with this email address. Please check your email or register a new account.';
          setShowRegisterButton(true);
        } else if (errorCode === 'auth/wrong-password') {
          userFriendlyMessage = 'Incorrect password. Please check your password and try again.';
          setShowRegisterButton(false);
        } else if (errorCode === 'auth/invalid-email') {
          userFriendlyMessage = 'Please enter a valid email address.';
          setShowRegisterButton(false);
        } else if (errorCode === 'auth/too-many-requests') {
          userFriendlyMessage = 'Too many failed attempts. Please wait a moment before trying again.';
          setShowRegisterButton(false);
        } else if (errorCode === 'auth/user-disabled') {
          userFriendlyMessage = 'This account has been disabled. Please contact support.';
          setShowRegisterButton(false);
        }
      } else if (error.message) {
        // Fallback to checking message content for older error formats
        if (error.message.includes('auth/invalid-credential')) {
          userFriendlyMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('auth/user-not-found')) {
          userFriendlyMessage = 'No account found with this email address. Please check your email or register a new account.';
        } else if (error.message.includes('auth/wrong-password')) {
          userFriendlyMessage = 'Incorrect password. Please check your password and try again.';
        } else if (error.message.includes('auth/invalid-email')) {
          userFriendlyMessage = 'Please enter a valid email address.';
        } else if (error.message.includes('auth/too-many-requests')) {
          userFriendlyMessage = 'Too many failed attempts. Please wait a moment before trying again.';
        } else if (error.message.includes('auth/user-disabled')) {
          userFriendlyMessage = 'This account has been disabled. Please contact support.';
        }
      }
      
      setErrorMessage(userFriendlyMessage);
      setMessageType('error');
      setShowError(true);
    }
  };

  if (isLoading) {
    return <Loader size="60" color="#3b82f6" speed="1.75" />;
  }

  return (
    <div style={styles.container}>
      <img 
        src="/login.jpg" 
        alt="Background" 
        style={styles.backgroundImage}
      />
      <div style={styles.loginBox}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <div style={styles.logoGroup}>
            <img 
              src="/falcons_logo.png" 
              alt="LAMB FALCONS Logo" 
              style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
            />
          </div>
        </a>
        
        <h1 style={styles.title}>Welcome Back</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                style={styles.passwordInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                style={{
                  ...styles.eyeIcon,
                  ...(showPassword ? styles.eyeIconHover : {})
                }}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Log In
          </button>
        </form>
        
        <div style={styles.forgotPassword}>
          <a 
            href="#" 
            style={{
              ...styles.forgotPasswordLink,
              opacity: isResetLoading ? 0.6 : 1,
              pointerEvents: isResetLoading ? 'none' : 'auto'
            }}
            onClick={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
          >
            {isResetLoading ? 'Sending...' : 'Forgot Password?'}
          </a>
        </div>
        
        <div style={styles.registerLink}>
          Don't have an account?{' '}
          <a href="/register" style={styles.registerLinkText}>
            Register
          </a>
        </div>
        
        <div
          style={{
            ...styles.homeButton,
            ...(isHomeButtonHovered ? styles.homeButtonHover : {})
          }}
          onClick={() => router.push('/')}
          onMouseEnter={() => setIsHomeButtonHovered(true)}
          onMouseLeave={() => setIsHomeButtonHovered(false)}
        >
          <RiHome5Line />
        </div>
      </div>
      
      {/* Error/Success Popup */}
      <ErrorPopup
        isVisible={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
        type={messageType}
        showRegisterButton={showRegisterButton}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default Login; 