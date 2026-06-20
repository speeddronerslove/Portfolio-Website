import React from 'react';

/**
 * Heading component for consistent typography across the app.
 * Supports different levels (h1-h6) and custom styling.
 */
const Heading = ({ 
  level = 1, 
  children, 
  className = '', 
  ...props 
}) => {
  const Tag = `h${level}`;
  
  const baseClasses = 'font-bold tracking-tight text-gray-900 dark:text-white';
  
  const levelClasses = {
    1: 'text-5xl md:text-6xl',
    2: 'text-4xl md:text-5xl',
    3: 'text-3xl md:text-4xl',
    4: 'text-2xl md:text-3xl',
    5: 'text-xl md:text-2xl',
    6: 'text-lg md:text-xl'
  };

  return (
    <Tag 
      className={`${baseClasses} ${levelClasses[level] || levelClasses[1]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Heading;
