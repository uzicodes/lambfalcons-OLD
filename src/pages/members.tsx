import React, { useState } from 'react';
import { CSSProperties } from 'react';
import { Crown, Users, Mail, Phone, MapPin, Calendar, HomeIcon } from 'lucide-react';
import Head from 'next/head';

interface Member {
  id: number;
  name: string;
  role: string;
  phone: string;
  image: string;
  email: string;
  location: string;
  joinDate: string;
  avatar: string;
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(to bottom, #000000, #111827)',
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
  button: {
    backgroundColor: '#f0846d',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '80px',
    fontSize: '56px',
    fontWeight: 'bold',
    fontFamily: "'Cinzel', serif",
    color: '#7fd3ec',
    textShadow: '0 0 20px rgba(240, 132, 109, 0.3)',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  section: {
    marginBottom: '60px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '2px solid rgba(240, 132, 109, 0.3)',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#f0846d',
    fontFamily: "'Cinzel', serif",
    textAlign: 'center',
    flexGrow: 1,
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.7)',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px',
    padding: '10px 0',
  },
  memberCard: {
    background: 'linear-gradient(145deg, rgba(3, 47, 60, 0.8), rgba(0, 0, 0, 0.9))',
    borderRadius: '20px',
    padding: '25px',
    border: '1px solid rgba(240, 132, 109, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  adminCard: {
    background: 'linear-gradient(145deg, rgba(240, 132, 109, 0.15), rgba(3, 47, 60, 0.8))',
    border: '1px solid rgba(240, 132, 109, 0.4)',
    boxShadow: '0 8px 32px rgba(240, 132, 109, 0.1)',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent, rgba(240, 132, 109, 0.1), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },
  memberAvatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    marginBottom: '15px',
    border: '3px solid rgba(240, 132, 109, 0.3)',
    transition: 'transform 0.3s ease',
    objectFit: 'cover',
  },
  adminAvatar: {
    border: '3px solid #f0846d',
    boxShadow: '0 0 20px rgba(240, 132, 109, 0.3)',
  },
  memberName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#ffffff',
  },
  memberRole: {
    fontSize: '14px',
    color: '#28d770',
    marginBottom: '15px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  adminRole: {
    color: '#ffd700',
  },
  memberInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '40px',
    padding: '20px',
    background: 'rgba(3, 47, 60, 0.3)',
    borderRadius: '15px',
    border: '1px solid rgba(240, 132, 109, 0.2)',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#f0846d',
    display: 'block',
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
};

const adminMembers: Member[] = [
  {
    id: 1,
    name: "UTSHO HEAVEN CHOWDHURY",
    role: "Admin",
    phone: "01762791500",
    image: "/members/utsho.jpg",
    email: "utshozi11@gmail.com",
    location: "New York, USA",
    joinDate: "Jan 2020",
    avatar: "/members/utsho.jpg"
  },
  {
    id: 2,
    name: "PROTTOY KHALKO",
    role: "Admin",
    phone: "+1 234-567-8902",
    image: "https://images.unsplash.com/photo-1494790108755-2616b2e42bca?w=150&h=150&fit=crop&crop=face",
    email: "sarah.c@example.com",
    location: "Los Angeles, USA",
    joinDate: "Feb 2020",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e42bca?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "LINKON POLLOB ROY",
    role: "Admin",
    phone: "+1 234-567-8903",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "michael.j@example.com",
    location: "Chicago, USA",
    joinDate: "Mar 2020",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];

const generalMembers: Member[] = [
  { id: 4, name: "ARONNO BLESS MONDAL", role: "Member", phone: "+1 234-567-8904", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", email: "emma.w@example.com", location: "Houston, USA", joinDate: "Apr 2020", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { id: 5, name: "THANGSRIK J CHAMBUGONG", role: "Member", phone: "+1 234-567-8905", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", email: "david.b@example.com", location: "Phoenix, USA", joinDate: "May 2020", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { id: 6, name: "PREETOM BARMON", role: "Member", phone: "+1 234-567-8906", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", email: "lisa.g@example.com", location: "Philadelphia, USA", joinDate: "Jun 2020", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
  { id: 7, name: "UTSASH ANINDHO CHOWDHURY", role: "Member", phone: "+1 234-567-8907", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", email: "james.m@example.com", location: "San Antonio, USA", joinDate: "Jul 2020", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" },
  { id: 8, name: "BOPON ROY", role: "DESIGNER", phone: "+1 234-567-8908", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face", email: "sophie.t@example.com", location: "San Diego, USA", joinDate: "Aug 2020", avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face" },
  { id: 9, name: "JESON GOURAB DAS", role: "Member", phone: "+1 234-567-8909", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face", email: "ryan.a@example.com", location: "Dallas, USA", joinDate: "Sep 2020", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" },
  { id: 10, name: "JEVIARS MIKHA DAS", role: "Member", phone: "+1 234-567-8910", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face", email: "maya.p@example.com", location: "San Jose, USA", joinDate: "Oct 2020", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" },
  { id: 11, name: "PAPON KHALO", role: "Member", phone: "+1 234-567-8911", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face", email: "connor.d@example.com", location: "Austin, USA", joinDate: "Nov 2020", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face" },
  { id: 12, name: "ANDREW SAMUEL HEMBROM", role: "Member", phone: "+1 234-567-8912", image: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=150&h=150&fit=crop&crop=face", email: "zoe.m@example.com", location: "Jacksonville, USA", joinDate: "Dec 2020", avatar: "https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=150&h=150&fit=crop&crop=face" },
  { id: 13, name: "MATTHEW HEMBROM", role: "Member", phone: "+1 234-567-8913", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face", email: "ethan.w@example.com", location: "Indianapolis, USA", joinDate: "Jan 2021", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face" },
  { id: 14, name: "Isabella Lee", role: "Member", phone: "+1 234-567-8914", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face", email: "isabella.l@example.com", location: "San Francisco, USA", joinDate: "Feb 2021", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face" },
  { id: 15, name: "Lucas Thompson", role: "Member", phone: "+1 234-567-8915", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face", email: "lucas.t@example.com", location: "Columbus, USA", joinDate: "Mar 2021", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" },
  { id: 16, name: "Aria Kim", role: "Member", phone: "+1 234-567-8916", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face", email: "aria.k@example.com", location: "Fort Worth, USA", joinDate: "Apr 2021", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face" },
  { id: 17, name: "Noah Rodriguez", role: "Member", phone: "+1 234-567-8917", image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face", email: "noah.r@example.com", location: "Charlotte, USA", joinDate: "May 2021", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face" },
  { id: 18, name: "Chloe Jackson", role: "Member", phone: "+1 234-567-8918", image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face", email: "chloe.j@example.com", location: "Seattle, USA", joinDate: "Jun 2021", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face" },
  { id: 19, name: "Mason Clark", role: "Member", phone: "+1 234-567-8919", image: "https://images.unsplash.com/photo-1578133671540-edad0b3d689e?w=150&h=150&fit=crop&crop=face", email: "mason.c@example.com", location: "Denver, USA", joinDate: "Jul 2021", avatar: "https://images.unsplash.com/photo-1578133671540-edad0b3d689e?w=150&h=150&fit=crop&crop=face" },
  { id: 20, name: "Avery Lewis", role: "Member", phone: "+1 234-567-8920", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face", email: "avery.l@example.com", location: "Washington D.C., USA", joinDate: "Aug 2021", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face" },
  { id: 21, name: "Logan Walker", role: "Member", phone: "+1 234-567-8921", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face", email: "logan.w@example.com", location: "Boston, USA", joinDate: "Sep 2021", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face" },
  { id: 22, name: "Grace Hall", role: "Member", phone: "+1 234-567-8922", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face", email: "grace.h@example.com", location: "Nashville, USA", joinDate: "Oct 2021", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" },
  { id: 23, name: "Carter Young", role: "Member", phone: "+1 234-567-8923", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face", email: "carter.y@example.com", location: "Portland, USA", joinDate: "Nov 2021", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" }
];

const MemberCard = ({ member, isAdmin = false }: { member: Member, isAdmin?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.memberCard,
        ...(isAdmin ? styles.adminCard : {}),
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(240, 132, 109, 0.2)' 
          : '0 8px 25px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        ...styles.cardGlow,
        opacity: isHovered ? 1 : 0,
      }} />
      
      <div style={{
        ...styles.memberAvatar,
        ...(isAdmin ? styles.adminAvatar : {}),
        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
      }}>
        <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
      </div>
      
      <div style={styles.memberName}>{member.name}</div>
      <div style={{
        ...styles.memberRole,
        ...(isAdmin ? styles.adminRole : {}),
      }}>
        {member.role}
      </div>
      
      <div style={styles.memberInfo}>
        <div style={styles.infoItem}>
          <Mail size={14} />
          <span>{member.email}</span>
        </div>
        <div style={styles.infoItem}>
          <Phone size={14} />
          <span>{member.phone}</span>
        </div>
      </div>
    </div>
  );
};

const Members = () => {
  return (
    <div style={styles.container}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logoGroup}>
            <div>
              <img 
                src="/falcons_logo.png" 
                alt="LAMB FALCONS Logo" 
                style={{ width: '65px', height: '65px', objectFit: 'contain' }} 
              />
            </div>
            <div style={styles.logoText}>LAMB FALCONS</div>
          </div>
          <div style={styles.navMenuGroup}>
            <a href="/" style={{...styles.navLink, display: 'flex', alignItems: 'center'}}>
              <HomeIcon size={20} />
            </a>
            <a href="/about" style={styles.navLink}>About Us</a>
            <a href="/members" style={{...styles.navLink, color: '#3b82f6', fontWeight: 'bold'}}>Members</a>
            <a href="/jerseys" style={styles.navLink}>Jerseys</a>
            <a href="/login" className="button"><span>Log In</span></a>
            <a href="/register" className="button"><span>Register</span></a>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div style={styles.content}>
        {/* Admin Panel Section */}
        <div style={{...styles.section, marginTop: 0}}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Admin Panel</h2>
            <span style={styles.sectionSubtitle}></span>
          </div>
          <div style={styles.cardsGrid}>
            {adminMembers.map((member) => (
              <MemberCard key={member.id} member={member} isAdmin={true} />
            ))}
          </div>
        </div>

        {/* General Members Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>General Members</h2>
            <span style={styles.sectionSubtitle}></span>
          </div>
          <div style={styles.cardsGrid}>
            {generalMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div style={styles.statsContainer}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>3</span>
            <span style={styles.statLabel}>Admins</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>20</span>
            <span style={styles.statLabel}>General Members</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>23</span>
            <span style={styles.statLabel}>Total Members</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>5</span>
            <span style={styles.statLabel}>Years Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;