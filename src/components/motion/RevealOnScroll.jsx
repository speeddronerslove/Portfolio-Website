import React, { useEffect, useRef, useState } from 'react';

/**
 * RevealOnScroll component - Animates children when they enter the viewport.
 * Uses Intersection Observer for smooth scroll-triggered reveals.
 */
const RevealOnScroll = ({ 
  children, 
  threshold = 0.1, 
  delay = 0,
  className = '',
  animation = 'fade-up' // fade-up, fade-in, slide-up, etc.
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // observer.unobserve(entry.target); // Uncomment to trigger only once
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  const getAnimationClasses = () => {
    const base = 'transition-all duration-700 ease-out';
    
    switch (animation) {
      case 'fade-up':
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`;
      case 'fade-in':
        return `${base} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'slide-up':
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
      default:
        return `${base} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
