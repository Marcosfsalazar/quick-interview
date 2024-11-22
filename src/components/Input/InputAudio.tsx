import Image from 'next/image';
import { useState, useRef } from 'react';

interface InputAudioProps {
  onRecorded: (audioBlob: Blob) => void;
}

const InputAudio = ({ onRecorded }: InputAudioProps) => {
  const [recording, setRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        chunks.current = [];
        onRecorded(blob);
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <button
      className={`border rounded-full p-2 ${recording && 'bg-red-400'}`}
      onClick={recording ? stopRecording : startRecording}
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
