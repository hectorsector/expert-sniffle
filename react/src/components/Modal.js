import React, { useState } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 200);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const getModalClass = () => {
    let className = 'modal';
    className += ` modal-${size}`;
    if (isAnimating) className += ' modal-closing';
    return className;
  };

  if (!isOpen && !isAnimating) {
    return null;
  }

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div 
        className={getModalClass()}
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className="modal-header" data-testid="modal-header">
          {title && (
            <h2 id="modal-title" data-testid="modal-title">
              {title}
            </h2>
          )}
          {showCloseButton && (
            <button 
              className="modal-close"
              onClick={handleClose}
              data-testid="modal-close-btn"
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>
        <div className="modal-body" data-testid="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;