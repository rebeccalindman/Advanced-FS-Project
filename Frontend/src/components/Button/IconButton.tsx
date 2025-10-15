import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Allow event-based handlers
  ariaLabel: string;
  variant?: 'primary' | 'secondary';
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, ariaLabel, variant = 'primary' }) => (
  <button 
    onClick={onClick} 
    aria-label={ariaLabel} 
    className={`icon-button ${variant}`}
  >
    {icon}
  </button>
);

export default IconButton;