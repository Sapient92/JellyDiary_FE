import { ChatHeaderContainer } from "./ChatPageHeader.styles.ts";
import React from "react";

interface ChatPageHeader {
  userId?: string;
}

const ChatPageHeader: React.FC<ChatPageHeader> = () => {
  return (
    <ChatHeaderContainer>
      <p>채팅</p>
    </ChatHeaderContainer>
  );
};

export default ChatPageHeader;
