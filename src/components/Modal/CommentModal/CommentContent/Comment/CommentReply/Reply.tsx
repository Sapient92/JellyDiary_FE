import userAvatar from "../../../../../../assets/images/UserAvatar.png";
import {
  CommentReplyContent,
  CommentReplyDesc,
  CommentReplyWriterContainer,
  DeleteCommentButton,
} from "./CommentReply.styled.ts";
import React from "react";
import { CommentType } from "../../../../../../types/commentType.ts";
import useWrittenAt from "../../../../../../hooks/useWrittenAt.ts";
import { useModalStore } from "../../../../../../store/modalStore/modalStore.ts";
import useLoginUser from "../../../../../../hooks/useLoginUser.ts";

interface ReplyProps {
  reply: CommentType;
  commentId: number;
  setDeleteReplyId: React.Dispatch<
    React.SetStateAction<{ parentId: number; replyId: number }>
  >;
}

const TransformDate = (createdAt: string) => useWrittenAt(createdAt);

const Reply: React.FC<ReplyProps> = ({
  reply,
  commentId,
  setDeleteReplyId,
}) => {
  const { showReplyDeleteModal } = useModalStore((state) => state);
  const { isLoginUser } = useLoginUser(String(reply?.userId));

  const handleReplyDeleteClick = (id: number) => {
    setDeleteReplyId({ parentId: commentId, replyId: id });
    showReplyDeleteModal(true);
  };

  return (
    <CommentReplyContent key={reply.commentId}>
      <img
        src={reply.userProfileImg !== null ? reply.userProfileImg : userAvatar}
        alt={"userProfileImg"}
      />
      <CommentReplyDesc>
        <CommentReplyWriterContainer>
          <p>{reply.userName}</p>
          <p>{TransformDate(reply.createdAt)}</p>
        </CommentReplyWriterContainer>
        <p>{reply.commentContent}</p>
      </CommentReplyDesc>
      {isLoginUser && (
        <DeleteCommentButton
          onClick={() => handleReplyDeleteClick(reply.commentId)}
        />
      )}
    </CommentReplyContent>
  );
};

export default Reply;
