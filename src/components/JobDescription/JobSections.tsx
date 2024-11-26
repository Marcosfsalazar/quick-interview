import React from 'react';

interface JobSectionsProps {
  jobDescription: string;
}

const JobSections = ({ jobDescription }: JobSectionsProps) => {
  const sections = jobDescription.split('\n\n');

  return (
    <div className="space-y-4">
      {sections.map((section, index) => {
        const titleMatch = section.match(/^(.*?)\?/);
        const title = titleMatch ? titleMatch[1] + '?' : null;
        const content = title ? section.replace(title, '').trim() : section;

        return (
          <div key={index}>
            {title && (
              <h2 className="text-2xl font-semibold mb-1 text-appGreen">
                {title}
              </h2>
            )}
            <p className="text-appLightGreen whitespace-pre-line">{content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default JobSections;
