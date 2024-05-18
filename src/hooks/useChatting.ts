import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";
import api from "../api";

export const useFetchChatList = () =>
  useQuery({
    queryKey: [queryKeys.chatList],
    queryFn: () => api.get(`/api/chat/roomList`),
    select: (data) => data.data.data,
  });

export const useFetchChatHistory = (size: number, chatRoomId: number) => {
  const { isLoading, data, ...rest } = useInfiniteQuery({
    queryKey: [queryKeys.chatPaginated, size, chatRoomId],
    enabled: !!chatRoomId,
    staleTime: 50000000000000,
    queryFn: ({ pageParam }) => {
      return api.get(
        `/api/chat/messages?page=${pageParam}&size=${size}&chatRoomId=${chatRoomId}`,
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.data.hasNext) {
        return lastPage.data.data.page + 1;
      } else {
        return null;
      }
    },
    select: (r) => {
      return r.pages.flatMap((r) => r.data.data.chatMessageList);
    },
  });
  return { data, isLoading, ...rest };
};
