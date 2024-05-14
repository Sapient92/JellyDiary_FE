import React from "react";
import { Client } from "@stomp/stompjs";

import { Content } from "../index.tsx";

import ChatPageUserList from "./ChatPageUserList";
import ChatPageChat from "./ChatPageChat";

import { ChatType } from "../../../types/chattingType.ts";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";
import { useParams } from "react-router-dom";

interface ChatPageMainProps {
  chatId: number | null;
  stompClient: Client | null;
  messages: Content[];
  chatList: ChatType[];
}

const ChatPageMain: React.FC<ChatPageMainProps> = ({
  chatId,
  stompClient,
  messages,
  chatList,
}) => {
  const { userId, diaryId } = useParams();
  return (
    <ChatMainContainer>
      <ChatPageUserList chatList={chatList} />
      {(userId || diaryId) && (
        <ChatPageChat chatId={chatId} stompClient={stompClient} />
      )}
    </ChatMainContainer>
  );
};

export default ChatPageMain;
