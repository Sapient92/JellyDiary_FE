import {
  CommentHeader,
  CommentHeaderContainer,
  CommentModalContainer,
  DivContainer,
} from "./CommentModal.styles.ts";
import CommentContent from "./CommentContent/CommentContent.tsx";
import CommentFooter from "./CommentFooter/CommentFooter.tsx";
import React from "react";

interface CommentModal {
  id?: string;
  setToggleCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentModal: React.FC<CommentModal> = ({
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
