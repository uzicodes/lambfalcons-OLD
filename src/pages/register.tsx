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
  registerBox: {
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
    textAlign: 'center',
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  nameGroup: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
  },
  nameInput: {
    flex: 1,
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
  loginLink: {
    textAlign: 'center',
    marginTop: '20px',
    color: 'rgba(255,255,255,0.6)',
  },
  loginLinkText: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [isHovered, setIsHovered] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  const validatePhoneNumber = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 11 || digitsOnly.length === 14;
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields on submission
    const newErrors = {
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email must contain @ and .';
    }
    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 11 or 14 digits';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // You can set an error state here to show the message to the user
        console.error(data.message);
        alert(data.message); // Simple alert for now
        return;
      }

      // On successful registration, redirect to the login page
      router.push('/login');

    } catch (error) {
      console.error('Registration failed:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <img 
        src="/register.jpg" 
        alt="Background" 
        style={styles.backgroundImage}
      />
      <div style={styles.registerBox}>
        <div style={styles.logoGroup}>
          <img 
            src="/falcons_logo.png" 
            alt="LAMB FALCONS Logo" 
            style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
          />
        </div>
        
        <h1 style={styles.title}>Create Account</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.nameGroup}>
            <div style={styles.nameInput}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                style={styles.input}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.nameInput}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                style={styles.input}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              style={{
                ...styles.input,
                ...(errors.email ? { borderColor: '#ef4444' } : {})
              }}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.email}
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              style={{
                ...styles.input,
                ...(errors.phoneNumber ? { borderColor: '#ef4444' } : {})
              }}
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+880"
              required
            />
            {errors.phoneNumber && (
              <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.phoneNumber}
              </div>
            )}
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              style={{
                ...styles.input,
                ...(errors.password ? { borderColor: '#ef4444' } : {})
              }}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? { borderColor: '#ef4444' } : {})
              }}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.confirmPassword}
              </div>
            )}
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
            Register
          </button>
        </form>
        
        <div style={styles.loginLink}>
          Already have an account?{' '}
          <a href="/login" style={styles.loginLinkText}>
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register; 