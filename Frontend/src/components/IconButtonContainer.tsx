 import React from 'react';
import IconButton from './IconButton';

export interface IconButtonConfig {
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  variant?: 'primary' | 'secondary';
}

interface IconButtonContainerProps {
  buttons: IconButtonConfig[];
}

const IconButtonContainer: React.FC<IconButtonContainerProps> = ({ buttons }) => (
  <div className="flex flex-row gap-2">
    {buttons.map((button, index) => (
      <IconButton
        key={index}
        icon={button.icon}
        onClick={button.onClick}
        ariaLabel={button.ariaLabel}
        variant={button.variant || 'primary'}
      />
    ))}
  </div>
);

export default IconButtonContainer;
