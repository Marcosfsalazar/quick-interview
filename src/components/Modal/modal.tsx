'use client';

import React from 'react';
import { useModal } from '@/hooks/useModal';

const Modal = () => {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay  overflow-y-scroll">
      <div className="modal-container">
        <button
          className="modal-close hover:highlight w-[20px] h-[20px] flex items-center justify-center"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="modal-content">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
