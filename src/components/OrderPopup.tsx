import React, { useEffect } from 'react';
import { X, Phone, Mail, MessageCircle } from 'lucide-react';
import Head from 'next/head';

interface OrderPopupProps {
  isVisible: boolean;
  onClose: () => void;
  productName?: string;
}

const OrderPopup: React.FC<OrderPopupProps> = ({
  isVisible,
  onClose,
  productName = "Jersey"
}) => {
  useEffect(() => {
    if (isVisible) {
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          backdropFilter: 'blur(5px)'
        }}
        onClick={handleOverlayClick}
      >
      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        border: '2px solid rgba(240, 132, 109, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        animation: 'popupSlideIn 0.3s ease-out'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={24} />
        </button>

        {/* Main Message */}
        <div style={{
          backgroundColor: 'rgba(240, 132, 109, 0.1)',
          border: '1px solid rgba(240, 132, 109, 0.3)',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px'
        }}>
          <p style={{
            color: '#ffffff',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0 0 15px 0',
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Currently, we're not accepting direct orders through our website.
            However, you can still purchase our products by contacting <span style={{ color: '#27F5CC', fontWeight: 'bold' }}>DESIGNEX</span> directly.
          </p>
          <p style={{
            color: '#ffffff',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '0',
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Please contact them with your order details, and they'll be happy to assist you.
          </p>
        </div>

        {/* Contact Details */}
        <div style={{
          marginBottom: '30px'
        }}>
          <h3 style={{
            color: '#f0846d',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Contacts
          </h3>

          {/* Phone Contact */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(240, 132, 109, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(240, 132, 109, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onClick={() => window.open('tel:+1234567890', '_self')}
          >
            <div style={{
              backgroundColor: '#3b82f6',
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px'
            }}>
              <Phone size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                Phone
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px'
              }}>
                +1 (234) 567-8900
              </div>
            </div>
          </div>

          {/* Email Contact */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '15px',
            borderRadius: '12px',
            marginBottom: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(240, 132, 109, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(240, 132, 109, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onClick={() => window.open('mailto:orders@designex.com?subject=Jersey Order Inquiry&body=Hi DESIGNEX,%0D%0A%0D%0AI am interested in ordering a jersey. Please provide me with more details.%0D%0A%0D%0AThank you!', '_self')}
          >
            <div style={{
              backgroundColor: '#f0846d',
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px'
            }}>
              <Mail size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                Email
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px'
              }}>
                orders@designex.com
              </div>
            </div>
          </div>

          {/* WhatsApp Contact */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(240, 132, 109, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(240, 132, 109, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onClick={() => window.open('https://wa.me/1234567890?text=Hi%20DESIGNEX,%0A%0AI%20am%20interested%20in%20ordering%20a%20jersey.%20Please%20provide%20me%20with%20more%20details.%0A%0AThank%20you!', '_blank')}
          >
            <div style={{
              backgroundColor: '#25D366',
              borderRadius: '50%',
              padding: '10px',
              marginRight: '15px'
            }}>
              <MessageCircle size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                WhatsApp
              </div>
              <div style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px'
              }}>
                +1 (234) 567-8900
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes popupSlideIn {
            from {
              opacity: 0;
              transform: translateY(-30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
    </>
  );
};

export default OrderPopup;
