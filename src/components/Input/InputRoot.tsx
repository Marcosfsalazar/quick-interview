import { ReactNode } from 'react';

interface InputRootProps {
  children: ReactNode;
}

const InputRoot = ({ children }: InputRootProps) => {
  return (
    <div className="absolute bottom-4 left-0 w-full h-12 flex items-center justify-center gap-4">
      {children}
    </div>
  );
};

export default InputRoot;
