import React from 'react';
import Button from './Button/Button';
import { ButtonContainerProps } from '../types/buttonTypes';

const ButtonContainer: React.FC<ButtonContainerProps> = ({ buttons }) => (
  <div className="flex flex-row gap-2.5 h-fit">
    {buttons.map((button, index) => (
      <Button
        key={index}
        text={button.text}
        onClick={button.onClick}
        disabled={button.disabled}
        type={button.type || 'button'}
        variant={button.variant || 'primary'}
      />
    ))}
  </div>
);

export default ButtonContainer;
