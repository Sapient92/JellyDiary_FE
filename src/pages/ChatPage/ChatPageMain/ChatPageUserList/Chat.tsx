import React from "react";
import { ChatType } from "../../../../types/chattingType.ts";

import {
  ChatContainer,
  ChatImgContainer,
  ChatInfoContainer,
} from "./Chat.styles.ts";

import userAvatar from "../../../../assets/images/UserAvatar.png";
import { useNavigate, useParams } from "react-router-dom";

interface ChatProps {
  chat: ChatType;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const { userId, diaryId } = useParams();

  const navigate = useNavigate();
  const handleChatRoomClick = () => {
    if (chat?.userId === Number(userId)) {
      return;
    }
    if (chat?.userId) {
      navigate(`/chat/${chat.userId}?roomName=${chat.chatRoomName}`);
    } else {
      navigate(`/chat/group/${chat.diaryId}?roomName=${chat.chatRoomName}`);
    }
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <ChatContainer onClick={handleChatRoomClick}>
      <ChatImgContainer>
        <img
          src={chat.chatRoomProfileImg ? chat.chatRoomProfileImg : userAvatar}
          alt={"chatRoomProfileImg"}
        />
      </ChatImgContainer>
      <ChatInfoContainer>
        <p>{chat?.chatRoomName}</p>
        {userId || diaryId ? (
          <p>{truncate(chat?.chatMessagePreview, 17)}</p>
        ) : (
          <p>{truncate(chat?.chatMessagePreview, 85)}</p>
        )}
      </ChatInfoContainer>
    </ChatContainer>
  );
};

export default Chat;
