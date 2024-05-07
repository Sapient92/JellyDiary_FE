import React from "react";

import CommentContent from "./CommentContent";
import CommentFooter from "./CommentFooter";

import {
  CommentHeader,
  CommentHeaderContainer,
  CommentModalContainer,
  DivContainer,
} from "./CommentModal.styles.ts";

interface CommentModalProps {
  id?: string;
  setToggleCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
}

const CommentModal: React.FC<CommentModalProps> = ({
  id,
  setToggleCommentModal,
  userId,
}) => {
  const handleCloseClick = () => {
    setToggleCommentModal(false);
  };

  return (
    <CommentModalContainer>
      <DivContainer>
        <CommentHeaderContainer>
          <span onClick={handleCloseClick}>{"<"}</span>
          <CommentHeader>
            <p>댓글</p>
          </CommentHeader>
        </CommentHeaderContainer>
        <CommentContent id={id} />
      </DivContainer>
      <CommentFooter id={id} userId={userId} />
    </CommentModalContainer>
  );
};

export default CommentModal;
