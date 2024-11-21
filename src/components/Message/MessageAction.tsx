import { ReactNode } from 'react';

interface MessageActionProps {
  children: ReactNode;
}

const MessageAction = ({ children }: MessageActionProps) => {
  return <div className="flex gap-4 self-center">{children}</div>;
};

export default MessageAction;
