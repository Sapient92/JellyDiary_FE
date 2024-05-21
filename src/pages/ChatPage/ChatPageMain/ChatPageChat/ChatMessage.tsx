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
import UseWrittenAt from "../../../../hooks/useWrittenAt.ts";

interface ChatMessageProps {
  message: MessageListType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const loginUserId = useUserStore((state) => state.loginUserId);

  if (loginUserId === Number(message.userId)) {
    return (
      <SenderMessageContainer>
        <p>{UseWrittenAt(message.createdAt)}</p>
        <SenderMessageContent>
          <p>{message.chatMessage}</p>
          <img
            src={message.userProfileImg ? message.userProfileImg : userAvatar}
            alt={"userProfileImg"}
          />
        </SenderMessageContent>
      </SenderMessageContainer>
    );
  } else {
    return (
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
        <p>{UseWrittenAt(message.createdAt)}</p>
      </ReceiverMessageContainer>
    );
  }
};

export default ChatMessage;
