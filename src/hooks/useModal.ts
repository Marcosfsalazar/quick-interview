import { ModalContext } from '@/context/ModalContext';
import { useContext } from 'react';

export const useModal = () => {
  const { isOpen, content, openModal, closeModal } = useContext(ModalContext);

  return { isOpen, content, openModal, closeModal };
};
