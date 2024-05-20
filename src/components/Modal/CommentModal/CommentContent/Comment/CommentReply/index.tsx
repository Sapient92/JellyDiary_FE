import {
  CommentFormContainer,
  CommentReplyContainer,
} from "./CommentReply.styled.ts";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCommentReplyMutation,
  useFetchCommentReply,
} from "../../../../../../hooks/useComment.ts";
import { CommentType } from "../../../../../../types/commentType.ts";
import { useModalStore } from "../../../../../../store/modalStore/modalStore.ts";
import AlertModal from "../../../../AlertModal";
import Reply from "./Reply.tsx";
import { useDebounce } from "../../../../../../hooks/useDebounce.ts";
import { useFetchPost } from "../../../../../../hooks/usePost.ts";
import { useFetchSearchUser } from "../../../../../../hooks/useSearchUser.ts";
import { Mention, MentionItem, MentionsInput } from "react-mentions";
import { useTagsStore } from "../../../../../../store/tagStore/tagStore.ts";
import mentionStyle from "./defaultStyle.ts";

interface CommentReplyProps {
  commentId: number;
  setDeleteReplyId: React.Dispatch<
    React.SetStateAction<{ parentId: number; replyId: number }>
  >;
}

interface CommentReplyInputForm {
  id?: string;
  commentId: number;
}

interface tagUserProps {
  isInvited: boolean;
  profileImg: string | null;
  userId: number;
  userName: string;
}

const CommentReply: React.FC<CommentReplyProps> = ({
  commentId,
  setDeleteReplyId,
}) => {
  const { id } = useParams();
  const { replyAlertModal } = useModalStore((state) => state);
  const { isLoading, data, isError, error } = useFetchCommentReply(
    String(id),
    String(commentId),
  );

  if (isLoading) return <>로딩중...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <CommentReplyContainer>
      {replyAlertModal && (
        <AlertModal type={"replyAlert"}>답글을 작성해주세요.</AlertModal>
      )}
      {data?.replies.length !== 0 &&
        data.replies.map((reply: CommentType) => (
          <Reply
            key={reply.commentId}
            reply={reply}
            commentId={commentId}
            setDeleteReplyId={setDeleteReplyId}
          />
        ))}
      <CommentReplyInputForm id={id} commentId={commentId} />
    </CommentReplyContainer>
  );
};

const CommentReplyInputForm: React.FC<CommentReplyInputForm> = ({
  id,
  commentId,
}) => {
  const [commentReply, setCommentReply] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const showReplyAlertModal = useModalStore(
    (state) => state.showReplyAlertModal,
  );
  const { setUserTag } = useTagsStore((state) => state);
  const replyRef = useRef<HTMLInputElement>(null);
  const debouncedWord = useDebounce(searchWord, 500);
  const { data: postData } = useFetchPost(id as string);
  const { data: searchUser } = useFetchSearchUser(
    String(postData.diaryId),
    debouncedWord,
  );
  const { mutate } = useCommentReplyMutation(
    String(id),
    String(commentId),
    setCommentReply,
  );

  const parseMentions = (text: string) => {
    return text.replace(/@\[([^\]]+)]\((\d+)\)/g, "@$1");
  };

  const handleCommentReplyChange = (
    _e: { target: { value: string } },
    newValue: string,
    _newPlainTextValue: string,
    mentions: MentionItem[],
  ) => {
    setCommentReply(newValue);
    const match = newValue.match(/@(\s*[\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g);
    if (match) {
      const searchWord = match.map((m) => m.replace(/@\s*/, ""));
      setSearchWord(searchWord[0]);
    }
    setUserTag(mentions);
  };

  const handleReplyClick = (e?: React.FormEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (commentReply.trim() === "") {
      replyRef.current?.focus();
      showReplyAlertModal(true);
      setTimeout(() => {
        showReplyAlertModal(false);
      }, 3000);
      return;
    }

    const formattedContent = parseMentions(commentReply);
    mutate(formattedContent);
  };

  const handleEnterPrevent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleReplyClick();
    }
  };

  return (
    <CommentFormContainer>
      <MentionsInput
        className={"custom-mentions-input"}
        style={mentionStyle}
        inputRef={replyRef}
        value={commentReply}
        onChange={handleCommentReplyChange}
        onKeyDown={handleEnterPrevent}
      >
        <Mention
          style={{
            backgroundColor: "lightGray",
            borderRadius: "4px",
          }}
          trigger={"@"}
          data={
            searchUser?.map((user: tagUserProps) => ({
              id: String(user.userId),
              display: user.userName,
            })) || []
          }
          markup="@[__display__](__id__)"
          displayTransform={(_id, display) => `@${display}`}
        />
      </MentionsInput>
      <button onClick={handleReplyClick}>답글 쓰기</button>
    </CommentFormContainer>
  );
};

export default CommentReply;
