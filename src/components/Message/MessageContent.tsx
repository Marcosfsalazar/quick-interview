interface MessageContentProps {
  message: string;
  audioUrl?: string;
  className?: string;
}

const MessageContent = ({
  message,
  audioUrl,
  className,
}: MessageContentProps) => {
  return (
    <div
      className={`container font-bold rounded max-w-8/12 min-w-4 w-full py-1 px-2 whitespace-normal ${className}`}
    >
      {audioUrl ? (
        <audio controls src={audioUrl}>
          Seu navegador não suporta esse recurso!
        </audio>
      ) : (
        message
      )}
    </div>
  );
};

export default MessageContent;
