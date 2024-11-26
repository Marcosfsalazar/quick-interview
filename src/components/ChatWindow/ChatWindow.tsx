import { EvaluationData, JobDescriptionProps, MessageType } from '@/types';
import { Message } from '../Message';
import { Input } from '../Input/Index';
import { useEffect, useRef, useState } from 'react';
import Countdown from '../Countdown/Countdown';
import { useModal } from '@/hooks/useModal';
import DownloadPdf from '../DownloadPdf/DownloadPdf';

interface ChatWindowProps {
  messages: MessageType[];
  currentStep: number;
  handleOptionSelect: (option: string, messageIndex: number) => void;
  handleAudioRecorded: (audioBlob: Blob) => void;
  evaluationData?: EvaluationData;
  jobData: JobDescriptionProps;
}

const ChatWindow = ({
  messages,
  currentStep,
  evaluationData,
  jobData,
  handleOptionSelect,
  handleAudioRecorded,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioUrlsRef = useRef<string[]>([]);
  const [showTimer, setShowTimer] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const newAudioUrls = messages
      .filter((msg) => msg.audioUrl)
      .map((msg) => msg.audioUrl!)
      .filter((url) => !audioUrlsRef.current.includes(url));

    audioUrlsRef.current.push(...newAudioUrls);

    return () => {
      audioUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      audioUrlsRef.current = [];
    };
  }, [messages]);

  const onTimeEnd = () => {
    setShowTimer(false);
  };

  const handleOpenDownloadModal = () => {
    if (evaluationData) {
      openModal(
        <DownloadPdf evaluationData={evaluationData} jobData={jobData} />,
      );
    } else {
      console.error('Dados de avaliação não disponíveis.');
    }
  };

  return (
    <div className="container flex flex-col py-2 lg:py-8 relative lg:max-w-[768px] lg:highlight xl:max-w-[1024px] lg:p-14 lg:rounded">
      <div className="flex flex-col gap-4 mb-24 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message.Root
            key={index}
            className={msg.sender === 'user' ? 'flex-row-reverse' : ''}
          >
            <Message.Icon src={`/icons/${msg.sender}.png`} />
            <div className="flex flex-col gap-4">
              {msg.isTyping ? (
                <Message.TypingIndicator />
              ) : (
                <Message.Content
                  key={msg.content + index}
                  message={msg.content}
                  audioUrl={msg.audioUrl}
                  className={
                    !msg.audioUrl
                      ? msg.sender === 'bot'
                        ? 'message-bot'
                        : 'message-user'
                      : ''
                  }
                />
              )}
              {msg.options && (
                <Message.Action>
                  {msg.options.map((option) => (
                    <Message.Button
                      key={option}
                      disabled={msg.optionsDisabled}
                      onClick={() => {
                        handleOptionSelect(option, index);
                      }}
                    >
                      {option}
                    </Message.Button>
                  ))}
                </Message.Action>
              )}
            </div>
          </Message.Root>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {currentStep === 2 && (
        <div className="w-full flex justify-center items-center flex-col">
          {showTimer && <Countdown initialTime={300} onComplete={onTimeEnd} />}
          <Input.Root>
            <Input.Audio
              onRecorded={handleAudioRecorded}
              showTimer={showTimer}
              setShowTimer={setShowTimer}
            />
          </Input.Root>
        </div>
      )}
      {currentStep === 3 && evaluationData && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleOpenDownloadModal}
            className="bg-appGreen text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Baixar PDF da Avaliação
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
