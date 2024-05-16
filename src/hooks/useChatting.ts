import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";
import api from "../api";
import { MessageListType } from "../types/chattingType.ts";

export const useFetchChatList = () =>
  useQuery({
    queryKey: [queryKeys.chatList],
    queryFn: () => api.get(`/api/chat/roomList`),
    select: (data) => data.data.data,
  });

export const useFetchChatHistory = (
  chatRoomId: number | null,
  page: number,
  size: number,
) =>
  useQuery({
    queryKey: [queryKeys.chatHistory, chatRoomId, page, size],
    enabled: !!chatRoomId,
    queryFn: () =>
      api.get(
        `/api/chat/messages?page=${page}&size=${size}&chatRoomId=${chatRoomId}`,
      ),
    select: (data) => {
      return {
        chatMessageList: data.data.data.chatMessageList.sort(
          (a: MessageListType, b: MessageListType) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
        hasNext: data.data.data.hasNext,
        hasPrevious: data.data.data.hasPrevious,
      };
    },
  });
