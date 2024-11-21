import { ButtonHTMLAttributes, ReactNode } from 'react';

interface MessageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const MessageButton = ({ children, ...buttonProps }: MessageButtonProps) => {
  return (
    <button {...buttonProps} className="border-2 px-2">
      {children}
    </button>
  );
};

export default MessageButton;
