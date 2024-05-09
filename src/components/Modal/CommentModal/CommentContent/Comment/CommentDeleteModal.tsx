import {
  CommentDeleteModalContainer,
  ConfirmButtonContainer,
} from "./CommentDeleteModal.styles.ts";
import { useModalStore } from "../../../../../store/modalStore/modalStore.ts";
import React, { useRef } from "react";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside.ts";
import { useCommentDeleteMutation } from "../../../../../hooks/useComment.ts";

interface CommentDeleteModalProps {
  commentId: number;
  postId: number;
}

const CommentDeleteModal: React.FC<CommentDeleteModalProps> = ({
  commentId,
  postId,
}) => {
  const { showCommentDeleteModal } = useModalStore((state) => state);
  const modalRef = useRef(null);
  const { mutate } = useCommentDeleteMutation(postId, commentId);

  useOnClickOutside(modalRef, () => {
    showCommentDeleteModal(false);
  });

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showCommentDeleteModal(false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
    showCommentDeleteModal(false);
  };

  return (
    <CommentDeleteModalContainer ref={modalRef}>
      <p>댓글을 삭제하시겠습니까?</p>
      <ConfirmButtonContainer>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleCancelClick}>취소</button>
      </ConfirmButtonContainer>
    </CommentDeleteModalContainer>
  );
};

export default CommentDeleteModal;
