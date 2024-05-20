import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ChatPageHeader from "./ChatPageHeader";
import ChatPageMain from "./ChatPageMain";
import api from "../../api";

import { ChatPageContainer, ChatPageContent } from "./ChatPage.styles.ts";
import { client } from "../../utils/StompClient.ts";
import { ChatType } from "../../types/chattingType.ts";
import {
  useChatListMutation,
  useFetchChatList,
} from "../../hooks/useChatting.ts";
import { useChattingStore } from "../../store/chattingStore/chattingStore.ts";

const ChatPage = () => {
  const { userId, diaryId } = useParams();

  const { chatRoomId, setChatRoomId, setMessages, setStompClient } =
    useChattingStore((state) => state);
  const { data: chatList } = useFetchChatList();
  const { mutate } = useChatListMutation();

  useEffect(() => {
    const chatRoomId = chatList?.map((chat: ChatType) => chat.chatRoomId);
    const existedChatRoom = chatRoomId?.includes(Number(chatRoomId));
    if (!existedChatRoom) {
      mutate();
    }
  }, [chatRoomId]);

  useEffect(() => {
    if (!diaryId && !userId) {
      return;
    }
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
        setChatRoomId(response.data.data);
      } catch (e) {
        console.error("채팅방 생성 실패: ", e);
      }
    }
    createRoom(diaryId, userId);
  }, [userId, diaryId]);

  useEffect(() => {
    if (chatRoomId) {
      setStompClient(client);
      client.activate();
      client.onConnect = () => {
        const address = diaryId
          ? `/topic/group/${chatRoomId}`
          : `/queue/private/${chatRoomId}`;
        client.subscribe(address, (frame) => {
          try {
            const parsedMessage = JSON.parse(frame.body);
            setMessages(parsedMessage);
          } catch (error) {
            console.error("오류가 발생했습니다: ", error);
          }
        });
      };
    }
    return () => {
      console.log("채팅방 종료");
      client.deactivate?.();
    };
  }, [chatRoomId]);

  return (
    <ChatPageContainer>
      <ChatPageContent>
        <ChatPageHeader />
        <ChatPageMain />
      </ChatPageContent>
    </ChatPageContainer>
  );
};

export default ChatPage;
