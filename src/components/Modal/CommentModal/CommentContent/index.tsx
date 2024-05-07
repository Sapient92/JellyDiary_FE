import React from "react";

import Comment from "./Comment";

import { useFetchComment } from "../../../../hooks/useComment.ts";
import { CommentType } from "../../../../types/commentType.ts";

import { CommentContentContainer } from "./CommentContent.styles.ts";

interface CommentContentProps {
  id?: string;
}

const CommentContent: React.FC<CommentContentProps> = ({ id }) => {
  const { isLoading, data, isError } = useFetchComment(id as string);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>댓글을 불러오지 못했습니다.</>;

  return (
    <CommentContentContainer>
      {data?.comments.length === 0 ? (
        <p>해당 게시물에 작성된 댓글이 없습니다.</p>
      ) : (
        data?.comments.map((comment: CommentType) => (
          <Comment key={comment.commentId} comment={comment} />
        ))
      )}
    </CommentContentContainer>
  );
};

export default CommentContent;
