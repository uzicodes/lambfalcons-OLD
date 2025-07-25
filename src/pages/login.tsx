import React, { useState, CSSProperties } from 'react';
import { useRouter } from 'next/router';

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
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed!');
        return;
      }

      // After successful login, redirect to profile
      router.push('/profile');
    } catch (error) {
      console.error('Login request failed:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div style={styles.container}>
      <img 
        src="/login.jpg" 
        alt="Background" 
        style={styles.backgroundImage}
      />
      <div style={styles.loginBox}>
        <div style={styles.logoGroup}>
          <img 
            src="/falcons_logo.png" 
            alt="LAMB FALCONS Logo" 
            style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
          />
        </div>
        
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
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
          <a href="#" style={styles.forgotPasswordLink}>
            Forgot Password?
          </a>
        </div>
        
        <div style={styles.registerLink}>
          Don't have an account?{' '}
          <a href="/register" style={styles.registerLinkText}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login; 