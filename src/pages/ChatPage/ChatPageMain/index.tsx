import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";

import ChatPageUserList from "./ChatPageUserList";
import ChatPageChat from "./ChatPageChat";

import { useFetchLoginUser } from "../../../hooks/useLoginUser.ts";
import { ChatType, MessageType } from "../../../types/chattingType.ts";
import { useUserStore } from "../../../store/userStore/userStore.ts";

import { ChatMainContainer } from "./ChatPageMain.styles.ts";

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
