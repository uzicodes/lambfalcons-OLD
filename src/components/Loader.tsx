'use client';
import React, { useEffect, useState } from 'react';

interface LoaderProps {
  size?: string;
  color?: string;
  speed?: string;
}

// Singleton to track if ldrs has been loaded
let ldrsLoaded = false;

const Loader: React.FC<LoaderProps> = ({ 
  size = "60", 
  color = "coral", 
  speed = "1.75" 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoaderReady, setIsLoaderReady] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsClient(true);
    
    // Dynamically import and register the loader only once
    const loadLoader = async () => {
      if (ldrsLoaded) {
        setIsLoaderReady(true);
        return;
      }
      
      try {
        const { tailChase } = await import('ldrs');
        tailChase.register();
        ldrsLoaded = true;
        setIsLoaderReady(true);
      } catch (error) {
        console.error('Failed to load ldrs:', error);
        setIsLoaderReady(true); // Still set to true to show fallback
      }
    };
    
    loadLoader();
  }, []);

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#000000',
    width: '100vw',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    zIndex: 9999
  };

  // Show simple loading text during SSR or while ldrs is loading
  if (!isClient || !isLoaderReady) {
    return (
      <div style={{ ...loaderStyle, color: '#ffffff' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '2px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          Loading...
        </div>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `
        }} />
      </div>
    );
  }

  return (
    <div style={loaderStyle}>
      <l-tail-chase
        size={size}
        speed={speed}
        color={color}
      />
    </div>
  );
};

export default Loader;
