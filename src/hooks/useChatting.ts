import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";
import api from "../api";

export const useFetchChatList = () =>
  useQuery({
    queryKey: [queryKeys.chatList],
    queryFn: () => api.get(`/api/chat/roomList`),
  });
