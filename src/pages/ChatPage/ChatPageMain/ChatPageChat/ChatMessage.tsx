import {
  ReceiverImgContainer,
  ReceiverMessageContainer,
  ReceiverMessageContent,
  SenderMessageContainer,
  SenderMessageContent,
} from "./ChatMessage.styles.ts";
import { MessageType } from "../../../../types/chattingType.ts";
import React from "react";
import useLoginUser from "../../../../hooks/useLoginUser.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";

interface ChatMessageProps {
  message: MessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { isLoginUser } = useLoginUser(message.userId);

  if (isLoginUser) {
    return (
      <SenderMessageContainer>
        <SenderMessageContent>
          <p>{message.chatMessage}</p>
          <img
            src={message.userProfileImg ? message.userProfileImg : userAvatar}
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
          />
        </ReceiverImgContainer>
        <ReceiverMessageContent>
          <p>{message.userName}</p>
          <p>{message.chatMessage}</p>
        </ReceiverMessageContent>
      </ReceiverMessageContainer>
    );
  }
};

export default ChatMessage;
