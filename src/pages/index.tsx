import React, { useState, useEffect, CSSProperties } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { getImageUrl } from '../utils/imageUpload';

// Constants
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&h=1080&fit=crop",
    title: "RISE AS ONE",
    subtitle: "LAMB FALCONS",
    description: "Where champions are forged and legends are born",
  },
  {
    image: "./heroslides1.JPG",
    title: "WAR FOR THE BADGE",
    description: "",
  },
  {
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=1920&h=1080&fit=crop",
    title: "MORE THAN A CLUB",
    description: "Building tomorrow's champions today",
  },
];

const stats = [
  { number: "30+", label: "Active Members" },
  { number: "∞", label: "Sports" },
  { number: "2020", label: "Established" },
];

const newsItems = [
  {
    title: "Drops the Second Kit ft. Designex",
    date: "May 25, 2025",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop",
  },
  {
    title: "Training Facility Opens",
    date: "May 22, 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
  },
  {
    title: "Joins a Jersey partner Designex",
    date: "May 20, 2025",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=250&fit=crop",
  },
];

const photoReelImages = [
  {
    src: "/carousel/DSC_0686.JPG",
    alt: "Team practice session"
  },
  {
    src: "/carousel/Copy of DSC_0225.JPG",
    alt: "Match day celebration"
  },
  {
    src: "/carousel/1685563071406.jpg",
    alt: "Team building exercise"
  },
  {
    src: "/carousel/Copy of DSC_0194.JPG",
    alt: "Training drills"
  },
  {
    src: "/carousel/DSC_0982.JPG",
    alt: "Team meeting"
  },
  {
    src: "/carousel/DSC_0583.JPG",
    alt: "Championship celebration"
  },
  {
    src: "/carousel/Copy of DSC_0474.JPG",
    alt: "Team strategy session"
  },
  {
    src: "/carousel/Copy of DSC_0142.JPG",
    alt: "Fitness training"
  }
];

// Styles
const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#000000",
    color: "#ffffff",
    overflowX: "hidden",
    fontFamily: "Arial, sans-serif",
  },
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 50,
    backgroundColor: "#032f3c",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
    width: "100%",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: "0 0 auto",
  },
  logoCircle: {
    width: "48px",
    height: "48px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
  logoText: {
    fontSize: "34px",
    fontWeight: "",
    color: "white",
    fontFamily: "'Lilita One', cursive",
  },
  navMenuGroup: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    flex: "0 0 auto",
  },
  navLink: {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.3s ease",
    cursor: "pointer",
    fontFamily: "'Merriweather', serif",
  },
  navButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.8)",
    fontWeight: 500,
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  registerBtn: {
    background:
      "linear-gradient(to right, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    padding: "8px 24px",
    borderRadius: "25px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  hero: {
    position: "relative",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroSlide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity 1s ease",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  heroContent: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    maxWidth: "800px",
    padding: "0 20px",
  },
  heroSubtitle: {
    marginBottom: "24px",
    opacity: 0.8,
    color: "#3b82f6",
    fontWeight: 600,
    letterSpacing: "2px",
  },
  heroTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "24px",
    background:
      "linear-gradient(to right, #ffffff, #d1d5db)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontFamily: "'Cinzel', serif",
    whiteSpace: "nowrap",
  },
  heroDescription: {
    fontSize: "1.25rem",
    marginBottom: "32px",
    color: "rgba(255,255,255,0.8)",
    maxWidth: "600px",
    margin: "0 auto 32px",
  },
  heroButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  primaryBtn: {
    background:
      "linear-gradient(to right, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    padding: "16px 32px",
    borderRadius: "25px",
    fontSize: "1.125rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    border: "2px solid rgba(255,255,255,0.3)",
    backgroundColor: "transparent",
    color: "white",
    padding: "16px 32px",
    borderRadius: "25px",
    fontSize: "1.125rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  },
  section: {
    padding: "80px 20px",
  },
  statsSection: {
    background: "#000000",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "60px 20px",
    position: "relative",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  statItem: {
    textAlign: "center",
    position: "relative",
    padding: "30px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transform: "translateY(0)",
  },
  statItemHover: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    transform: "translateY(-5px)",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
  },
  statNumber: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#87b541",
    marginBottom: "12px",
    textShadow: "0 0 30px rgba(135, 181, 65, 0.3)",
    transition: "all 0.3s ease",
  },
  statNumberHover: {
    textShadow: "0 0 40px rgba(135, 181, 65, 0.5)",
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontWeight: 500,
    fontSize: "1.1rem",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
  },
  statLabelHover: {
    color: "rgba(255,255,255,0.9)",
  },
  featuresSection: {
    background:
      "linear-gradient(to bottom, #000000, #111827)",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "24px",
    fontFamily: "'Cinzel', serif",
  },
  sectionSubtitle: {
    fontSize: "1.25rem",
    color: "rgba(255,255,255,0.7)",
    maxWidth: "600px",
    margin: "0 auto 64px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureCard: {
    padding: "32px",
    backgroundColor: "#1a1a1a",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.2s",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  featureCardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "linear-gradient(163deg, #00ff75 0%, #3700ff 100%)",
    opacity: 0,
    transition: "all 0.3s",
    zIndex: 0,
  },
  featureCardContent: {
    position: "relative",
    zIndex: 1,
  },
  featureIcon: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
    fontSize: "40px",
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  featureDescription: {
    color: "rgba(255,255,255,0.7)",
    marginBottom: "24px",
    lineHeight: 1.6,
  },
  newsSection: {
    backgroundColor: "#000000",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  newsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "48px",
  },
  newsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px",
  },
  newsItem: {
    cursor: "pointer",
  },
  newsImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "16px",
  },
  newsDate: {
    color: "#3b82f6",
    fontSize: "0.875rem",
    fontWeight: 600,
    marginBottom: "8px",
  },
  newsTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "16px",
    transition: "color 0.3s ease",
  },
  ctaSection: {
    background:
      "linear-gradient(to right, #1e3a8a, #1d4ed8)",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "3.5rem",
    marginBottom: "24px",
    fontFamily: "'Cinzel', serif",
    fontWeight: "bold",
    color: "white",
  },
  scrollingTextSection: {
    backgroundColor: "#000000",
    padding: "40px 0",
    overflow: "hidden",
    position: "relative",
  },
  scrollingTextContainer: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    animation: "scrollText 12s linear infinite",
  },
  scrollingText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#87b541",
    textShadow: "0 0 20px rgba(135, 181, 65, 0.5)",
    margin: "0 40px",
    fontFamily: "'Cinzel', serif",
    letterSpacing: "2px",
  },
  triangularBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "20px",
    background: "linear-gradient(45deg, transparent 33.333%, rgba(255,255,255,0.1) 33.333%, rgba(255,255,255,0.1) 66.667%, transparent 66.667%)",
    backgroundSize: "20px 20px",
    zIndex: 1,
  },
  triangularBorderBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "20px",
    background: "linear-gradient(-45deg, transparent 33.333%, rgba(255,255,255,0.1) 33.333%, rgba(255,255,255,0.1) 66.667%, transparent 66.667%)",
    backgroundSize: "20px 20px",
    zIndex: 1,
  },
  footer: {
    backgroundColor: "#000000",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    padding: "48px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    display: "flex",
    height: "70px",
    width: "350px",
    marginLeft: "180px",
  },
  socialLink: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    color: "whitesmoke",
    fontSize: "24px",
    textDecoration: "none",
    transition: "0.25s",
    borderRadius: "50px",
  },
  socialSvg: {
    position: "absolute",
    display: "flex",
    width: "60%",
    height: "100%",
    fontSize: "24px",
    fontWeight: 700,
    opacity: 1,
    transition: "opacity 0.25s",
    zIndex: 2,
    padding: "0.25rem",
    cursor: "pointer",
    transform: "scale(1)",
  },
  shadowBtn: {
    padding: "10px 20px",
    border: "none",
    fontSize: "17px",
    color: "#fff",
    borderRadius: "7px",
    letterSpacing: "4px",
    fontWeight: 700,
    textTransform: "uppercase",
    transition: "0.5s",
    transitionProperty: "box-shadow",
    background: "rgb(0,140,255)",
    boxShadow: "0 0 25px rgb(0,140,255)",
    cursor: "pointer",
  },
  partnershipSection: {
    backgroundColor: "#000000",
    padding: "80px 20px",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  partnershipContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
  },
  partnershipContent: {
    flex: 1,
  },
  partnershipTitle: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#e9a090",
    fontFamily: "'Cinzel', serif",
  },
  partnershipDescription: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.6,
    marginBottom: "24px",
  },
  partnershipLogo: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    width: "400px",
    height: "400px",
    margin: "0 auto",
  },
  partnershipLink: {
    color: "#8cf57d",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 0.3s ease",
    display: "inline-block",
    marginTop: "16px",
  },
  photoReelSection: {
    padding: "40px 0",
    backgroundColor: "#000000",
    overflow: "hidden",
    position: "relative",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photoReelContainer: {
    position: "relative",
    width: "1000px",
    height: "300px",
    perspective: "1000px",
    transformStyle: "preserve-3d",
  },
  photoReelItem: {
    position: "absolute",
    width: "250px",
    height: "160px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    left: "50%",
    top: "50%",
    transformOrigin: "50% 50% -200px",
  },
  photoReelImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    filter: "brightness(0.8)",
  },
  fogOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 100%)",
    pointerEvents: "none",
    zIndex: 2,
  },
  fogOverlayLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "200px",
    height: "100%",
    background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)",
    pointerEvents: "none",
    zIndex: 2,
  },
  fogOverlayRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "200px",
    height: "100%",
    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 100%)",
    pointerEvents: "none",
    zIndex: 2,
  },
};

// Add global styles for animations
const globalStyles = `
  @keyframes bounce_613 {
    40% {
      transform: scale(1.4);
    }
    60% {
      transform: scale(0.8);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .shadow__btn:hover {
    box-shadow: 0 0 5px rgb(0,140,255),
                0 0 25px rgb(0,140,255),
                0 0 50px rgb(0,140,255),
                0 0 100px rgb(0,140,255);
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }

  .ball {
    --size: 16px;
    width: var(--size);
    height: var(--size);
    border-radius: 11px;
    margin: 0 10px;
    animation: 2s bounce ease infinite;
  }

  .blue {
    background-color: #4285f5;
  }

  .red {
    background-color: #ea4436;
    animation-delay: 0.25s;
  }

  .yellow {
    background-color: #fbbd06;
    animation-delay: 0.5s;
  }

  .green {
    background-color: #34a952;
    animation-delay: 0.75s;
  }

  @keyframes bounce {
    50% {
      transform: translateY(25px);
    }
  }

  .social-link1:hover {
    background: #f09433;
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\\"#f09433\\", endColorstr=\\"#bc1888\\", GradientType=1);
    animation: bounce_613 0.4s linear;
  }

  .social-link2:hover {
    background-color: #242c34;
    animation: bounce_613 0.4s linear;
  }

  .social-link3:hover {
    background-color: #5865f2;
    animation: bounce_613 0.4s linear;
  }

  .social-link4:hover {
    background-color: #25D366;
    animation: bounce_613 0.4s linear;
  }

  .social-link5:hover {
    background-color: #ff8000;
    animation: bounce_613 0.4s linear;
  }

  @keyframes scroll {
    0% {
      transform: rotate(-5deg) translateX(0);
    }
    50% {
      transform: rotate(5deg) translateX(-50%);
    }
    100% {
      transform: rotate(-5deg) translateX(-100%);
    }
  }

  .photo-reel {
    animation: scroll 20s linear infinite;
  }

  @keyframes scrollText {
    0% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  .scrolling-text {
    animation: scrollText 20s linear infinite;
  }
`;

// Component
const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, userData, profilePictureTimestamp, logout } = useAuth();
  const router = useRouter();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle slide rotation
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mounted, heroSlides.length]);

  // Handle rotation animation
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [mounted]);

  const calculatePosition = (index: number, total: number) => {
    const angle = (index * (360 / total) + rotation) * (Math.PI / 180);
    const x = Math.sin(angle) * 400;
    const z = Math.cos(angle) * 200;
    const scale = (Math.cos(angle) + 1) / 2 * 0.3 + 0.7;
    const opacity = (Math.cos(angle) + 1) / 2 * 0.3 + 0.7;
    const rotateY = (index * (360 / total) + rotation);

    return {
      transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
    };
  };

  const handleNavLinkHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, hover: boolean) => {
    const target = e.currentTarget;
    target.style.color = hover ? "#3b82f6" : "rgba(255,255,255,0.8)";
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, hover: boolean) => {
    const target = e.currentTarget;
    if (hover) {
      target.style.color = "#3b82f6";
      target.style.transform = "scale(1.05)";
    } else {
      target.style.color = "rgba(255,255,255,0.8)";
      target.style.transform = "scale(1)";
    }
  };

  const handleRegisterHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, hover: boolean) => {
    const target = e.currentTarget;
    if (hover) {
      target.style.transform = "scale(1.05)";
    } else {
      target.style.transform = "scale(1)";
    }
  };

  return (
    <div style={styles.container}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logoGroup}>
            <div>
              <img 
                src="/falcons_logo.png" 
                alt="LAMB FALCONS Logo" 
                style={{ width: '65px', height: '65px', objectFit: 'contain' }} 
              />
            </div>
            <div style={{ ...styles.logoText, fontSize: "25px", marginRight: "20px" }}>LAMB FALCONS</div>
          </div>

          <div style={styles.navMenuGroup}>
            <a
              href="/about"
              style={styles.navLink}
              onMouseEnter={(e) => handleNavLinkHover(e, true)}
              onMouseLeave={(e) => handleNavLinkHover(e, false)}
            >
              About Us
            </a>
            <a
              href="/members"
              style={styles.navLink}
              onMouseEnter={(e) => handleNavLinkHover(e, true)}
              onMouseLeave={(e) => handleNavLinkHover(e, false)}
            >
              Members
            </a>
            <a
              href="/jerseys"
              style={styles.navLink}
              onMouseEnter={(e) => handleNavLinkHover(e, true)}
              onMouseLeave={(e) => handleNavLinkHover(e, false)}
            >
              Jerseys
            </a>
            {user ? (
              <>
                <a href="/profile" style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: '40px',
                  height: '40px',
                  marginRight: '10px'
                }}>
                  <img
                    src={getImageUrl(userData?.profilePicture, profilePictureTimestamp)}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '50%'
                    }}
                  />
                </a>
                <button 
                  onClick={logout}
                  className="Btn"
                >
                  <div className="sign">
                    <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32L64 160c0-17.7 14.3-32 32-32l64 0z"></path>
                    </svg>
                  </div>
                  <div className="text">Logout</div>
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="button">
                  <span>Log In</span>
                </a>
                <a href="/register" className="button">
                  <span>Register</span>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        {mounted && heroSlides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.heroSlide,
              backgroundImage: `url(${slide.image})`,
              opacity: index === currentSlide ? 1 : 0,
            }}
          >
            <div style={styles.heroOverlay} />
          </div>
        ))}

        <div style={{
          ...styles.heroContent,
          marginTop: currentSlide === 1 ? "-375px" : "0"
        }}>
          {mounted && (
            <>
              <div style={styles.heroSubtitle}>{heroSlides[currentSlide]?.subtitle}</div>
              <h1 style={styles.heroTitle}>{heroSlides[currentSlide]?.title}</h1>
              <p style={styles.heroDescription}>{heroSlides[currentSlide]?.description}</p>
            </>
          )}
          <div style={styles.heroButtons}>
            {currentSlide !== 1 && (
              <button 
                className="shadow__btn"
                style={{
                  ...styles.shadowBtn,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px"
                }}
                onClick={() => window.location.href = '/register'}
              >
                Join The Club
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ ...styles.section, ...styles.statsSection }}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{
              ...styles.statItem,
              ...(mounted && hoveredStat === index ? styles.statItemHover : {})
            }}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div 
              style={{
                ...styles.statNumber,
                ...(mounted && hoveredStat === index ? styles.statNumberHover : {})
              }}
            >
              {stat.number}
            </div>
            <div 
              style={{
                ...styles.statLabel,
                ...(mounted && hoveredStat === index ? styles.statLabelHover : {})
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Photo Reel Section */}
      <div style={styles.photoReelSection}>
        <div style={styles.photoReelContainer}>
          {mounted && photoReelImages.map((image, index) => (
            <div
              key={index}
              style={{
                ...styles.photoReelItem,
                ...calculatePosition(index, photoReelImages.length),
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={styles.photoReelImage}
              />
              <div style={styles.fogOverlay} />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section style={{ ...styles.section, ...styles.featuresSection }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ ...styles.sectionTitle, color: "#e9a090" }}>Why Choose LAMB FALCONS ?</h2>
          <p style={styles.sectionSubtitle}>
            Experience excellence in every aspect of club membership and athletic development
          </p>

          <div style={styles.featuresGrid}>
            <div
              style={styles.featureCard}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "scale(0.98)";
                target.style.boxShadow = "0px 0px 30px 1px rgba(0, 255, 117, 0.30)";
                const gradient = target.querySelector('[data-gradient]') as HTMLDivElement;
                if (gradient) {
                  gradient.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "scale(1)";
                target.style.boxShadow = "none";
                const gradient = target.querySelector('[data-gradient]') as HTMLDivElement;
                if (gradient) {
                  gradient.style.opacity = "0";
                }
              }}
            >
              <div style={styles.featureCardGradient} data-gradient></div>
              <div style={styles.featureCardContent}>
                <div style={styles.featureIcon}>🏆</div>
                <h3 style={{...styles.featureTitle, textAlign: "center"}}>Championship Legacy</h3>
                <p style={styles.featureDescription}>
                  Join a club with a proven track record of success and a commitment to excellence in
                  every competition.
                </p>
              </div>
            </div>

            <div
              style={styles.featureCard}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "scale(0.98)";
                target.style.boxShadow = "0px 0px 30px 1px rgba(0, 255, 117, 0.30)";
                const gradient = target.querySelector('[data-gradient]') as HTMLDivElement;
                if (gradient) {
                  gradient.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "scale(1)";
                target.style.boxShadow = "none";
                const gradient = target.querySelector('[data-gradient]') as HTMLDivElement;
                if (gradient) {
                  gradient.style.opacity = "0";
                }
              }}
            >
              <div style={styles.featureCardGradient} data-gradient></div>
              <div style={styles.featureCardContent}>
                <div style={styles.featureIcon}>👥</div>
                <h3 style={{...styles.featureTitle, textAlign: "center"}}>Strong Community</h3>
                <p style={styles.featureDescription}>
                  Be part of a tight-knit community where lifelong friendships are formed & everyone
                  supports each other.
                </p>
                <div style={{ color: "#3b82f6", fontWeight: 600, cursor: "pointer" }} onClick={() => window.location.href = '/register'}>Join Now →</div>
              </div>
            </div>

            <div
              style={styles.featureCard}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "scale(0.98)";
                target.style.boxShadow = "0px 0px 30px 1px rgba(0, 255, 117, 0.30)";
                const gradient = target.querySelector('[data-gradient]') as HTMLDivElement;
                if (gradient) {
                  gradient.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLDivElement;
                target.style.transform = "scale(1)";
                target.style.boxShadow = "none";
                const gradient = target.querySelector('[data-gradient]') as HTMLDivElement;
                if (gradient) {
                  gradient.style.opacity = "0";
                }
              }}
            >
              <div style={styles.featureCardGradient} data-gradient></div>
              <div style={styles.featureCardContent}>
                <div style={styles.featureIcon}>⭐</div>
                <h3 style={{...styles.featureTitle, textAlign: "center"}}>Elite Training</h3>
                <p style={styles.featureDescription}>
                  Access world-class training facilities to elevate your performance
                  to new heights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section style={{ ...styles.section, ...styles.newsSection }}>
        <div style={styles.newsHeader}>
          <h2 style={{ ...styles.sectionTitle, fontSize: "2.5rem", marginBottom: 0, color: "#e9a090" }}>Latest News</h2>
          <div className="wrapper" style={{ height: "auto", marginLeft: "20px" }}>
            <div className="ball blue"></div>
            <div className="ball red"></div>
            <div className="ball yellow"></div>
            <div className="ball green"></div>
          </div>
        </div>

        <div style={styles.newsGrid}>
          {newsItems.map((item, index) => (
            <article key={index} style={styles.newsItem}>
              <img src={item.image} alt={item.title} style={styles.newsImage} />
              <div style={styles.newsDate}>{item.date}</div>
              <h3 style={styles.newsTitle}>{item.title}</h3>
              <div style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Read More →</div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ ...styles.section, ...styles.ctaSection }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={styles.ctaTitle}>Ready to Roar?</h2>
          <p style={{ fontSize: "1.15rem", marginBottom: "32px", color: "rgba(255,255,255,0.9)" }}>
            Be part of something Extraordinary !
          </p>
          <button
            style={{
              backgroundColor: "white",
              color: "#1e3a8a",
              border: "none",
              padding: "16px 48px",
              borderRadius: "25px",
              fontSize: "1.125rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.backgroundColor = "#f3f4f6";
              target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.backgroundColor = "white";
              target.style.transform = "scale(1)";
            }}
            onClick={() => window.location.href = '/register'}
          >
            Become a Falcon Today 
          </button>
        </div>
      </section>

      {/* Scrolling Text Section */}
      <section style={styles.scrollingTextSection}>
        <div style={styles.triangularBorder}></div>
        <div style={styles.triangularBorderBottom}></div>
        <div style={styles.scrollingTextContainer}>
          <span style={styles.scrollingText}>🏆 CHAMPIONS ARE MADE HERE </span>
          <span style={styles.scrollingText}>⚽ UNLEASH YOUR POTENTIAL </span>
          <span style={styles.scrollingText}>🔥 JOIN THE FALCONS FAMILY </span>
          <span style={styles.scrollingText}>💪 TRAIN LIKE A CHAMPION </span>
          <span style={styles.scrollingText}>🏅 EXCELLENCE IN EVERY MATCH </span>
          <span style={styles.scrollingText}>⚡ RISE AS ONE </span>
          <span style={styles.scrollingText}>🏆 CHAMPIONS ARE MADE HERE </span>
          <span style={styles.scrollingText}>⚽ UNLEASH YOUR POTENTIAL </span>
          <span style={styles.scrollingText}>🔥 JOIN THE FALCONS FAMILY </span>
          <span style={styles.scrollingText}>💪 TRAIN LIKE A CHAMPION </span>
          <span style={styles.scrollingText}>🏅 EXCELLENCE IN EVERY MATCH </span>
          <span style={styles.scrollingText}>⚡ RISE AS ONE </span>
        </div>
      </section>

      {/* Partnership Section */}
      <section style={styles.partnershipSection}>
        <div style={styles.partnershipContainer}>
          <div style={styles.partnershipContent}>
            <h2 style={styles.partnershipTitle}>Official Kit Partner</h2>
            <p style={styles.partnershipDescription}>
              We are proud to announce our partnership with Designex, our official kit partner! 
            </p>
            <p style={styles.partnershipDescription}>
              Designex brings years of expertise in sports apparel manufacturing, ensuring our players 
              have access to the best equipment while representing our club with pride.
            </p>
            <a 
              href="/jerseys" 
              style={styles.partnershipLink}
            >
              Click here for the Kit's!
            </a>
          </div>
          <div style={styles.partnershipLogo}>
            <img 
              src="/designex_logo.png" 
              alt="Designex Logo" 
              style={{ 
                maxWidth: "300px", 
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "50%"
              }} 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.logoGroup}>
          <div>
            <img 
              src="/falcons_logo.png" 
              alt="LAMB FALCONS Logo" 
              style={{ width: '58px', height: '58px', objectFit: 'contain' }} 
            />
          </div>
          <div style={{ ...styles.logoText, fontSize: "25px" }}>LAMB FALCONS</div>
          <div style={styles.card}>
            <a href="https://github.com/uzicodes/LAMB-FALCONS" style={{...styles.socialLink, ...styles.socialLink1}} className="social-link1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="#" style={{...styles.socialLink, ...styles.socialLink2}} className="social-link2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://discord.gg/R93pEB6G" style={{...styles.socialLink, ...styles.socialLink3}} className="social-link3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://wa.me/8801762791500" style={{...styles.socialLink, ...styles.socialLink4}} className="social-link4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="mailto:utshozi11@gmail.com?subject=Contact%20LAMB%20FALCONS" style={{...styles.socialLink, ...styles.socialLink5}} className="social-link5" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)" }}>
          <div>© 2025 LAMB FALCONS.</div> 
          <br></br>
          <div>All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;