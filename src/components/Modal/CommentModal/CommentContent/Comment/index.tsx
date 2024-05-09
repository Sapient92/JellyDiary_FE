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
import { useParams } from "react-router-dom";
import { useFetchCommentReply } from "../../../../../hooks/useComment.ts";
import useLoginUser from "../../../../../hooks/useLoginUser.ts";
import { useModalStore } from "../../../../../store/modalStore/modalStore.ts";

interface CommentProps {
  comment: CommentType;
  setDeleteCommentId: React.Dispatch<React.SetStateAction<number>>;
}

const Comment: React.FC<CommentProps> = ({ comment, setDeleteCommentId }) => {
  const [replyClick, setReplyClick] = useState(false);
  const { id } = useParams();
  const { data } = useFetchCommentReply(String(id), String(comment.commentId));
  const { isLoginUser } = useLoginUser(String(comment.userId));
  const showCommentDeleteModal = useModalStore(
    (state) => state.showCommentDeleteModal,
  );

  const handleReplyClick = () => {
    setReplyClick(!replyClick);
  };

  const handleCommentDeleteClick = () => {
    showCommentDeleteModal(true);
    setDeleteCommentId(data.commentId);
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
              <p>{comment.commentContent}</p>
              {!replyClick ? (
                <p onClick={handleReplyClick}>
                  {data?.replies.length === 0
                    ? "답글 쓰기"
                    : `${data?.replies.length}개의 답글 보기`}
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
      {replyClick && <CommentReply commentId={comment.commentId} />}
    </>
  );
};

export default Comment;
