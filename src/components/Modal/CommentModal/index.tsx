import {
  CommentHeader,
  CommentHeaderContainer,
  CommentModalContainer,
  DivContainer,
} from "./CommentModal.styles.ts";
import CommentContent from "./CommentContent";
import CommentFooter from "./CommentFooter";
import React from "react";

interface CommentModalProps {
  id?: string;
  setToggleCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentModal: React.FC<CommentModalProps> = ({
  id,
  setToggleCommentModal,
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
      <CommentFooter />
    </CommentModalContainer>
  );
};

export default CommentModal;
