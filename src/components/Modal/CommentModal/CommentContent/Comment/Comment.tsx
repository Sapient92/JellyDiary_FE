import {
  CommentContainer,
  CommentContentContainer,
  CommentDescription,
  CommentInfoContainer,
  CommentProfileContainer,
  DeleteCommentButton,
} from "./Comment.styled.ts";

const Comment = ({ comment }) => {
  const writtenAt = () => {
    const date = new Date().getTime() - new Date(comment.createdAt).getTime();
    const seconds = Math.floor(date / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days === 0 && hours === 0 && minutes === 0) return `${seconds}초 전`;
    else if (days === 0 && hours === 0 && minutes !== 0)
      return `${minutes}분 전`;
    else if (days === 0 && hours !== 0) return `${hours}시간 전`;
    else if (days !== 0) return `${days}일 전`;
  };
  return (
    <CommentContainer>
      <CommentProfileContainer>
        <img src={comment.userProfileImg} alt={"comment_writer_profile_img"} />
        <CommentContentContainer>
          <CommentInfoContainer>
            <p>{comment.userName}</p>
            <p>{writtenAt()}</p>
          </CommentInfoContainer>
          <CommentDescription>
            <p>{comment.commentContent}</p>
          </CommentDescription>
        </CommentContentContainer>
      </CommentProfileContainer>
      <DeleteCommentButton />
    </CommentContainer>
  );
};

export default Comment;
