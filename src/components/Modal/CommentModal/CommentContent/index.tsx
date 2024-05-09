import React, { useState } from "react";

import Comment from "./Comment";

import { useFetchComment } from "../../../../hooks/useComment.ts";
import { CommentType } from "../../../../types/commentType.ts";

import { CommentContentContainer } from "./CommentContent.styles.ts";
import { useModalStore } from "../../../../store/modalStore/modalStore.ts";
import AlertModal from "../../AlertModal";
import CommentDeleteModal from "./Comment/CommentDeleteModal.tsx";

interface CommentContentProps {
  id?: string;
}

const CommentContent: React.FC<CommentContentProps> = ({ id }) => {
  const { isLoading, data, isError, error } = useFetchComment(id as string);
  const { commentAlertModal, commentDeleteModal, replyDeleteModal } =
    useModalStore((state) => state);
  const [deleteCommentId, setDeleteCommentId] = useState(0);
  const [deleteReplyId, setDeleteReplyId] = useState({
    parentId: 0,
    replyId: 0,
  });
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <CommentContentContainer>
      {commentAlertModal && (
        <AlertModal type={"commentAlert"}>댓글을 작성해 주세요.</AlertModal>
      )}
      {commentDeleteModal && (
        <CommentDeleteModal commentId={deleteCommentId} postId={data.postId}>
          댓글을 삭제하시겠습니까?
        </CommentDeleteModal>
      )}
      {replyDeleteModal && (
        <CommentDeleteModal replyId={deleteReplyId} postId={data.postId}>
          답글을 삭제하시겠습니까?
        </CommentDeleteModal>
      )}
      {data?.comments.length === 0 ? (
        <p>해당 게시물에 작성된 댓글이 없습니다.</p>
      ) : (
        data?.comments.map((comment: CommentType) => (
          <Comment
            key={comment.commentId}
            comment={comment}
            setDeleteCommentId={setDeleteCommentId}
            setDeleteReplyId={setDeleteReplyId}
          />
        ))
      )}
    </CommentContentContainer>
  );
};

export default CommentContent;
