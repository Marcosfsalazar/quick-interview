'use client';

import { JobDescriptionProps } from '@/types';
import { useChat } from '@/hooks/useChat';
import ChatWindow from './ChatWindow';

interface ChatWindowContainerProps {
  data: JobDescriptionProps;
}

const ChatWindowContainer = ({ data }: ChatWindowContainerProps) => {
  const { state, handleOptionSelect, handleAudioRecorded } = useChat(data);

  return (
    <ChatWindow
      messages={state.messages}
      currentStep={state.currentStep}
      handleOptionSelect={handleOptionSelect}
      handleAudioRecorded={handleAudioRecorded}
      evaluationData={state.evaluationData}
      jobData={data}
    />
  );
};

export default ChatWindowContainer;
