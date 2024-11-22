'use client';

import { useEffect, useReducer, useRef } from 'react';
import { Input } from '../Input/Index';
import { Message } from '../Message';
import {
  CHAT_ACTION,
  ChatAction,
  ChatState,
  ChatWindowProps,
  MessageType,
} from '@/types/ChatWindowProps';

const initialState: ChatState = {
  messages: [],
  currentStep: 0,
  complianceAnswers: [],
  questionResponses: [],
  options: null,
  currentQuestionIndex: 0,
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case CHAT_ACTION.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case CHAT_ACTION.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case CHAT_ACTION.ADD_COMPLIANCE_ANSWER:
      return {
        ...state,
        complianceAnswers: [...state.complianceAnswers, action.payload],
      };
    case CHAT_ACTION.ADD_QUESTION_RESPONSE:
      return {
        ...state,
        questionResponses: [...state.questionResponses, action.payload],
      };
    case CHAT_ACTION.SET_OPTIONS:
      return { ...state, options: action.payload };
    case CHAT_ACTION.SET_CURRENT_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: action.payload };
    default:
      return state;
  }
};

const ChatWindow = ({ data }: ChatWindowProps) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const isInitialized = useRef(false);

  const addMessage = (message: MessageType) =>
    dispatch({ type: CHAT_ACTION.ADD_MESSAGE, payload: message });

  const setCurrentStep = (step: number) =>
    dispatch({ type: CHAT_ACTION.SET_CURRENT_STEP, payload: step });

  const setOptions = (options: string[] | null) =>
    dispatch({ type: CHAT_ACTION.SET_OPTIONS, payload: options });

  const setCurrentQuestionIndex = (index: number) =>
    dispatch({ type: CHAT_ACTION.SET_CURRENT_QUESTION_INDEX, payload: index });

  useEffect(() => {
    if (!isInitialized.current) {
      const welcomeMessage: MessageType = {
        sender: 'bot',
        content: `Olá, está pronto para começarmos nossa entrevista para a vaga de ${data.role} na ${data.company}?`,
        options: ['Sim', 'Não'],
      };
      addMessage(welcomeMessage);
      setOptions(welcomeMessage.options || null);
      setCurrentStep(0);

      isInitialized.current = true;
    }
  }, []);

  const handleOptionSelect = (option: string) => {
    const userMessage: MessageType = {
      sender: 'user',
      content: option,
    };
    addMessage(userMessage);

    if (state.currentStep === 0) {
      if (option.toLowerCase() === 'sim') {
        setCurrentStep(1);
        setOptions(null);
        askNextComplianceQuestion(0);
      } else {
        const endMessage: MessageType = {
          sender: 'bot',
          content: 'Tudo bem. Quando estiver pronto, por favor, retorne.',
        };
        addMessage(endMessage);
        setOptions(null);
      }
    } else if (state.currentStep === 1) {
      const complianceQuestion =
        data.complianceQuestions[state.currentQuestionIndex];
      dispatch({
        type: CHAT_ACTION.ADD_COMPLIANCE_ANSWER,
        payload: {
          question: complianceQuestion.question,
          response: option,
        },
      });
      askNextComplianceQuestion(state.currentQuestionIndex + 1);
    }
  };

  const askNextComplianceQuestion = (index: number) => {
    if (index < data.complianceQuestions.length) {
      setCurrentQuestionIndex(index);
      const question = data.complianceQuestions[index];
      const botMessage: MessageType = {
        sender: 'bot',
        content: question.question,
        options: question.options,
      };
      addMessage(botMessage);
      setOptions(question.options);
    } else {
      setCurrentStep(2);
      setOptions(null);
      const botMessage: MessageType = {
        sender: 'bot',
        content:
          'Agora vamos para as perguntas técnicas. Por favor, responda em áudio.',
      };
      addMessage(botMessage);
      askNextTechnicalQuestion(0);
    }
  };

  const askNextTechnicalQuestion = (index: number) => {
    if (index < data.questions.length) {
      setCurrentQuestionIndex(index);
      const question = data.questions[index];
      const botMessage: MessageType = {
        sender: 'bot',
        content: question.question,
        isAudioResponse: true,
      };
      addMessage(botMessage);
    } else {
      setCurrentStep(3);
      const botMessage: MessageType = {
        sender: 'bot',
        content: 'Obrigado por participar da entrevista!',
      };
      addMessage(botMessage);
    }
  };

  const handleAudioRecorded = async (audioBlob: Blob) => {
    const userMessage: MessageType = {
      sender: 'user',
      content: 'Resposta em áudio recebida.',
    };
    addMessage(userMessage);

    const transcription = await transcribeAudio(audioBlob);

    const currentQuestionIndex = state.currentQuestionIndex;
    const question = data.questions[currentQuestionIndex];

    dispatch({
      type: CHAT_ACTION.ADD_QUESTION_RESPONSE,
      payload: {
        question: question.question,
        evaluate: question.evaluate,
        response: transcription,
      },
    });

    askNextTechnicalQuestion(currentQuestionIndex + 1);
  };

  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    if (!audioBlob) return '';
    return 'Transcrição de exemplo da resposta em áudio.';
  };

  return (
    <div className="container flex flex-col py-8 relative">
      <div className="flex flex-col gap-4 mb-24">
        {state.messages.map((msg, index) => (
          <Message.Root
            key={index}
            className={msg.sender === 'user' ? 'flex-row-reverse' : ''}
          >
            {msg.sender === 'bot' && <Message.Icon src="/icons/user.png" />}
            {msg.sender === 'user' && <Message.Icon src="/icons/user.png" />}
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
      <Input.Root>
        {state.currentStep === 2 && (
          <Input.Audio onRecorded={handleAudioRecorded} />
        )}
      </Input.Root>
    </div>
  );
};

export default ChatWindow;
