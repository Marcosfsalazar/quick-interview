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
      className="border border-appAquamarine px-2 rounded-sm text-appPurple font-semibold bg-[lightGreen]"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MessageButton;
