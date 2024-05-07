import React, { useState } from "react";

import { CommentFooterContainer } from "./CommentFooter.styles.ts";
import { useCommentMutation } from "../../../../hooks/useComment.ts";

import userImg from "../../../../assets/testImage/Image.png";
import { useFetchWriterInfo } from "../../../../hooks/usePost.ts";

interface CommentFooterProps {
  id?: string;
  userId: number;
}

const CommentFooter: React.FC<CommentFooterProps> = ({ id, userId }) => {
  const [commentContent, setCommentContent] = useState("");
  const { mutate } = useCommentMutation(id as string, setCommentContent);
  const { data: userData } = useFetchWriterInfo(userId);

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentContent.trim() === "") {
      return;
    }
    mutate(commentContent);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <CommentFooterContainer>
      <img src={userImg} alt={"user_image"} />
      <input
        value={commentContent}
        onChange={handleCommentChange}
        type={"text"}
        placeholder={`${userData.userName}님에게 댓글 추가`}
      />
      <button onClick={handlePostClick}>post</button>
    </CommentFooterContainer>
  );
};

export default CommentFooter;
