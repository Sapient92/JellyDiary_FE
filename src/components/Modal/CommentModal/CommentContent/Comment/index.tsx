import React, { useState } from "react";

import CommentReply from "./CommentReply";

import { CommentType } from "../../../../../types/commentType.ts";
import useWrittenAt from "../../../../../hooks/useWrittenAt.ts";

import {
  CommentContainer,
  CommentContentContainer,
  CommentDescription,
  CommentInfoContainer,
  CommentProfileContainer,
  DeleteCommentButton,
} from "./Comment.styles.ts";
import userAvatar from "../../../../../assets/images/UserAvatar.png";
import useLoginUser from "../../../../../hooks/useLoginUser.ts";
import { useModalStore } from "../../../../../store/modalStore/modalStore.ts";

interface CommentProps {
  comment: CommentType;
  setDeleteCommentId: React.Dispatch<React.SetStateAction<number>>;
  setDeleteReplyId: React.Dispatch<
    React.SetStateAction<{ parentId: number; replyId: number }>
  >;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  setDeleteCommentId,
  setDeleteReplyId,
}) => {
  const [replyClick, setReplyClick] = useState(false);
  const { isLoginUser } = useLoginUser(String(comment.userId));
  const showCommentDeleteModal = useModalStore(
    (state) => state.showCommentDeleteModal,
  );

  const regex = /(@\S+)/g;
  const splitContent = comment?.commentContent
    .split(regex)
    .map((part, index) => {
      if (part.match(regex)) {
        return (
          <span key={index} style={{ color: "lightcoral" }}>
            {part}
          </span>
        );
      } else {
        return part;
      }
    });

  const handleReplyClick = () => {
    setReplyClick(!replyClick);
  };

  const handleCommentDeleteClick = () => {
    showCommentDeleteModal(true);
    setDeleteCommentId(comment.commentId);
  };

  return (
    <>
      <CommentContainer>
        <CommentProfileContainer>
          <img
            src={
              comment.userProfileImg !== null
                ? comment.userProfileImg
                : userAvatar
            }
            alt={"comment_writer_profile_img"}
          />
          <CommentContentContainer>
            <CommentInfoContainer>
              <p>{comment.userName}</p>
              <p>{useWrittenAt(comment.createdAt)}</p>
            </CommentInfoContainer>
            <CommentDescription>
              <p>{splitContent}</p>
              {!replyClick ? (
                <p onClick={handleReplyClick}>
                  {comment?.replyCount === 0
                    ? "답글 쓰기"
                    : `${comment?.replyCount}개의 답글 보기`}
                </p>
              ) : (
                <p onClick={handleReplyClick}>답글 닫기</p>
              )}
            </CommentDescription>
          </CommentContentContainer>
        </CommentProfileContainer>
        {isLoginUser && (
          <DeleteCommentButton onClick={handleCommentDeleteClick} />
        )}
      </CommentContainer>
      {replyClick && (
        <CommentReply
          commentId={comment.commentId}
          setDeleteReplyId={setDeleteReplyId}
        />
      )}
    </>
  );
};

export default Comment;
