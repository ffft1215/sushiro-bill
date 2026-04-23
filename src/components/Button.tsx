import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-light-black border-[3px] border-dark-black
        px-6 py-[10px] rounded-lg
        font-ibm-thai font-normal text-light-white text-2xl
        whitespace-nowrap leading-normal
        hover:bg-opacity-90 active:scale-95 transition-transform
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {label}
    </button>
  );
};

export default Button;