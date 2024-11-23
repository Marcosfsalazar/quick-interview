import { ButtonHTMLAttributes, ReactNode } from 'react';

interface MessageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  disabled?: boolean;
}

const MessageButton = ({
  children,
  disabled,
  onClick,
  ...buttonProps
}: MessageButtonProps) => {
  return (
    <button
      {...buttonProps}
      className="border-2 px-2"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MessageButton;
