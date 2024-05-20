import React from "react";
import { useParams } from "react-router-dom";

import Chat from "./Chat.tsx";

import { ChatType } from "../../../../types/chattingType.ts";
import { useFetchChatList } from "../../../../hooks/useChatting.ts";

import { ChatUserListContainer } from "./ChatPageUserList.styles.ts";

const ChatPageUserList: React.FC = () => {
  const { userId, diaryId } = useParams();
  const { data: chatList } = useFetchChatList();
  const sortedChatList = chatList?.sort(
    (a: ChatType, b: ChatType) =>
      new Date(b.createdAt ? b.createdAt : 0).getTime() -
      new Date(a.createdAt ? a.createdAt : 0).getTime(),
  );

  if (sortedChatList?.length === 0) {
    return <p>채팅방이 존재하지 않습니다.</p>;
  } else {
    return (
      <ChatUserListContainer $isChatting={!!userId || !!diaryId}>
        {sortedChatList?.map((chat: ChatType) => (
          <Chat key={chat.chatRoomId} chat={chat} />
        ))}
      </ChatUserListContainer>
    );
  }
};

export default ChatPageUserList;
