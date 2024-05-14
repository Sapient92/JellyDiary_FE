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
  ChatMessagesContainer,
} from "./ChatPageChat.styles.ts";

import sendBtn from "../../../../assets/button/SendBtn.png";
import { useFetchChatHistory } from "../../../../hooks/useChatting.ts";
import ChatMessage from "./ChatMessage.tsx";
import { MessageType } from "../../../../types/chattingType.ts";

interface ChatPageChat {
  chatId: number | null;
  stompClient: Client | null;
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  messages: MessageType[];
}

const ChatPageChat: React.FC<ChatPageChat> = ({
  chatId,
  stompClient,
  setMessages,
  messages,
}) => {
  const [message, setMessage] = useState("");
  const { userData } = useLoginUser();
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get("roomName");

  const {
    isLoading,
    data: messageHistory,
    isError,
    error,
  } = useFetchChatHistory(Number(chatId));

  useEffect(() => {
    if (messageHistory) {
      setMessages(messageHistory);
    }
  }, [messageHistory]);

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
  if (isLoading) return <>채팅을 불러오는 중 입니다...</>;
  if (isError) return <>{error?.message}</>;
  return (
    <ChatContainer>
      <ChatFlexContainer>
        <ChatHeader>
          <p>{roomName}</p>
        </ChatHeader>
      </ChatFlexContainer>
      <ChatMessagesContainer>
        {messages?.length !== 0 &&
          messages?.map((message) => (
            <ChatMessage key={message?.chatMessageId} message={message} />
          ))}
      </ChatMessagesContainer>
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
