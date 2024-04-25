import React, { useRef } from "react";

import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";

import {
  ConfirmButtonContainer,
  ConfirmModalContainer,
} from "./ConfirmModal.styles.ts";

interface ConfirmModalProps {
  message: string;
  confirm: string;
  cancel: string;
  closeModal: (el: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirm,
  cancel,
  closeModal,
}) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => {
    closeModal(false);
  });

  const handleCancelClick = () => {
    closeModal(false);
  };

  return (
    <ConfirmModalContainer ref={modalRef}>
      <p>{message}</p>
      <ConfirmButtonContainer>
        <button>{confirm}</button>
        <button onClick={handleCancelClick}>{cancel}</button>
      </ConfirmButtonContainer>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;
