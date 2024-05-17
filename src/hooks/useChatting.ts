import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";
import api from "../api";
import chatMessage from "../pages/ChatPage/ChatPageMain/ChatPageChat/ChatMessage.tsx";

export const useFetchChatList = () =>
  useQuery({
    queryKey: [queryKeys.chatList],
    queryFn: () => api.get(`/api/chat/roomList`),
    select: (data) => data.data.data,
  });

// export const useFetchChatHistory = (
//   chatRoomId: number | null,
//   page: number,
//   size: number,
// ) =>
//   useQuery({
//     queryKey: [queryKeys.chatHistory, chatRoomId, page, size],
//     enabled: !!chatRoomId,
//     queryFn: () =>
//       api.get(
//         `/api/chat/messages?page=${page}&size=${size}&chatRoomId=${chatRoomId}`,
//       ),
//     select: (data) => {
//       return {
//         chatMessageList: data.data.data.chatMessageList.sort(
//           (a: MessageListType, b: MessageListType) =>
//             new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
//         ),
//         hasNext: data.data.data.hasNext,
//         hasPrevious: data.data.data.hasPrevious,
//         page: data.data.data.page,
//       };
//     },
//   });
export const useFetchChatHistory = (size: number, chatRoomId: number) => {
  const { isLoading, data, ...rest } = useInfiniteQuery({
    queryKey: [queryKeys.chatPaginated, size, chatRoomId],
    enabled: !!chatRoomId,
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
      const page = r.pages.flatMap((r) => r.data.data.chatMessageList);
      return page;
    },
  });
  return { data, isLoading, ...rest };
};
