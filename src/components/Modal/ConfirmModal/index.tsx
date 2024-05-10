import React, { useRef } from "react";

import useOnClickOutside from "../../../hooks/useOnClickOutside.ts";

import {
  ConfirmButtonContainer,
  ConfirmModalContainer,
} from "./ConfirmModal.styles.ts";
import api from "../../../api";
import { useNavigate } from "react-router-dom";

interface ConfirmModalProps {
  message: string;
  confirm: string;
  cancel: string;
  closeModal: (el: boolean) => void;
  id?: string | number;
  userId?: number;
  commentId?: number;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirm,
  cancel,
  closeModal,
  id,
  userId,
}) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    closeModal(false);
  });

  const handleCancelClick = () => {
    closeModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm === "삭제") {
      api.delete(`/api/post/${id}`, { params: { postId: id } }).then((res) => {
        if (res.status === 200) {
          navigate(`../../../userfeed/${userId}`);
          closeModal(false);
        }
      });
    }
  };

  return (
    <ConfirmModalContainer ref={modalRef}>
      <p>{message}</p>
      <ConfirmButtonContainer>
        <button onClick={handleClick}>{confirm}</button>
        <button onClick={handleCancelClick}>{cancel}</button>
      </ConfirmButtonContainer>
    </ConfirmModalContainer>
  );
};

export default ConfirmModal;
