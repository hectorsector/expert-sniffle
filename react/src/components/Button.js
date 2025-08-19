import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  size = 'medium' 
}) => {
  const getClassName = () => {
    let className = 'btn';
    className += ` btn-${variant}`;
    className += ` btn-${size}`;
    if (disabled) className += ' btn-disabled';
    return className;
  };

  return (
    <button 
      className={getClassName()}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  );
};

export default Button;