import { MessageType } from '@/types';
import { Message } from '../Message';
import { Input } from '../Input/Index';
import { useEffect, useRef } from 'react';

interface ChatWindowProps {
  messages: MessageType[];
  currentStep: number;
  handleOptionSelect: (option: string, messageIndex: number) => void;
  handleAudioRecorded: (audioBlob: Blob) => void;
}

const ChatWindow = ({
  messages,
  currentStep,
  handleOptionSelect,
  handleAudioRecorded,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioUrlsRef = useRef<string[]>([]);

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

  return (
    <div className="container flex flex-col py-8 relative">
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
                  message={msg.content}
                  audioUrl={msg.audioUrl}
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
        <Input.Root>
          <Input.Audio onRecorded={handleAudioRecorded} />
        </Input.Root>
      )}
    </div>
  );
};

export default ChatWindow;
