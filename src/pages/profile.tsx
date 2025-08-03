import React, { useState, CSSProperties, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Mail, Phone, MapPin, Calendar, Edit, LogOut, User, Trash2 } from 'lucide-react';
import { SiGooglehome } from "react-icons/si";
import Head from 'next/head';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { deleteUserAccount } from '../utils/firebaseAuth';
import { getImageUrl } from '../utils/imageUpload';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  role: string;
  avatar: string;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '100px',
    paddingBottom: '50px',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 50,
    backgroundColor: '#032f3c',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    width: '100%',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '0 0 auto',
  },
  logoText: {
    fontSize: '25px',
    color: 'white',
    fontFamily: "'Lilita One', cursive",
  },
  navMenuGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    flex: '0 0 auto',
  },
  navLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    fontFamily: "'Merriweather', serif",
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '30px',
  },
  sidebar: {
    background: 'linear-gradient(145deg, rgba(3, 47, 60, 0.8), rgba(0, 0, 0, 0.9))',
    borderRadius: '20px',
    padding: '30px',
    border: '1px solid rgba(240, 132, 109, 0.2)',
    height: 'fit-content',
  },
  mainContent: {
    background: 'linear-gradient(145deg, rgba(3, 47, 60, 0.8), rgba(0, 0, 0, 0.9))',
    borderRadius: '20px',
    padding: '30px',
    border: '1px solid rgba(240, 132, 109, 0.2)',
  },
  profileSection: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: '0 auto 15px',
    border: '3px solid rgba(240, 132, 109, 0.3)',
    objectFit: 'cover',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#ffffff',
  },
  role: {
    fontSize: '14px',
    color: '#FFD700',
    marginBottom: '15px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '8px',
  },
  menuItemActive: {
    background: 'rgba(240, 132, 109, 0.1)',
    color: '#ffffff',
  },
  menuItemHover: {
    background: 'rgba(240, 132, 109, 0.05)',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#f0846d',
    fontFamily: "'Cinzel', serif",
    textAlign: 'center',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  infoCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '15px',
    padding: '20px',
    border: '1px solid rgba(240, 132, 109, 0.1)',
  },
  infoTitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '8px',
  },
  infoValue: {
    fontSize: '18px',
    color: '#ffffff',
    fontWeight: '500',
  },
  editForm: {
    marginTop: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '8px',
    color: 'rgba(255,255,255,0.8)',
  },
  formInput: {
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
  formInputFocus: {
    borderColor: '#f0846d',
    boxShadow: '0 0 0 2px rgba(240,132,109,0.2)',
  },
  saveButton: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#f0846d',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  saveButtonHover: {
    backgroundColor: '#e06d56',
    transform: 'scale(1.02)',
  },
  imageUpload: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(240,132,109,0.3)',
  },
  uploadButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid rgba(240,132,109,0.3)',
    backgroundColor: 'transparent',
    color: '#f0846d',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  uploadButtonHover: {
    backgroundColor: 'rgba(240,132,109,0.1)',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Merriweather', serif",
  },
  navButtonHover: {
    color: '#ffffff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
  },
  logoutBtn: {
    background: "linear-gradient(to right, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    padding: "8px 24px",
    borderRadius: "25px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  popup: {
    display: 'inline-block',
    textRendering: 'optimizeLegibility',
    position: 'relative',
  },
  burger: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#00bf63',
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.1s ease-in-out',
    outline: '0.125em solid transparent',
    outlineOffset: '0',
  },
  burgerHover: {
    transform: 'scale(1.1)',
  },
  burgerActive: {
    transform: 'scale(0.95)',
  },
  popupWindow: {
    transform: 'scale(0.8)',
    visibility: 'hidden',
    opacity: 0,
    position: 'absolute',
    padding: '0.625em 0.25em',
    background: '#eee',
    fontFamily: '"Poppins", sans-serif',
    color: '#333',
    borderRadius: '0.375em',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
    border: '0.0625em solid #ccc',
    top: 'calc(3.125em + 0.125em + 0.125em)',
    left: 0,
    transition: 'all 0.1s ease-in-out',
    marginTop: '10px',
  },
  popupWindowActive: {
    transform: 'scale(1)',
    visibility: 'visible',
    opacity: 1,
  },
  popupList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  popupButton: {
    outline: 'none',
    width: '100%',
    border: 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    color: '#333',
    fontSize: '17px',
    padding: '0.375em 1rem',
    whiteSpace: 'nowrap',
    borderRadius: '0.375em',
    cursor: 'pointer',
    columnGap: '0.875em',
  },
  popupButtonHover: {
    color: '#fff',
    background: '#00bf63',
  },
};

const Profile = () => {
  const router = useRouter();
  const { user, userData, loading, profilePictureTimestamp, logout, updateProfilePicture, updateLocation, updatePhoneNumber } = useAuth();
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    location: "",
    joinDate: "Jan 2024",
    role: "User",
    avatar: ""
  });
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    location: "",
    joinDate: "Jan 2024",
    role: "User",
    avatar: ""
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // If user is authenticated and we have user data, update the profile
    if (user && userData) {
      const profile: UserProfile = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.contactNumber,
        location: userData.location || 'Not Set',
        joinDate: userData.createdAt ? 
          (userData.createdAt instanceof Date ? 
            userData.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) :
            new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          ) : 'Jan 2024',
        role: "User",
        avatar: userData.profilePicture || "/dummy_pic.jpg"
      };
      setUserProfile(profile);
      setEditedProfile(profile);
    }
  }, [user, userData, loading, router]);

  // Check if a field has been changed
  const isFieldChanged = (field: keyof UserProfile): boolean => {
    return editedProfile[field] !== userProfile[field];
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and you will lose all your data permanently.'
    );
    
    if (confirmed) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully. You can now register again with the same email.');
        router.push('/register');
      } catch (error: any) {
        console.error('Delete account error:', error);
        alert('Failed to delete account: ' + error.message);
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await updateProfilePicture(file);
        // The profile picture will be updated automatically through the context
        // We don't need to manually update the local state here
      } catch (error) {
        alert('Failed to update profile picture. Please try again.');
      }
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isUpdating) return; // Prevent multiple submissions
    
    setIsUpdating(true);
    
    try {
      let hasUpdates = false;
      let successMessages: string[] = [];
      
      // Update location in database if it has changed and is not empty
      if (editedProfile.location !== userProfile.location && editedProfile.location.trim() !== '') {
        await updateLocation(editedProfile.location);
        hasUpdates = true;
        successMessages.push('Location updated');
        
        // Update local state to reflect the change
        setUserProfile(prev => ({
          ...prev,
          location: editedProfile.location
        }));
      }
      
      // Update phone number in database if it has changed and is not empty
      if (editedProfile.phone !== userProfile.phone && editedProfile.phone.trim() !== '') {
        await updatePhoneNumber(editedProfile.phone);
        hasUpdates = true;
        successMessages.push('Phone number updated');
        
        // Update local state to reflect the change
        setUserProfile(prev => ({
          ...prev,
          phone: editedProfile.phone
        }));
      }
      
      if (hasUpdates) {
        setActiveMenuItem('profile');
        alert(`Profile updated successfully!\n${successMessages.join('\n')}`);
      } else {
        alert('No changes detected. Please modify at least one field before saving.');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please check your internet connection and try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'edit-profile', icon: Edit, label: 'Edit Profile' },
    { id: 'delete-account', icon: Trash2, label: 'Delete Account' },
  ];

  return (
    <ProtectedRoute>
      <div style={styles.container}>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </Head>

      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={styles.logoGroup}>
              <img 
                src="/falcons_logo.png" 
                alt="LAMB FALCONS Logo" 
                style={{ width: '65px', height: '65px', objectFit: 'contain' }} 
              />
              <div style={styles.logoText}>LAMB FALCONS</div>
            </div>
          </a>
          <div style={styles.navMenuGroup}>
            <a href="/" style={{...styles.navLink, display: 'flex', alignItems: 'center'}}>
              <SiGooglehome size={20} />
            </a>
            <a href="/about" style={styles.navLink}>About Us</a>
            <a href="/members" style={styles.navLink}>Members</a>
            <a href="/jerseys" style={styles.navLink}>Jerseys</a>
            <button
                  onClick={handleLogout}
                  className="Btn"
                >
                  <div className="sign">
                    <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32L64 160c0-17.7 14.3-32 32-32l64 0z"></path>
                    </svg>
                  </div>
                  <div className="text">Logout</div>
                </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.profileSection}>
            <img 
              src={getImageUrl(userData?.profilePicture, profilePictureTimestamp)}
              alt="Profile" 
              style={styles.avatar} 
            />
            <div style={styles.name}>{`${userProfile.firstName} ${userProfile.lastName}`}</div>
            <div style={styles.role}>{userProfile.role}</div>
          </div>

          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                ...styles.menuItem,
                ...(activeMenuItem === item.id ? styles.menuItemActive : {}),
                ...(isHovered === item.id ? styles.menuItemHover : {}),
              }}
              onClick={() => setActiveMenuItem(item.id)}
              onMouseEnter={() => setIsHovered(item.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <item.icon size={20} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          {activeMenuItem === 'profile' ? (
            <>
              <h2 style={styles.sectionTitle}>Profile Overview</h2>
              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <div style={styles.infoTitle}>Email</div>
                  <div style={styles.infoValue}>{userProfile.email}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoTitle}>Phone</div>
                  <div style={styles.infoValue}>{userProfile.phone}</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoTitle}>Location</div>
                  <div style={styles.infoValue}>
                    {userProfile.location || "Not set"}
                  </div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoTitle}>Member Since</div>
                  <div style={styles.infoValue}>{userProfile.joinDate}</div>
                </div>
              </div>
            </>
          ) : activeMenuItem === 'edit-profile' ? (
            <>
              <h2 style={styles.sectionTitle}>Edit Profile</h2>
              <form onSubmit={handleProfileUpdate} style={styles.editForm}>
                <div style={styles.imageUpload}>
                  <img 
                    src={getImageUrl(userData?.profilePicture, profilePictureTimestamp)}
                    alt="Profile" 
                    style={styles.imagePreview} 
                  />
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    <div
                      style={{
                        ...styles.uploadButton,
                        ...(isUploadHovered ? styles.uploadButtonHover : {})
                      }}
                      onMouseEnter={() => setIsUploadHovered(true)}
                      onMouseLeave={() => setIsUploadHovered(false)}
                    >
                      {userData?.profilePicture ? "Change Photo" : "Add Photo"}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.6)',
                      marginTop: '5px',
                      textAlign: 'center'
                    }}>
                      Max file size: 2MB • Recommended: 400x400px
                    </div>
                  </label>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Phone Number
                    {isFieldChanged('phone') && (
                      <span style={{
                        marginLeft: '8px',
                        fontSize: '12px',
                        color: '#f0846d',
                        fontWeight: 'normal'
                      }}>
                        • Modified
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                    style={{
                      ...styles.formInput,
                      ...(isFieldChanged('phone') ? {
                        borderColor: '#f0846d',
                        boxShadow: '0 0 0 1px rgba(240,132,109,0.3)'
                      } : {})
                    }}
                    placeholder="Enter your phone number (e.g., +1 234-567-8900)"
                    required
                  />
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '5px'
                  }}>
                    Include your country code for better accessibility
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Location
                    {isFieldChanged('location') && (
                      <span style={{
                        marginLeft: '8px',
                        fontSize: '12px',
                        color: '#f0846d',
                        fontWeight: 'normal'
                      }}>
                        • Modified
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={editedProfile.location}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    style={{
                      ...styles.formInput,
                      ...(isFieldChanged('location') ? {
                        borderColor: '#f0846d',
                        boxShadow: '0 0 0 1px rgba(240,132,109,0.3)'
                      } : {})
                    }}
                    placeholder="Enter your location (e.g., New York, NY)"
                  />
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '5px'
                  }}>
                    This helps other members know where you're located
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  style={{
                    ...styles.saveButton,
                    ...(isSaveHovered ? styles.saveButtonHover : {}),
                    ...(isUpdating ? { 
                      opacity: 0.7, 
                      cursor: 'not-allowed',
                      transform: 'none'
                    } : {})
                  }}
                  onMouseEnter={() => !isUpdating && setIsSaveHovered(true)}
                  onMouseLeave={() => setIsSaveHovered(false)}
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </>
          ) : activeMenuItem === 'delete-account' ? (
            <>
              <h2 style={styles.sectionTitle}>Delete Account</h2>
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  color: '#ef4444',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}>
                  ⚠️ Warning: This action cannot be undone
                </h3>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  Deleting your account will permanently remove all your data from our system. 
                  This includes your profile information, preferences, and any associated data.
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  We are sad to see you leave :(
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  Hope that we will see you again!
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={handleDeleteAccount}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                    }}
                  >
                    Delete My Account
                  </button>
                  <button
                    onClick={() => setActiveMenuItem('profile')}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'rgba(255,255,255,0.8)',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default Profile; 