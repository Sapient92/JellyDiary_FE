import React, { useEffect, useRef, useState } from "react";

import { useModalStore } from "../../../../store/modalStore/modalStore.ts";
import { useCommentMutation } from "../../../../hooks/useComment.ts";
import { useFetchPost, useFetchWriterInfo } from "../../../../hooks/usePost.ts";
import { CommentFooterContainer } from "./CommentFooter.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";
import { Mention, MentionsInput, SuggestionDataItem } from "react-mentions";
import { useFetchSearchUser } from "../../../../hooks/useSearchUser.ts";
import { SearchUser } from "../../../../types/userType.ts";
import { useDebounce } from "../../../../hooks/useDebounce.ts";

interface CommentFooterProps {
  id?: string;
  userId: number;
}

// 멘션 기능 구현할 때 useDebounce 사용해서 Debounce 반환 값을 api 요청으로 보내기

const CommentFooter: React.FC<CommentFooterProps> = ({ id, userId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [searchUsers, setSearchUsers] = useState<SuggestionDataItem[] | []>([
    { id: "0", display: "검색된 유저가 없습니다." },
  ]);
  const [searchWord, setSearchWord] = useState("");
  const { mutate } = useCommentMutation(id as string, setCommentContent);
  const { data: userData } = useFetchWriterInfo(userId);
  const commentRef = useRef<HTMLInputElement>(null);
  const showCommentAlertModal = useModalStore(
    (state) => state.showCommentAlertModal,
  );
  const debouncedWord = useDebounce(searchWord, 500);
  const { data: postData } = useFetchPost(id as string);

  const { data: searchUser } = useFetchSearchUser(
    String(postData.diaryId),
    debouncedWord,
  );

  useEffect(() => {
    const userName = searchUser?.map((data: SearchUser) => {
      const id = data.userId + 1;
      return {
        id,
        display: data.userName,
      };
    });
    if (userName?.length !== 0 && userName) {
      setSearchUsers((prev) => [...prev, ...userName]);
    }
  }, [searchUser]);

  const handlePostClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (commentContent.trim() === "") {
      commentRef.current?.focus();
      showCommentAlertModal(true);
      setTimeout(() => {
        showCommentAlertModal(false);
      }, 3000);
      return;
    }
    mutate(commentContent);
  };

  const handleCommentChange = (
    _e: { target: { value: string } },
    newValue: string,
  ) => {
    setCommentContent(newValue);
    const match = newValue.match(/@(\s*[\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g);
    if (match) {
      const searchWord = match.map((m) => m.replace(/@\s*/, ""));
      setSearchWord(searchWord[0]);
    }
  };

  const handleEnterPrevent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePostClick();
    }
  };

  return (
    <CommentFooterContainer>
      <img
        src={userData?.profileImg ? userData?.profileImg : userAvatar}
        alt={"user_image"}
      />
      <MentionsInput
        inputRef={commentRef}
        value={commentContent}
        onChange={handleCommentChange}
        placeholder={`${userData.userName}님에게 댓글 추가`}
        onKeyDown={handleEnterPrevent}
      >
        <Mention
          trigger={"@"}
          data={
            searchUsers?.length > 0
              ? searchUsers
              : [{ id: "0", display: "검색된 유저가 없습니다." }]
          }
        />
      </MentionsInput>
      <button onClick={handlePostClick}>post</button>
    </CommentFooterContainer>
  );
};

export default CommentFooter;
