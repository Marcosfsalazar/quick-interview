import React from 'react';

interface SkillsListProps {
  skills: string[];
}

const SkillsList = ({ skills }: SkillsListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="bg-appAquamarine text-white px-3 py-1 rounded-full text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillsList;
