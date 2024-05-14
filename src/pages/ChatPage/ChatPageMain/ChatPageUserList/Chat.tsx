import React from "react";
import { ChatType } from "../../../../types/chattingType.ts";

import {
  ChatContainer,
  ChatImgContainer,
  ChatInfoContainer,
} from "./Chat.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";
import { useNavigate } from "react-router-dom";

interface ChatProps {
  chat: ChatType;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const navigate = useNavigate();
  const handleChatRoomClick = () => {
    if (chat?.userId) {
      navigate(`/chat/${chat.userId}?roomName=${chat.chatRoomName}`);
    } else {
      navigate(`/chat/group/${chat.diaryId}?roomName=${chat.chatRoomName}`);
    }
  };

  return (
    <ChatContainer onClick={handleChatRoomClick}>
      <ChatImgContainer>
        <img
          src={chat.chatRoomProfileImg ? chat.chatRoomProfileImg : userAvatar}
        />
      </ChatImgContainer>
      <ChatInfoContainer>
        <p>{chat?.chatRoomName}</p>
        <p>{chat?.chatMessagePreview}</p>
      </ChatInfoContainer>
    </ChatContainer>
  );
};

export default Chat;
