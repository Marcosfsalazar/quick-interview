interface MessageContentProps {
  message: string;
  audioUrl?: string;
}

const MessageContent = ({ message, audioUrl }: MessageContentProps) => {
  return (
    <div className="container border border-blue-500 max-w-8/12 min-w-4 w-full py-0.5 px-2 whitespace-normal">
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
