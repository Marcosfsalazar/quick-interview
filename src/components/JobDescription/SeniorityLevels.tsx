import React from 'react';

interface SeniorityLevelsProps {
  levels: string[];
}

const SeniorityLevels = ({ levels }: SeniorityLevelsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {levels.map((level, index) => (
        <span
          key={index}
          className="bg-appGreen text-appPurple px-3 py-1 rounded-full text-sm"
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      ))}
    </div>
  );
};

export default SeniorityLevels;
