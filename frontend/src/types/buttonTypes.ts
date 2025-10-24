export interface ButtonConfig {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }
  
  export interface ButtonContainerProps {
    buttons: ButtonConfig[];
  }