import { MessageType } from '@/types';
import { Message } from '../Message';
import { Input } from '../Input/Index';

interface ChatWindowProps {
  messages: MessageType[];
  currentStep: number;
  handleOptionSelect: (option: string) => void;
  handleAudioRecorded: (audioBlob: Blob) => void;
}

const ChatWindow = ({
  messages,
  currentStep,
  handleOptionSelect,
  handleAudioRecorded,
}: ChatWindowProps) => {
  return (
    <div className="container flex flex-col py-8 relative">
      <div className="flex flex-col gap-4 mb-24">
        {messages.map((msg, index) => (
          <Message.Root
            key={index}
            className={msg.sender === 'user' ? 'flex-row-reverse' : ''}
          >
            <Message.Icon src={`/icons/${msg.sender}.png`} />
            <div className="flex flex-col gap-4">
              <Message.Content message={msg.content} />
              {msg.options && (
                <Message.Action>
                  {msg.options.map((option) => (
                    <Message.Button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </Message.Button>
                  ))}
                </Message.Action>
              )}
            </div>
          </Message.Root>
        ))}
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
