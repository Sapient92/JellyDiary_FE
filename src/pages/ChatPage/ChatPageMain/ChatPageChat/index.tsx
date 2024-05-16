import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
import { MessageListType } from "../../../../types/chattingType.ts";

interface ChatPageChat {
  chatId: number | null;
  stompClient: Client | null;
  setMessages: React.Dispatch<React.SetStateAction<MessageListType[]>>;
  messages: MessageListType[];
}

const ChatPageChat: React.FC<ChatPageChat> = ({
  chatId,
  stompClient,
  setMessages,
  messages,
}) => {
  const { userId, diaryId } = useParams();
  const [message, setMessage] = useState("");
  const { userData } = useLoginUser();
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get("roomName");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);

  const {
    isLoading,
    data: messageHistory,
    isError,
    error,
  } = useFetchChatHistory(Number(chatId), page, 20);

  useEffect(() => {
    if (messageHistory) {
      setMessages([...messageHistory.chatMessageList]);
    }
  }, [messageHistory]);

  // IntersectionObserver
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && messageHistory?.hasNext) {
          console.log("First Items is visible");
          setPage((prevPage) => prevPage + 1);
        }
      });
    };

    const observerOptions = {
      root: messagesContainerRef?.current,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const currentRef = firstItemRef?.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [messageHistory?.hasNext]);

  useEffect(() => {
    const scrollableElement = messagesContainerRef?.current;
    const scrollToBottom = () => {
      if (
        scrollableElement &&
        scrollableElement.scrollHeight > scrollableElement.clientHeight
      ) {
        scrollableElement.scrollTop =
          scrollableElement.scrollHeight - scrollableElement.clientHeight;
      }
    };
    scrollToBottom();

    const observer = new MutationObserver(scrollToBottom);
    if (scrollableElement) {
      observer.observe(scrollableElement, { childList: true, subtree: true });
    }
    return () => {
      observer.disconnect();
    };
  }, [messagesContainerRef?.current]);

  useEffect(() => {
    return () => {
      client.deactivate();
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
      <ChatMessagesContainer ref={messagesContainerRef}>
        {messages?.length !== 0 &&
          messages?.map((message, index) => (
            <div
              key={message?.chatMessageId}
              ref={index === 0 ? firstItemRef : null}
            >
              <ChatMessage message={message} />
            </div>
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
