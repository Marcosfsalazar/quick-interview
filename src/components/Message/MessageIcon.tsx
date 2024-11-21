import Image from 'next/image';

interface MessageIconProps {
  src: string;
}

const MessageIcon = ({ src }: MessageIconProps) => {
  return (
    <Image
      src={src}
      alt="avatar icon"
      width={50}
      height={50}
      className="max-w-[42px] max-h-[42px] self-start"
    />
  );
};

export default MessageIcon;
