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
} from "./Comment.styled.ts";
import userAvatar from "../../../../../assets/images/UserAvatar.png";
import { useParams } from "react-router-dom";
import { useFetchCommentReply } from "../../../../../hooks/useComment.ts";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [replyClick, setReplyClick] = useState(false);
  const { id } = useParams();
  const { data } = useFetchCommentReply(String(id), String(comment.commentId));

  const handleReplyClick = () => {
    setReplyClick(!replyClick);
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
        <DeleteCommentButton />
      </CommentContainer>
      {replyClick && <CommentReply commentId={comment.commentId} />}
    </>
  );
};

export default Comment;
