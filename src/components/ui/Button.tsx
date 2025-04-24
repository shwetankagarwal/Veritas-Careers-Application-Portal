import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  fullWidth = false,
  onClick,
  icon,
}) => {
  const baseStyles = "font-medium rounded-md inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400",
    outline: "bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 focus:ring-primary-500",
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500",
    danger: "bg-error-600 text-white hover:bg-error-700 focus:ring-error-500",
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };
  
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer";
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;