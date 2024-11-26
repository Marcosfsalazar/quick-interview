'use client';

import React from 'react';
import { JobDescriptionProps } from '@/types';
import ComplianceQuestions from './ComplianceQuestions';
import SeniorityLevels from './SeniorityLevels';
import JobSections from './JobSections';
import SkillsList from './SkillsList';

interface JobDescriptionComponentProps {
  jobData: JobDescriptionProps;
}

const JobDescription = ({ jobData }: JobDescriptionComponentProps) => {
  const {
    company,
    role,
    area,
    job_description,
    skills,
    aditionalContext,
    seniorityLevel,
    complianceQuestions,
    questions,
  } = jobData;

  return (
    <div className="highlight p-6 h-full rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-appGreen">{role}</h1>
        <p className="text-xl font-semibold text-appAquamarine">
          {company} - {area}
        </p>
      </div>

      <JobSections jobDescription={job_description} />

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-appGreen">
          Habilidades Necessárias
        </h2>
        <SkillsList skills={skills} />
      </div>

      {aditionalContext && aditionalContext.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2 text-appGreen">
            Contexto Adicional
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {aditionalContext.map((context, index) => (
              <li key={index} className="text-LightGreen">
                {context}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-appGreen">
          Níveis de Senioridade
        </h2>
        <SeniorityLevels levels={seniorityLevel} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-appGreen">
          Perguntas de Compliance
        </h2>
        <ComplianceQuestions questions={complianceQuestions} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2 text-appGreen">
          Perguntas Técnicas
        </h2>
        <ol className="list-decimal list-inside space-y-2">
          {questions.map((q, index) => (
            <li key={index} className="text-appLightGreen">
              <strong>Pergunta {index + 1}:</strong> {q.question}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default JobDescription;
