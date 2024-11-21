import { ReactNode } from 'react';

interface MessageRootProps {
  children: ReactNode;
  className?: string;
}

const MessageRoot = ({ children, className }: MessageRootProps) => {
  return (
    <div
      className={`${className} container gap-2 flex items-center justify-start w-full py-0.5 px-2`}
    >
      {children}
    </div>
  );
};

export default MessageRoot;
