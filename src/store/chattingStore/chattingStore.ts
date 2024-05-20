import { create } from "zustand";
import { MessageListType } from "../../types/chattingType.ts";
import { Client } from "@stomp/stompjs";

interface ChattingStoreProps {
  messages: MessageListType[] | [];
  stompClient: Client | null;
  chatRoomId: number | null;
  setMessages: (message: MessageListType) => void;
  fetchMessages: (messages: MessageListType[]) => void;
  setStompClient: (client: Client) => void;
  setChatRoomId: (id: number) => void;
}

export const useChattingStore = create<ChattingStoreProps>((set) => ({
  messages: [],
  stompClient: null,
  chatRoomId: null,
  setMessages: (message) =>
    set((prev) => ({
      messages: [...prev.messages, message],
    })),
  fetchMessages: (messages) =>
    set(() => ({
      messages: [...messages],
    })),
  setStompClient: (client) =>
    set(() => ({
      stompClient: client,
    })),
  setChatRoomId: (id) =>
    set(() => ({
      chatRoomId: id,
    })),
}));
