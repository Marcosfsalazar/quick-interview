import React from 'react';

interface InputTextProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const InputText = ({ value, onChange }: InputTextProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 p-2 rounded"
    />
  );
};

export default InputText;
