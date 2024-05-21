import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryKeys } from "../react-query/constants.ts";
import { queryClient } from "../react-query/queryClient.ts";
import { DiaryMemberType } from "../types/postType.ts";

export const useFetchPost = (id: string) =>
  useQuery({
    queryKey: [queryKeys.post, id],
    queryFn: () => {
      return api.get(`/api/post/${id}`);
    },
    select: (r) => r.data.data,
    enabled: !!id,
  });

export const useFetchWriterInfo = (userId: number) =>
  useQuery({
    queryKey: [queryKeys.writerInfo, String(userId)],
    queryFn: () => api.get(`/api/feed/userInfo/${userId}`),
    select: (data) => data.data.data,
  });

export const useFetchPostLikeState = (id: string) =>
  useQuery({
    queryKey: [queryKeys.postLikeState, id],
    queryFn: () => api.get(`/api/post/like/${id}`),
    select: (r) => r.data.data.likeState,
  });

export const useLikeMutation = (id: string) => {
  const changeLike = (like: boolean) => {
    if (!like) {
      return api.post(`/api/post/like/${Number(id)}`);
    } else {
      return api.delete(`/api/post/like/${Number(id)}`);
    }
  };

  const { mutate } = useMutation({
    mutationFn: changeLike,
    onSuccess: () => {
      queryClient.invalidateQueries?.({
        queryKey: [queryKeys.postLikeState, id],
      });
      queryClient.invalidateQueries?.({ queryKey: [queryKeys.post, id] });
    },
  });

  return { mutate };
};

export const useFetchDiaryMember = (diaryId: number) =>
  useQuery({
    queryKey: [queryKeys.diaryMember, diaryId],
    queryFn: () => api.get(`api/diary/user/list/${diaryId}`),
    select: (data) =>
      data.data.data?.map((data: DiaryMemberType) => data.userId),
  });
