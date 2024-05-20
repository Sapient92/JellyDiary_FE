import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../react-query/constants.ts";
import api from "../api";

export const useFetchSearchUser = (diaryId: string, params: string) =>
  useQuery({
    queryKey: [queryKeys.searchUsers, diaryId, params],
    queryFn: () =>
      api.get(`/api/diary/user/${diaryId}/search?searchWord=${params}`),
    select: (data) => {
      return data.data.data;
    },
  });
