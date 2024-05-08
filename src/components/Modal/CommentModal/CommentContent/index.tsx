import React from "react";

import Comment from "./Comment";

import { useFetchComment } from "../../../../hooks/useComment.ts";
import { CommentType } from "../../../../types/commentType.ts";

import { CommentContentContainer } from "./CommentContent.styles.ts";
import { useModalStore } from "../../../../store/modalStore/modalStore.ts";
import AlertModal from "../../AlertModal";

interface CommentContentProps {
  id?: string;
}

const CommentContent: React.FC<CommentContentProps> = ({ id }) => {
  const { isLoading, data, isError, error } = useFetchComment(id as string);
  const commentAlertModal = useModalStore((state) => state.commentAlertModal);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <CommentContentContainer>
      {commentAlertModal && (
        <AlertModal type={"commentAlert"}>댓글을 작성해 주세요.</AlertModal>
      )}
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
