import {
  CommentFormContainer,
  CommentReplyContainer,
  CommentReplyContent,
  CommentReplyDesc,
  CommentReplyWriterContainer,
} from "./CommentReply.styled.ts";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCommentReplyMutation,
  useFetchCommentReply,
} from "../../../../../../hooks/useComment.ts";
import { CommentType } from "../../../../../../types/commentType.ts";

import userAvatar from "../../../../../../assets/images/UserAvatar.png";
import useWrittenAt from "../../../../../../hooks/useWrittenAt.ts";

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
  const { isLoading, data, isError, error } = useFetchCommentReply(
    String(id),
    String(commentId),
  );

  if (isLoading) return <>로딩중...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <CommentReplyContainer>
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

  const { mutate } = useCommentReplyMutation(
    String(id),
    String(commentId),
    setCommentReply,
  );

  const handleReplyClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(commentReply);
  };

  return (
    <CommentFormContainer>
      <input
        type={"text"}
        value={commentReply}
        onChange={handleCommentReplyChange}
      />
      <button onClick={handleReplyClick}>답글 쓰기</button>
    </CommentFormContainer>
  );
};

export default CommentReply;
