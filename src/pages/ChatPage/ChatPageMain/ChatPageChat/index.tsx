import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import { client } from "../../../../utils/StompClient.ts";

import useLoginUser from "../../../../hooks/useLoginUser.ts";

import {
  ChatContainer,
  ChatFlexContainer,
  ChatFooter,
  ChatHeader,
} from "./ChatPageChat.styles.ts";

import sendBtn from "../../../../assets/button/SendBtn.png";

interface ChatPageChat {
  chatId: number | null;
  stompClient: Client | null;
}

const ChatPageChat: React.FC<ChatPageChat> = ({ chatId, stompClient }) => {
  const [message, setMessage] = useState("");
  const { userData } = useLoginUser();
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get("roomName");

  // const { isLoading, data, isError, error } = useFetchChatHistory(
  //   chatId as number,
  // );

  useEffect(() => {
    return () => {
      client.deactivate();
      console.log("언마운트");
    };
  }, []);

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
  // if (isLoading) return <>채팅을 불러오는 중 입니다...</>;
  // if (isError) return <>{error?.message}</>;
  return (
    <ChatContainer>
      <ChatFlexContainer>
        <ChatHeader>
          <p>{roomName}</p>
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
