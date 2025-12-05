import React, { useState, CSSProperties } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/firebaseAuth';
import { Eye, EyeOff } from 'lucide-react';
import { RiHome5Line } from "react-icons/ri";
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
    padding: '20px', // Added padding for smaller screens
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
    padding: '30px', // Reduced padding from 40px
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
    marginBottom: '20px', // Reduced from 30px
  },
  logoText: {
    fontSize: '30px', // Reduced from 34px
    fontWeight: 'bold',
    color: '#d0ece7',
    fontFamily: "'Lilita One', cursive",
  },
  title: {
    fontSize: '22px', // Reduced from 24px
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#ffffff',
  },
  inputGroup: {
    marginBottom: '15px', // Reduced from 20px
  },
  nameGroup: {
    display: 'flex',
    gap: '10px', // Reduced from 12px
    marginBottom: '15px', // Reduced from 20px
  },
  nameInput: {
    flex: 1,
  },
  label: {
    display: 'block',
    marginBottom: '6px', // Reduced from 8px
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px', // Added smaller font size
  },
  input: {
    width: '100%',
    padding: '10px', // Reduced from 12px
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '14px', // Reduced from 16px
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 2px rgba(59,130,246,0.2)',
  },
  button: {
    width: '100%',
    padding: '10px', // Reduced from 12px
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px', // Added margin top
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
    padding: '10px', // Reduced from 12px
    paddingRight: '40px', // Reduced padding right
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontSize: '14px', // Reduced from 16px
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px', // Adjusted right position
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
  loginLink: {
    textAlign: 'center',
    marginTop: '15px', // Reduced from 20px
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px', // Smaller font size
  },
  loginLinkText: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  homeButton: {
    display: 'block',
    marginTop: '15px', // Reduced from 20px
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [isHomeButtonHovered, setIsHomeButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      // Use Firebase Auth directly
      await registerUser(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phoneNumber
      );

      // Show success message with email verification info
      alert(
        `Account created successfully! 🎉\n\n` +
        `A verification email has been sent to ${formData.email}.\n\n` +
        `Please check your inbox and click the verification link to activate your account.\n\n` +
        `📧 Don't see the email? Check your spam/junk folder - it might have landed there!\n\n` +
        `You can now log in to your account.`
      );

      // On successful registration, redirect to the login page
      router.push('/login');

    } catch (error: any) {
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader size="60" color="#3b82f6" speed="1.75" />;
  }

  return (
    <div style={styles.container}>
      <img 
        src="/register.jpg" 
        alt="Background" 
        style={styles.backgroundImage}
      />

      <div style={styles.registerBox}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <div style={styles.logoGroup}>
            <img 
              src="/falcons_logo.png" 
              alt="LAMB FALCONS Logo" 
              style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
            />
          </div>
        </a>
        
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
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '2px' }}>
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
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '2px' }}>
                {errors.phoneNumber}
              </div>
            )}
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                style={{
                  ...styles.passwordInput,
                  ...(errors.password ? { borderColor: '#ef4444' } : {})
                }}
                value={formData.password}
                onChange={handleChange}
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.password && (
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '2px' }}>
                {errors.password}
              </div>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                style={{
                  ...styles.passwordInput,
                  ...(errors.confirmPassword ? { borderColor: '#ef4444' } : {})
                }}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div
                style={{
                  ...styles.eyeIcon,
                  ...(showConfirmPassword ? styles.eyeIconHover : {})
                }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.confirmPassword && (
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '2px' }}>
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
    </div>
  );
};

export default Register;