import React from "react";
import { useParams } from "react-router-dom";

import Chat from "./Chat.tsx";
import ChatPageUserSearch from "./ChatPageUserSearch";

import { ChatType } from "../../../../types/chattingType.ts";

import { ChatUserListContainer } from "./ChatPageUserList.styles.ts";

interface ChatPageUserList {
  chatList: ChatType[];
}

const ChatPageUserList: React.FC<ChatPageUserList> = ({ chatList }) => {
  const { userId, diaryId } = useParams();

  return (
    <ChatUserListContainer $isChatting={!!userId || !!diaryId}>
      <ChatPageUserSearch />
      {chatList?.map((chat) => <Chat key={chat.chatRoomId} chat={chat} />)}
    </ChatUserListContainer>
  );
};

export default ChatPageUserList;
