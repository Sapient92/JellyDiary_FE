import React, { useEffect, useRef, useState } from "react";
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
  NextFetchTarget,
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
  const [message, setMessage] = useState("");
  const { userData } = useLoginUser();
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get("roomName");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const {
    isLoading,
    data: messageHistory,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useFetchChatHistory(20, Number(chatId));

  useEffect(() => {
    setInitialLoadComplete(false);
  }, []);

  useEffect(() => {
    if (initialLoadComplete) {
      const options = {
        root: messagesContainerRef?.current,
        rootMargin: "0px",
        threshold: 0.5,
      };

      const fetchCallback: IntersectionObserverCallback = (
        entries,
        observer,
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage?.();
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(fetchCallback, options);
      const currentRef = topRef?.current;

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }
  }, [
    initialLoadComplete,
    messageHistory,
    hasNextPage,
    fetchNextPage,
    topRef,
    messages,
  ]);

  useEffect(() => {
    if (messageHistory) {
      const sortedMessage = [...messageHistory].sort(
        (a: MessageListType, b: MessageListType) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

      const isDifferent =
        sortedMessage.length !== messages.length ||
        sortedMessage.some(
          (message, index) => message.createdAt !== messages[index]?.createdAt,
        );

      if (isDifferent) {
        if (!initialLoadComplete) {
          setMessages(sortedMessage);
          setInitialLoadComplete(true);
        } else {
          setMessages(sortedMessage);
        }
      }
    }
  }, [messageHistory]);

  useEffect(() => {
    if (initialLoadComplete) {
      messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [initialLoadComplete, messages]);

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
        {!isFetching && hasNextPage && (
          <NextFetchTarget ref={topRef}></NextFetchTarget>
        )}
        {messages?.length !== 0 &&
          messages?.map((message, index) => (
            <div
              key={message?.chatMessageId}
              ref={index === 0 ? firstItemRef : null}
            >
              <ChatMessage message={message} />
            </div>
          ))}
        <div ref={messageEndRef}></div>
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
