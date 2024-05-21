import React, { useEffect, useRef, useState } from "react";

import { useModalStore } from "../../../../store/modalStore/modalStore.ts";
import { useCommentMutation } from "../../../../hooks/useComment.ts";
import { useFetchPost, useFetchWriterInfo } from "../../../../hooks/usePost.ts";
import { CommentFooterContainer } from "./CommentFooter.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";
import { Mention, MentionItem, MentionsInput } from "react-mentions";
import { useFetchSearchUser } from "../../../../hooks/useSearchUser.ts";
import { useDebounce } from "../../../../hooks/useDebounce.ts";
import mentionStyle from "./defaultStyle.ts";
import { useTagsStore } from "../../../../store/tagStore/tagStore.ts";

interface CommentFooterProps {
  id?: string;
  userId: number;
}

interface tagUserProps {
  isInvited: boolean;
  profileImg: string | null;
  userId: number;
  userName: string;
}

const CommentFooter: React.FC<CommentFooterProps> = ({ id, userId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [searchUsers, setSearchUsers] = useState<tagUserProps[] | []>([]);
  const { mutate } = useCommentMutation(id as string, setCommentContent);
  const { data: userData } = useFetchWriterInfo(userId);
  const commentRef = useRef<HTMLInputElement>(null);
  const showCommentAlertModal = useModalStore(
    (state) => state.showCommentAlertModal,
  );
  const { setUserTag } = useTagsStore((state) => state);
  const debouncedWord = useDebounce(searchWord, 500);
  const { data: postData } = useFetchPost(id as string);
  const { data: searchUser } = useFetchSearchUser(
    String(postData.diaryId),
    debouncedWord,
  );

  useEffect(() => {
    if (searchUser?.length > 1) {
      setSearchUsers([...searchUser]);
    }
  }, [searchUser?.length]);

  const parseMentions = (text: string) => {
    return text.replace(/@\[([^\]]+)]\((\d+)\)/g, "@$1");
  };

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

    const formattedContent = parseMentions(commentContent);
    mutate(formattedContent);
  };

  const handleCommentChange = (
    _e: { target: { value: string } },
    newValue: string,
    _newPlainTextValue: string,
    mentions: MentionItem[],
  ) => {
    setCommentContent(newValue);
    const matches = newValue.match(/@(\s*[\w가-힣ㄱ-ㅎㅏ-ㅣ]+)/g);
    if (matches && matches.length) {
      // const lastMatch = matches.map((m) => m.replace(/@\s*/, ""));
      const lastMatch = matches[matches.length - 1];
      const searchWord = lastMatch.slice(1).trim();
      // setSearchWord(searchWord[0]);
      setSearchWord(searchWord);
    } else {
      setSearchWord("");
    }
    setUserTag(mentions);
  };

  const handleEnterPrevent = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePostClick();
    }
  };

  // const mentionData = () =>
  //   searchUser?.map((user: tagUserProps) => {
  //     return {
  //       id: String(user.userId),
  //       display: user.userName,
  //     };
  //   }) || [];

  return (
    <CommentFooterContainer>
      <img
        src={userData?.profileImg ? userData?.profileImg : userAvatar}
        alt={"user_image"}
      />
      <MentionsInput
        style={mentionStyle}
        inputRef={commentRef}
        value={commentContent}
        onChange={handleCommentChange}
        placeholder={`${userData.userName}님에게 댓글 추가`}
        onKeyDown={handleEnterPrevent}
      >
        <Mention
          style={{
            backgroundColor: "lightGray",
            borderRadius: "4px",
          }}
          trigger={"@"}
          data={
            // mentionData
            searchUsers?.map((user: tagUserProps) => ({
              id: String(user.userId),
              display: user.userName,
            })) || []
          }
          markup="@[__display__](__id__)"
          displayTransform={(_id, display) => `@${display}`}
        />
      </MentionsInput>
      <button onClick={handlePostClick}>post</button>
    </CommentFooterContainer>
  );
};

export default CommentFooter;
