import {
  CommentHeaderContainer,
  CommentModalContainer,
  DivContainer,
} from "./CommentModal.styles.ts";
import CommentContent from "./CommentContent/CommentContent.tsx";
import CommentFooter from "./CommentFooter/CommentFooter.tsx";

const CommentModal = () => {
  return (
    <CommentModalContainer>
      <DivContainer>
        <CommentHeaderContainer>
          <p>댓글</p>
        </CommentHeaderContainer>
        <CommentContent />
      </DivContainer>
      <CommentFooter />
    </CommentModalContainer>
  );
};

export default CommentModal;
