import {
  CommentFormContainer,
  CommentReplyContainer,
  CommentReplyContent,
  CommentReplyDesc,
  CommentReplyWriterContainer,
} from "./CommentReply.styled.ts";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCommentReplyMutation,
  useFetchCommentReply,
} from "../../../../../../hooks/useComment.ts";
import { CommentType } from "../../../../../../types/commentType.ts";

import userAvatar from "../../../../../../assets/images/UserAvatar.png";
import useWrittenAt from "../../../../../../hooks/useWrittenAt.ts";
import { useModalStore } from "../../../../../../store/modalStore/modalStore.ts";
import AlertModal from "../../../../AlertModal";

interface CommentReplyProps {
  commentId: number;
}

interface CommentReplyInputForm {
  id?: string;
  commentId: number;
}

const TransformDate = (createdAt: string) => useWrittenAt(createdAt);

const CommentReply: React.FC<CommentReplyProps> = ({ commentId }) => {
  const { id } = useParams();
  const replyAlertModal = useModalStore((state) => state.replyAlertModal);
  const { isLoading, data, isError, error } = useFetchCommentReply(
    String(id),
    String(commentId),
  );

  if (isLoading) return <>로딩중...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <CommentReplyContainer>
      {replyAlertModal && (
        <AlertModal type={"replyAlert"}>답글을 작성해주세요.</AlertModal>
      )}
      {data?.replies.length !== 0 &&
        data.replies.map((reply: CommentType) => (
          <CommentReplyContent key={reply.commentId}>
            <img
              src={
                reply.userProfileImg !== null
                  ? reply.userProfileImg
                  : userAvatar
              }
              alt={"userProfileImg"}
            />
            <CommentReplyDesc>
              <CommentReplyWriterContainer>
                <p>{reply.userName}</p>
                <p>{TransformDate(reply.createdAt)}</p>
              </CommentReplyWriterContainer>
              <p>{reply.commentContent}</p>
            </CommentReplyDesc>
          </CommentReplyContent>
        ))}
      <CommentReplyInputForm id={id} commentId={commentId} />
    </CommentReplyContainer>
  );
};

const CommentReplyInputForm: React.FC<CommentReplyInputForm> = ({
  id,
  commentId,
}) => {
  const [commentReply, setCommentReply] = useState("");
  const handleCommentReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentReply(e.target.value);
  };
  const showReplyAlertModal = useModalStore(
    (state) => state.showReplyAlertModal,
  );
  const replyRef = useRef<HTMLInputElement>(null);

  const { mutate } = useCommentReplyMutation(
    String(id),
    String(commentId),
    setCommentReply,
  );

  const handleReplyClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentReply.trim() === "") {
      replyRef.current?.focus();
      showReplyAlertModal(true);
      setTimeout(() => {
        showReplyAlertModal(false);
      }, 3000);
      return;
    }
    mutate(commentReply);
  };

  return (
    <CommentFormContainer>
      <input
        ref={replyRef}
        type={"text"}
        value={commentReply}
        onChange={handleCommentReplyChange}
      />
      <button onClick={handleReplyClick}>답글 쓰기</button>
    </CommentFormContainer>
  );
};

export default CommentReply;
