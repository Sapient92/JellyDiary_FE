import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";

import ChatPageUserList from "./ChatPageUserList";

import { useFetchLoginUser } from "../../../hooks/useLoginUser.ts";
import { ChatType, MessageListType } from "../../../types/chattingType.ts";
import { useUserStore } from "../../../store/userStore/userStore.ts";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";
import ChatPageChat from "./ChatPageChat";

interface ChatPageMainProps {
  chatId: number | null;
  stompClient: Client | null;
  messages: MessageListType[];
  chatList: ChatType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageListType[]>>;
}

const ChatPageMain: React.FC<ChatPageMainProps> = ({
  chatId,
  stompClient,
  messages,
  setMessages,
  chatList,
}) => {
  const { userId, diaryId } = useParams();
  const { data } = useFetchLoginUser();
  const setLoginUserId = useUserStore((state) => state.setLoginUserId);

  useEffect(() => {
    if (data) {
      setLoginUserId(data?.userId);
    }
  }, [data]);

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
