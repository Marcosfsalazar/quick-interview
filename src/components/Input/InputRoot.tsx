import { ReactNode } from 'react';

interface InputRootProps {
  children: ReactNode;
}

const InputRoot = ({ children }: InputRootProps) => {
  return (
    <div className="w-full h-12 flex items-center justify-center gap-4">
      {children}
    </div>
  );
};

export default InputRoot;
