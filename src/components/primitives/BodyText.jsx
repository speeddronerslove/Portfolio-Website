import React from 'react';

/**
 * BodyText component for consistent paragraph and body text styling.
 * Supports different sizes and lead text.
 */
const BodyText = ({ 
  children, 
  size = 'base', 
  lead = false, 
  className = '', 
  as = 'p',
  ...props 
}) => {
  const baseClasses = 'text-gray-600 dark:text-gray-400';
  
  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed'
  };

  const leadClasses = lead ? 'text-xl text-gray-700 dark:text-gray-300 font-light' : '';

  const Component = as;

  return (
    <Component 
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.base} ${leadClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default BodyText;
