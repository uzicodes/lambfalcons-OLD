import React from 'react';
import { CSSProperties } from 'react';
import { HomeIcon } from 'lucide-react';

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '100px', // Space for navbar
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
  pageTitle: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '42px',
    fontWeight: 'bold',
    fontFamily: "'Cinzel', serif",
    color: '#f0846d',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  locationSection: {
    marginTop: '60px',
    textAlign: 'center',
  },
  locationTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#e9a090',
    fontFamily: "'Cinzel', serif",
  },
  locationDescription: {
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '40px',
    maxWidth: '600px',
    margin: '0 auto 40px',
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))',
    pointerEvents: 'none',
    zIndex: 1,
  },
  mapFrame: {
    width: "100%",
    height: "400px",
    border: "none",
    filter: "grayscale(100%)",
    transition: "filter 0.3s ease",
  },
  contactSection: {
    padding: "60px 20px",
    backgroundColor: "#000000",
    textAlign: "center",
  },
  contactTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#e9a090",
    fontFamily: "'Cinzel', serif",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 0",
  },
  contactCard: {
    padding: "32px",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  contactCardHover: {
    transform: "translateY(-5px)",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.2)",
  },
  contactIcon: {
    fontSize: "2.5rem",
    marginBottom: "16px",
    color: "#e9a090",
  },
  contactLabel: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.7)",
    marginBottom: "8px",
  },
  contactValue: {
    fontSize: "1.2rem",
    color: "#ffffff",
    fontWeight: 500,
  },
};

const About = () => {
  return (
    <div style={styles.container}>
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
            <a href="/" style={{...styles.navLink, display: 'flex', alignItems: 'center'}}>
              <HomeIcon size={20} />
            </a>
            <a href="/about" style={{...styles.navLink, color: '#3b82f6', fontWeight: 'bold'}}>About Us</a>
            <a href="/members" style={styles.navLink}>Members</a>
            <a href="/jerseys" style={styles.navLink}>Jerseys</a>
            <a href="/login" className="button"><span>Log In</span></a>
            <a href="/register" className="button"><span>Register</span></a>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div style={styles.content}>
        <h1 style={styles.pageTitle}></h1>
        
        {/* Location Section */}
        <div style={styles.locationSection}>
          <h2 style={styles.locationTitle}>Where to Find Us ?</h2>
          <p style={styles.locationDescription}>
            Visit our facility at LAMB Hospital. We're located here making it easily accessible for all our members & visitors.
          </p>
          <div style={styles.mapContainer}>
            <div style={styles.mapOverlay} />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.1234567890123!2d88.884086!3d25.660773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM5JzM4LjgiTiA4OMKwNTMnMDIuNyJF!5e0!3m2!1sen!2sbd!4v1234567890!5m2!1sen!2sbd&markers=color:0x8B0000%7C25.660773,88.884086"
              style={styles.mapFrame}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={styles.contactSection}>
        <h2 style={styles.contactTitle}>Get in Touch</h2>
        <div style={styles.contactGrid}>
          <div 
            style={styles.contactCard}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-5px)";
              target.style.backgroundColor = "rgba(255,255,255,0.08)";
              target.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.backgroundColor = "rgba(255,255,255,0.05)";
              target.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <div style={styles.contactIcon}>📍</div>
            <div style={styles.contactLabel}>Address</div>
            <div style={styles.contactValue}>LAMB Hospital, Parbatipur, Dinajpur</div>
          </div>

          <div 
            style={styles.contactCard}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-5px)";
              target.style.backgroundColor = "rgba(255,255,255,0.08)";
              target.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.backgroundColor = "rgba(255,255,255,0.05)";
              target.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <div style={styles.contactIcon}>📞</div>
            <div style={styles.contactLabel}>Phone</div>
            <div style={styles.contactValue}>+880 1762-791500</div>
          </div>

          <div 
            style={styles.contactCard}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-5px)";
              target.style.backgroundColor = "rgba(255,255,255,0.08)";
              target.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.backgroundColor = "rgba(255,255,255,0.05)";
              target.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <div style={styles.contactIcon}>✉️</div>
            <div style={styles.contactLabel}>Email</div>
            <div style={styles.contactValue}>utshozi11@gmail.com</div>
          </div>

          <div 
            style={styles.contactCard}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(-5px)";
              target.style.backgroundColor = "rgba(255,255,255,0.08)";
              target.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = "translateY(0)";
              target.style.backgroundColor = "rgba(255,255,255,0.05)";
              target.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <div style={styles.contactIcon}>⏰</div>
            <div style={styles.contactLabel}>Hours</div>
            <div style={styles.contactValue}>Sun - Sat: 10AM - 12AM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 