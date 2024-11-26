import React from 'react';

interface ComplianceQuestion {
  question: string;
  options: string[];
}

interface ComplianceQuestionsProps {
  questions: ComplianceQuestion[];
}

const ComplianceQuestions = ({ questions }: ComplianceQuestionsProps) => {
  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <div key={index} className="border border-appLightGreen p-4 rounded">
          <p className="font-semibold mb-2">{q.question}</p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((option, idx) => (
              <span
                key={idx}
                className="bg-appLightGreen text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceQuestions;
