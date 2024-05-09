import {
  CommentDeleteModalContainer,
  ConfirmButtonContainer,
} from "./CommentDeleteModal.styles.ts";
import { useModalStore } from "../../../../../store/modalStore/modalStore.ts";
import React, { ReactNode, useRef } from "react";
import useOnClickOutside from "../../../../../hooks/useOnClickOutside.ts";
import { useCommentDeleteMutation } from "../../../../../hooks/useComment.ts";

interface CommentDeleteModalProps {
  postId: number;
  commentId?: number;
  replyId?: {
    parentId: number;
    replyId: number;
  };
  children: ReactNode;
}

const CommentDeleteModal: React.FC<CommentDeleteModalProps> = ({
  postId,
  commentId,
  replyId,
  children,
}) => {
  const { showCommentDeleteModal, showReplyDeleteModal } = useModalStore(
    (state) => state,
  );
  const modalRef = useRef(null);
  const { mutate } = useCommentDeleteMutation(postId, commentId, replyId);

  useOnClickOutside(modalRef, () => {
    if (commentId) {
      showCommentDeleteModal(false);
    } else {
      showReplyDeleteModal(false);
    }
  });

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentId) {
      showCommentDeleteModal(false);
    } else {
      showReplyDeleteModal(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate();
    if (commentId) {
      showCommentDeleteModal(false);
    } else {
      showReplyDeleteModal(false);
    }
  };

  return (
    <CommentDeleteModalContainer ref={modalRef}>
      <p>{children}</p>
      <ConfirmButtonContainer>
        <button onClick={handleDeleteClick}>삭제</button>
        <button onClick={handleCancelClick}>취소</button>
      </ConfirmButtonContainer>
    </CommentDeleteModalContainer>
  );
};

export default CommentDeleteModal;
