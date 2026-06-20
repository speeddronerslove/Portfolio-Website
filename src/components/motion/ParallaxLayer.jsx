import React, { useEffect, useRef } from 'react';

/**
 * ParallaxLayer component for creating parallax scrolling effects.
 * Moves at different speeds based on scroll position.
 */
const ParallaxLayer = ({ 
  children, 
  speed = 0.5, // 0 = no movement, 1 = normal scroll speed, negative for opposite direction
  className = '',
  style = {},
  ...props 
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const translateY = scrollY * speed;
      
      ref.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{
        transform: 'translateY(0px)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
