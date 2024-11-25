import { useReducer, useRef, useEffect } from 'react';
import {
  ChatAction,
  CHAT_ACTION as ChatActionType,
  ChatState,
  MessageType,
  ComplianceAnswer,
  QuestionResponse,
  JobDescriptionProps,
} from '@/types';
import { MASTER_PROMPT } from '@/constants/prompts';
import { useMutation } from '@tanstack/react-query';

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
    case ChatActionType.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case ChatActionType.UPDATE_MESSAGE:
      const updatedMessages = state.messages.map((msg, idx) => {
        if (idx === action.payload.index) {
          return { ...msg, ...action.payload.message };
        } else {
          return msg;
        }
      });
      return { ...state, messages: updatedMessages };
    case ChatActionType.SET_CURRENT_STEP:
      return { ...state, currentStep: action.payload };
    case ChatActionType.ADD_COMPLIANCE_ANSWER:
      return {
        ...state,
        complianceAnswers: [...state.complianceAnswers, action.payload],
      };
    case ChatActionType.ADD_QUESTION_RESPONSE:
      return {
        ...state,
        questionResponses: [...state.questionResponses, action.payload],
      };
    case ChatActionType.SET_OPTIONS:
      return { ...state, options: action.payload };
    case ChatActionType.SET_CURRENT_QUESTION_INDEX:
      return { ...state, currentQuestionIndex: action.payload };
    case ChatActionType.REMOVE_TYPING_INDICATOR:
      return {
        ...state,
        messages: state.messages.filter((msg) => !msg.isTyping),
      };
    default:
      return state;
  }
};

export const useChat = (data: JobDescriptionProps) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const isInitialized = useRef(false);

  const addMessage = (message: MessageType) =>
    dispatch({ type: ChatActionType.ADD_MESSAGE, payload: message });

  const setCurrentStep = (step: number) =>
    dispatch({ type: ChatActionType.SET_CURRENT_STEP, payload: step });

  const setOptions = (options: string[] | null) =>
    dispatch({ type: ChatActionType.SET_OPTIONS, payload: options });

  const setCurrentQuestionIndex = (index: number) =>
    dispatch({
      type: ChatActionType.SET_CURRENT_QUESTION_INDEX,
      payload: index,
    });

  const addTypingIndicator = () => {
    const typingMessage: MessageType = {
      sender: 'bot',
      content: '',
      isTyping: true,
    };
    dispatch({ type: ChatActionType.ADD_MESSAGE, payload: typingMessage });
  };

  const removeTypingIndicator = () => {
    dispatch({ type: ChatActionType.REMOVE_TYPING_INDICATOR });
  };

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
  }, [data]);

  const evaluateResponsesMutation = useMutation<
    string,
    Error,
    QuestionResponse[]
  >({
    mutationFn: async (questionResponses) => {
      const requestData = {
        masterPrompt: MASTER_PROMPT,
        jobDescription: data,
        questions: questionResponses,
      };

      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate responses!');
      }

      const result = await response.json();
      return result.evaluation as string;
    },
    onSuccess: (evaluation: string) => {
      removeTypingIndicator();
      try {
        const evaluationData = JSON.parse(evaluation);
        const { questions } = evaluationData;
        console.log('HERE');
        if (Array.isArray(questions)) {
          questions.forEach((q) => {
            const questionMessage: MessageType = {
              sender: 'bot',
              content: `**Pergunta:** ${q.question}\n**Feedback:** ${q.user_feedback}`,
            };
            addMessage(questionMessage);
          });
        }
      } catch (error) {
        console.error('Error parsing evaluation JSON:', error);
        const botMessage: MessageType = {
          sender: 'bot',
          content:
            'Desculpe, ocorreu um erro ao processar a avaliação das suas respostas.',
        };
        addMessage(botMessage);
      }
    },
    onError: (error: Error) => {
      removeTypingIndicator();
      console.error('Error evaluating responses:', error);
      const botMessage: MessageType = {
        sender: 'bot',
        content: 'Desculpe, ocorreu um erro ao avaliar suas respostas.',
      };
      addMessage(botMessage);
    },
  });

  const handleOptionSelect = (option: string, messageIndex: number) => {
    const userMessage: MessageType = {
      sender: 'user',
      content: option,
    };
    addMessage(userMessage);

    dispatch({
      type: ChatActionType.UPDATE_MESSAGE,
      payload: {
        index: messageIndex,
        message: {
          optionsDisabled: true,
          selectedOption: option,
        },
      },
    });

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
      const complianceAnswer: ComplianceAnswer = {
        question: complianceQuestion.question,
        response: option,
      };
      dispatch({
        type: ChatActionType.ADD_COMPLIANCE_ANSWER,
        payload: complianceAnswer,
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

  const askNextTechnicalQuestion = async (index: number) => {
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
    const currentQuestionIndex = state.currentQuestionIndex;
    const audioUrl = URL.createObjectURL(audioBlob);

    const userMessage: MessageType = {
      sender: 'user',
      content: 'Resposta em áudio recebida.',
      audioUrl,
    };
    addMessage(userMessage);

    addTypingIndicator();

    try {
      const transcription =
        await transcribeAudioMutation.mutateAsync(audioBlob);
      const question = data.questions[currentQuestionIndex];

      const questionResponse: QuestionResponse = {
        question: question.question,
        evaluate: question.evaluate,
        response: transcription,
      };

      dispatch({
        type: ChatActionType.ADD_QUESTION_RESPONSE,
        payload: questionResponse,
      });

      const updatedQuestionResponses = [
        ...state.questionResponses,
        questionResponse,
      ];

      const nextIndex = currentQuestionIndex + 1;

      removeTypingIndicator();

      if (nextIndex < data.questions.length) {
        askNextTechnicalQuestion(nextIndex);
      } else {
        setCurrentStep(3);
        const botMessage: MessageType = {
          sender: 'bot',
          content: 'Obrigado por participar da entrevista!',
        };
        addMessage(botMessage);

        addTypingIndicator();
        evaluateResponsesMutation.mutate(updatedQuestionResponses);
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      removeTypingIndicator();
      const botMessage: MessageType = {
        sender: 'bot',
        content: 'Desculpe, ocorreu um erro ao transcrever seu áudio.',
      };
      addMessage(botMessage);
    }
  };

  const transcribeAudioMutation = useMutation<string, Error, Blob>({
    mutationFn: async (audioBlob: Blob) => {
      if (!audioBlob) return '';
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const data = await response.json();
      return data.transcription.text || '';
    },
  });

  return {
    state,
    handleOptionSelect,
    handleAudioRecorded,
  };
};
