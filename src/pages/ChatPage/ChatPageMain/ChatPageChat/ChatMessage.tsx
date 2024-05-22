import React from "react";

import { MessageListType } from "../../../../types/chattingType.ts";
import { useUserStore } from "../../../../store/userStore/userStore.ts";

import {
  ReceiverImgContainer,
  ReceiverMessageContainer,
  ReceiverMessageContent,
  SenderMessageContainer,
  SenderMessageContent,
} from "./ChatMessage.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";

interface ChatMessageProps {
  message: MessageListType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const loginUserId = useUserStore((state) => state.loginUserId);

  const WrittenAt = (messageDate: string) => {
    const date = new Date(messageDate);
    const getHour = date.getHours();
    const getMinute = date.getMinutes();
    if (getHour >= 12) {
      return `오후 ${getHour - 12}:${getMinute}`;
    } else {
      return `오전 ${getHour}:${getMinute}`;
    }
  };

  if (loginUserId === Number(message.userId)) {
    return (
      <>
        <SenderMessageContainer>
          <p>{WrittenAt(message.createdAt)}</p>
          <SenderMessageContent>
            <p>{message.chatMessage}</p>
            <img
              src={message.userProfileImg ? message.userProfileImg : userAvatar}
              alt={"userProfileImg"}
            />
          </SenderMessageContent>
        </SenderMessageContainer>
      </>
    );
  } else {
    return (
      <>
        <ReceiverMessageContainer>
          <ReceiverImgContainer>
            <img
              src={message.userProfileImg ? message.userProfileImg : userAvatar}
              alt={"userProfileImg"}
            />
          </ReceiverImgContainer>
          <ReceiverMessageContent>
            <p>{message.userName}</p>
            <p>{message.chatMessage}</p>
          </ReceiverMessageContent>
          <p>{WrittenAt(message.createdAt)}</p>
        </ReceiverMessageContainer>
      </>
    );
  }
};

export default ChatMessage;
