import {
  ChatContainer,
  ChatFlexContainer,
  ChatFooter,
  ChatHeader,
} from "./ChatPageChat.styles.ts";

import sendBtn from "../../../../assets/button/SendBtn.png";
import React, { useState } from "react";
import { client } from "../../../../utils/StompClient.ts";
import useLoginUser from "../../../../hooks/useLoginUser.ts";
import { Client } from "@stomp/stompjs";

interface ChatPageChat {
  chatId: number | null;
  stompClient: Client | null;
}

const ChatPageChat: React.FC<ChatPageChat> = ({ chatId, stompClient }) => {
  const [message, setMessage] = useState("");
  const { userData } = useLoginUser();

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (stompClient && stompClient?.connected) {
      client.publish({
        destination: `/app/${chatId}`,
        body: JSON.stringify({
          chatMessage: message,
          userId: userData?.userId,
        }),
      });
    }
    setMessage("");
  };

  return (
    <ChatContainer>
      <ChatFlexContainer>
        <ChatHeader>
          <p>Clementine</p>
        </ChatHeader>
      </ChatFlexContainer>
      <ChatFooter>
        <input
          type={"text"}
          value={message}
          onChange={handleMessageChange}
          placeholder={"대화를 나눠보세요."}
        />
        <button onClick={handleSendMessage}>
          <img src={sendBtn} alt={"message_send_button"} />
        </button>
      </ChatFooter>
    </ChatContainer>
  );
};

export default ChatPageChat;
