import {
  CommentHeaderContainer,
  CommentModalContainer,
  DivContainer,
} from "./CommentModal.styles.ts";
import CommentContent from "./CommentContent/CommentContent.tsx";
import CommentFooter from "./CommentFooter/CommentFooter.tsx";
import React from "react";

interface CommentModal {
  id?: string;
}

const CommentModal: React.FC<CommentModal> = ({ id }) => {
  return (
    <CommentModalContainer>
      <DivContainer>
        <CommentHeaderContainer>
          <p>댓글</p>
        </CommentHeaderContainer>
        <CommentContent id={id} />
      </DivContainer>
      <CommentFooter />
    </CommentModalContainer>
  );
};

export default CommentModal;
