import './Button.css';
interface ButtonProps {
    text: string;
    onClick: (activity: Object) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary";
}

function Button({ text, onClick, disabled, type = "button", variant }: ButtonProps) {
    const buttonVariant = variant || "primary";
    
    return (
        <button 
            onClick={onClick} 
            disabled={disabled} 
            type={type} 
            className={`button ${buttonVariant}`}
        >
            {text}
        </button>
    );
}

export default Button;
