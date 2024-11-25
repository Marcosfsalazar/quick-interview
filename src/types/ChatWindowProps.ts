import {
  ComplianceAnswer,
  JobDescriptionProps,
  QuestionResponse,
} from './JobDescriptionProps';

export interface ChatWindowProps {
  data: JobDescriptionProps;
}

export enum CHAT_ACTION {
  ADD_MESSAGE = 'ADD_MESSAGE',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  SET_CURRENT_STEP = 'SET_CURRENT_STEP',
  ADD_COMPLIANCE_ANSWER = 'ADD_COMPLIANCE_ANSWER',
  ADD_QUESTION_RESPONSE = 'ADD_QUESTION_RESPONSE',
  SET_OPTIONS = 'SET_OPTIONS',
  SET_CURRENT_QUESTION_INDEX = 'SET_CURRENT_QUESTION_INDEX',
  REMOVE_TYPING_INDICATOR = 'REMOVE_TYPING_INDICATOR',
}

export type MessageType = {
  sender: 'bot' | 'user';
  content: string;
  options?: string[];
  isAudioResponse?: boolean;
  selectedOption?: string;
  optionsDisabled?: boolean;
  audioUrl?: string;
  isTyping?: boolean;
};

export type ChatAction =
  | { type: CHAT_ACTION.ADD_MESSAGE; payload: MessageType }
  | {
      type: CHAT_ACTION.UPDATE_MESSAGE;
      payload: { index: number; message: Partial<MessageType> };
    }
  | { type: CHAT_ACTION.SET_CURRENT_STEP; payload: number }
  | { type: CHAT_ACTION.ADD_COMPLIANCE_ANSWER; payload: ComplianceAnswer }
  | { type: CHAT_ACTION.ADD_QUESTION_RESPONSE; payload: QuestionResponse }
  | { type: CHAT_ACTION.SET_OPTIONS; payload: string[] | null }
  | { type: CHAT_ACTION.SET_CURRENT_QUESTION_INDEX; payload: number }
  | { type: CHAT_ACTION.REMOVE_TYPING_INDICATOR };

export interface ChatState {
  messages: MessageType[];
  currentStep: number;
  complianceAnswers: ComplianceAnswer[];
  questionResponses: QuestionResponse[];
  options: string[] | null;
  currentQuestionIndex: number;
}
