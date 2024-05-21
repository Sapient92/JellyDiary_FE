import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ChatMessage from "./ChatMessage.tsx";

import { client } from "../../../../utils/StompClient.ts";
import useLoginUser from "../../../../hooks/useLoginUser.ts";
import {
  useChatListMutation,
  useFetchChatHistory,
} from "../../../../hooks/useChatting.ts";
import { MessageListType } from "../../../../types/chattingType.ts";
import { useChattingStore } from "../../../../store/chattingStore/chattingStore.ts";

import {
  ChatContainer,
  ChatFlexContainer,
  ChatFooter,
  ChatHeader,
  ChatMessagesContainer,
  NextFetchTarget,
} from "./ChatPageChat.styles.ts";

import sendBtn from "../../../../assets/button/SendBtn.png";
import { queryClient } from "../../../../react-query/queryClient.ts";
import { queryKeys } from "../../../../react-query/constants.ts";

const ChatPageChat: React.FC = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [searchParams] = useSearchParams();
  const roomName = searchParams.get("roomName");
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const { messages, fetchMessages, chatRoomId } = useChattingStore(
    (state) => state,
  );

  const {
    isLoading,
    data: messageHistory,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useFetchChatHistory(20, Number(chatRoomId));

  console.log("messages: ", messages);
  console.log("messageHistory", messageHistory);

  useEffect(() => {
    fetchMessages([]);
    queryClient.invalidateQueries?.({
      queryKey: [queryKeys.chatPaginated, 20, chatRoomId],
    });
  }, [chatRoomId]);

  useEffect(() => {
    setInitialLoadComplete(false);
  }, []);

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
          fetchMessages(sortedMessage);
          setInitialLoadComplete(true);
        } else {
          fetchMessages(sortedMessage);
        }
      }
    }
  }, [messageHistory]);

  useEffect(() => {
    if (!messagesContainerRef) return;
    if (
      messagesContainerRef.current &&
      messages.length === messageHistory?.length
    ) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight - scrollHeight;
      setScrollHeight(messagesContainerRef.current.scrollHeight);
    }
    if (messages.length > (messageHistory ? messageHistory?.length : 0)) {
      messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages?.length]);

  useEffect(() => {
    if (initialLoadComplete && hasNextPage) {
      const options = {
        root: messagesContainerRef?.current,
        rootMargin: "0px",
        threshold: 0.1,
      };

      let timeoutId: NodeJS.Timeout | null;
      const fetchCallback: IntersectionObserverCallback = (
        entries,
        observer,
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !timeoutId) {
            observer.unobserve(entry.target);
            fetchNextPage?.().then(() => {
              timeoutId = setTimeout(() => {
                currentRef && observer.observe(currentRef);
                timeoutId = null;
              }, 500);
            });
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
  }, [topRef?.current, hasNextPage, initialLoadComplete]);

  useEffect(() => {
    if (initialLoadComplete) {
      messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [initialLoadComplete]);

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
        {hasNextPage && <NextFetchTarget ref={topRef}></NextFetchTarget>}
        {messages?.length !== 0 &&
          messages?.map((message) => (
            <div key={message?.chatMessageId}>
              <ChatMessage message={message} />
            </div>
          ))}
        <div ref={messageEndRef}></div>
      </ChatMessagesContainer>
      <ChatFooterForm />
    </ChatContainer>
  );
};

export default ChatPageChat;

const ChatFooterForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const { userData } = useLoginUser();
  const { chatRoomId, stompClient } = useChattingStore((state) => state);
  const { mutate } = useChatListMutation();
  const messageRef = useRef<HTMLInputElement>(null);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (message.trim() === "") {
      messageRef.current?.focus();
      return;
    }
    if (stompClient && stompClient?.connected) {
      client.publish({
        destination: `/app/${chatRoomId}`,
        body: JSON.stringify({
          chatMessage: message,
          userId: userData?.userId,
        }),
      });
    }
    setMessage("");
    mutate();
  };
  return (
    <ChatFooter>
      <input
        ref={messageRef}
        type={"text"}
        value={message}
        onChange={handleMessageChange}
        placeholder={"대화를 나눠보세요."}
      />
      <button onClick={handleSendMessage}>
        <img src={sendBtn} alt={"message_send_button"} />
      </button>
    </ChatFooter>
  );
};
