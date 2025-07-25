import React, { useState, CSSProperties, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Mail, Phone, MapPin, Calendar, Edit, LogOut, User } from 'lucide-react';
import Head from 'next/head';

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
  const [activeMenuItem, setActiveMenuItem] = useState('profile');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isSaveHovered, setIsSaveHovered] = useState(false);
  const [isUploadHovered, setIsUploadHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (!response.ok) {
          // If the token is invalid or expired, the middleware should have already
          // redirected, but as a fallback, we can redirect here too.
          router.push('/login');
          return;
        }
        const data = await response.json();
        if (data.success) {
          // The API returns a user object with firstName, lastName, email, contactNumber
          // Let's map it to the structure the component expects.
          const profile: UserProfile = {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            phone: data.user.contactNumber,
            // These fields are not in our User model, so we'll provide defaults
            location: 'Not Set', 
            joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            role: "User",
            avatar: "" // Default avatar
          };
          setUserProfile(profile);
          setEditedProfile(profile);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Save updated profile to localStorage
    localStorage.setItem('userData', JSON.stringify(userProfile));
    // Switch back to profile view
    setActiveMenuItem('profile');
  };

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'edit-profile', icon: Edit, label: 'Edit Profile' },
  ];

  return (
    <div style={styles.container}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logoGroup}>
            <img 
              src="/falcons_logo.png" 
              alt="LAMB FALCONS Logo" 
              style={{ width: '65px', height: '65px', objectFit: 'contain' }} 
            />
            <div style={styles.logoText}>LAMB FALCONS</div>
          </div>
          <div style={styles.navMenuGroup}>
            <a href="/" style={styles.navLink}>Home</a>
            <a href="/about" style={styles.navLink}>About Us</a>
            <a href="/members" style={styles.navLink}>Members</a>
            <a href="/jerseys" style={styles.navLink}>Jerseys</a>
            <button 
              onClick={() => router.push('/profile')}
              style={styles.burger}
            >
              <User size={14} color="#333" />
            </button>
            <button
              onClick={handleLogout}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              style={{
                ...styles.logoutBtn,
                ...(isLogoutHovered ? { opacity: 0.9, transform: 'scale(1.02)' } : {})
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
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
              src={userProfile.avatar || "/default-avatar.png"} 
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
          ) : (
            <>
              <h2 style={styles.sectionTitle}>Edit Profile</h2>
              <form onSubmit={handleProfileUpdate} style={styles.editForm}>
                <div style={styles.imageUpload}>
                  <img 
                    src={userProfile.avatar || "/default-avatar.png"} 
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
                      {userProfile.avatar ? "Change Photo" : "Add Photo"}
                    </div>
                  </label>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Phone Number</label>
                  <input
                    type="tel"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                    style={styles.formInput}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Location</label>
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                    style={styles.formInput}
                    placeholder="Enter your location"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.saveButton,
                    ...(isSaveHovered ? styles.saveButtonHover : {})
                  }}
                  onMouseEnter={() => setIsSaveHovered(true)}
                  onMouseLeave={() => setIsSaveHovered(false)}
                >
                  Save Changes
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 