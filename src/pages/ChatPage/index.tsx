import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useParams } from "react-router-dom";

import ChatPageHeader from "./ChatPageHeader";
import ChatPageMain from "./ChatPageMain";

import { client } from "../../utils/StompClient.ts";
import api from "../../api";

import { ChatPageContainer, ChatPageContent } from "./ChatPage.styles.ts";

export interface Content {
  chatMessage: string;
  userId?: number;
}

const ChatPage = () => {
  const { userId } = useParams();
  const { diaryId } = useParams();
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Content[]>([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    async function createRoom(diaryId?: string, userId?: string) {
      try {
        const response = diaryId
          ? await api.post("/api/chat/room", {
              diaryId: diaryId,
              chatRoomType: "GROUP",
            })
          : await api.post("/api/chat/room", {
              userId: userId,
              chatRoomType: "PRIVATE",
            });
        setChatId(response.data.data);
      } catch (e) {
        console.error("채팅방 생성 실패: ", e);
      }
    }
    createRoom(diaryId, userId);
  }, [userId]);

  useEffect(() => {
    if (chatId) {
      setStompClient(client);
      client.activate();
      client.onConnect = () => {
        console.log("WebSocket 연결이 열렸습니다.");
        client.subscribe(`/queue/private/${chatId}`, (frame) => {
          try {
            const parsedMessage = JSON.parse(frame.body);
            setMessages((prev) => [...prev, parsedMessage]);
          } catch (error) {
            console.error("오류가 발생했습니다: ", error);
          }
        });
      };
    }
    return () => {
      client.deactivate();
    };
  }, [chatId]);

  return (
    <ChatPageContainer>
      <ChatPageContent>
        <ChatPageHeader userId={userId} />
        <ChatPageMain
          messages={messages}
          chatId={chatId}
          stompClient={stompClient}
        />
      </ChatPageContent>
    </ChatPageContainer>
  );
};

export default ChatPage;
