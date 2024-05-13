import ChatPageUserList from "./ChatPageUserList";
import ChatPageChat from "./ChatPageChat";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";
import React from "react";
import { Client } from "@stomp/stompjs";
import { Content } from "../index.tsx";

interface ChatPageMainProps {
  chatId: number | null;
  stompClient: Client | null;
  messages: Content[];
}

const ChatPageMain: React.FC<ChatPageMainProps> = ({
  chatId,
  stompClient,
  messages,
}) => {
  console.log(messages);
  return (
    <ChatMainContainer>
      <ChatPageUserList />
      <ChatPageChat chatId={chatId} stompClient={stompClient} />
    </ChatMainContainer>
  );
};

export default ChatPageMain;
