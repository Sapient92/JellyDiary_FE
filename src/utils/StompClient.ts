import { Client } from "@stomp/stompjs";
import { useState } from "react";
import api from "../api";

export const CreateChatRoom = async (diaryId?: string, userId?: string) => {
  const [chatId, setChatId] = useState();
  try {
    if (diaryId) {
      const response = await api.post("/api/chat/room", {
        diaryId: diaryId,
        chatRoomType: "GROUP",
      });
      setChatId(response.data.data);
    } else {
      const response = await api.post("/api/chat/room", {
        userId: userId,
        chatRoomType: "PRIVATE",
      });
      setChatId(response.data.data);
    }
  } catch (e) {
    console.log("채팅방 생성 실패", e);
  }
  return chatId;
};

export const client = new Client({
  brokerURL: "ws://localhost:8080/ws/chat",
  debug: (string) => {
    console.log(string);
  },
});
