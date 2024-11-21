import Image from 'next/image';
import { useState } from 'react';

const InputAudio = () => {
  const [recording, setRecording] = useState<boolean>(false);
  return (
    <button
      className={`border rounded-full p-2 ${recording && 'bg-red-400'}`}
      onClick={() => setRecording((curr) => !curr)}
    >
      <Image
        src={`/icons/${recording ? 'stop' : 'mic'}.png`}
        alt="a mic image"
        width={20}
        height={20}
      />
    </button>
  );
};

export default InputAudio;
