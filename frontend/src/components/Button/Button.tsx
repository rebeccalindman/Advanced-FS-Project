import './Button.css';

interface ButtonProps {
    onClick: (activity: Object) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
    children: React.ReactNode
}

function Button({ onClick, disabled, type = "button", variant, children }: ButtonProps) {
    const buttonVariant = variant || "primary";
    
    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            type={type} 
            className={`button ${buttonVariant}`}
        >
            {children}
        </button>
    );
}

export default Button;

