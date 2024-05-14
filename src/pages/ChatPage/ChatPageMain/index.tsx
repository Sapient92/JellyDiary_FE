import React from "react";
import { Client } from "@stomp/stompjs";

import ChatPageUserList from "./ChatPageUserList";
import ChatPageChat from "./ChatPageChat";

import { ChatType, MessageType } from "../../../types/chattingType.ts";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";
import { useParams } from "react-router-dom";

interface ChatPageMainProps {
  chatId: number | null;
  stompClient: Client | null;
  messages: MessageType[];
  chatList: ChatType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const ChatPageMain: React.FC<ChatPageMainProps> = ({
  chatId,
  stompClient,
  messages,
  setMessages,
  chatList,
}) => {
  const { userId, diaryId } = useParams();

  return (
    <ChatMainContainer>
      <ChatPageUserList chatList={chatList} />
      {(userId || diaryId) && (
        <ChatPageChat
          messages={messages}
          chatId={chatId}
          stompClient={stompClient}
          setMessages={setMessages}
        />
      )}
    </ChatMainContainer>
  );
};

export default ChatPageMain;
