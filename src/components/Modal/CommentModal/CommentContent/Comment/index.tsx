import React, { useState } from "react";

import { CommentType } from "../../../../../types/commentType.ts";

import {
  CommentContainer,
  CommentContentContainer,
  CommentDescription,
  CommentInfoContainer,
  CommentProfileContainer,
  DeleteCommentButton,
} from "./Comment.styled.ts";
import useWrittenAt from "../../../../../hooks/useWrittenAt.ts";
import CommentReply from "./CommentReply";

interface CommentProps {
  comment: CommentType;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [replyClick, setReplyClick] = useState(false);

  const handleReplyClick = () => {
    setReplyClick(!replyClick);
  };

  return (
    <>
      <CommentContainer>
        <CommentProfileContainer>
          <img
            src={comment.userProfileImg}
            alt={"comment_writer_profile_img"}
          />
          <CommentContentContainer>
            <CommentInfoContainer>
              <p>{comment.userName}</p>
              <p>{useWrittenAt(comment.createdAt)}</p>
            </CommentInfoContainer>
            <CommentDescription>
              <p>{comment.commentContent}</p>
              {!replyClick && <p onClick={handleReplyClick}>답글 쓰기</p>}
            </CommentDescription>
          </CommentContentContainer>
        </CommentProfileContainer>
        <DeleteCommentButton />
      </CommentContainer>
      {replyClick && <CommentReply />}
    </>
  );
};

export default Comment;
