import React, { useRef, useState } from "react";

import { useModalStore } from "../../../../store/modalStore/modalStore.ts";
import { useCommentMutation } from "../../../../hooks/useComment.ts";
import { useFetchWriterInfo } from "../../../../hooks/usePost.ts";
import { CommentFooterContainer } from "./CommentFooter.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";

interface CommentFooterProps {
  id?: string;
  userId: number;
}

// 멘션 기능 구현할 때 useDebounce 사용해서 Debounce 반환 값을 api 요청으로 보내기

const CommentFooter: React.FC<CommentFooterProps> = ({ id, userId }) => {
  const [commentContent, setCommentContent] = useState("");
  const { mutate } = useCommentMutation(id as string, setCommentContent);
  const { data: userData } = useFetchWriterInfo(userId);
  const commentRef = useRef<HTMLInputElement>(null);
  const showCommentAlertModal = useModalStore(
    (state) => state.showCommentAlertModal,
  );

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (commentContent.trim() === "") {
      commentRef.current?.focus();
      showCommentAlertModal(true);
      setTimeout(() => {
        showCommentAlertModal(false);
      }, 3000);
      return;
    }
    mutate(commentContent);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <CommentFooterContainer>
      <img
        src={userData?.profileImg ? userData?.profileImg : userAvatar}
        alt={"user_image"}
      />
      <input
        ref={commentRef}
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
