import { CommentFooterContainer } from "./CommentFooter.styles.ts";
import userImg from "../../../../assets/testImage/Image.png";

const CommentFooter = () => {
  return (
    <CommentFooterContainer>
      <img src={userImg} alt={"user_image"} />
      <input type={"text"} placeholder={"terrylucas님에게 댓글 추가..."} />
      <button>post</button>
    </CommentFooterContainer>
  );
};

export default CommentFooter;
