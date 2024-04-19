import { CommentContentContainer } from "./CommentContent.styles.ts";
import { useQuery } from "react-query";
import axios from "axios";
import Comment from "./Comment/Comment.tsx";
import React from "react";

interface CommentContentProps {
  id?: string;
}

interface CommentProps {
  commentContent: string;
  commentId: number;
  createdAt: string;
  isDelete: boolean;
  userId: number;
  userName: string;
  userProfileImg: string;
  userTag: object[];
}

const fetchComments = () => axios.get("/comments");

const CommentContent: React.FC<CommentContentProps> = ({ id }) => {
  const { isLoading, data, isError } = useQuery(
    "fetch-comments",
    fetchComments,
    {
      select: (data) => {
        return data.data?.postId === Number(id) ? data.data?.comments : [];
      },
    },
  );

  if (isLoading) return <>Loading...</>;
  if (isError) return <>댓글을 불러오지 못했습니다.</>;

  return (
    <CommentContentContainer>
      {data?.map((comment: CommentProps) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </CommentContentContainer>
  );
};

export default CommentContent;
