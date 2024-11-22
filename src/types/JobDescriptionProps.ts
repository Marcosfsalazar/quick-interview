export interface ComplianceQuestion {
  question: string;
  options: string[];
}

export interface ComplianceAnswer {
  question: string;
  response: string;
}

export interface Question {
  question: string;
  evaluate?: string;
  response?: string;
}

export interface QuestionResponse {
  question: string;
  evaluate?: string;
  response: string;
}

export interface JobDescriptionProps {
  company: string;
  role: string;
  area: string;
  job_description: string;
  skills: string[];
  aditionalContext?: string[];
  seniorityLevel: string[];
  user: string;
  complianceQuestions: ComplianceQuestion[];
  questions: Question[];
}
