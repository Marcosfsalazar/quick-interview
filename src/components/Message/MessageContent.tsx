interface MessageContentProps {
  message: string;
}

const MessageContent = ({ message }: MessageContentProps) => {
  return (
    <div className="container border border-blue-500 max-w-8/12 min-w-4 w-full py-0.5 px-2 whitespace-normal">
      {message}
    </div>
  );
};

export default MessageContent;
