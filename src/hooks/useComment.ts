import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryKeys } from "../react-query/constants.ts";
import { queryClient } from "../react-query/queryClient.ts";

export const useFetchComment = (id: string) =>
  useQuery({
    queryKey: [queryKeys.comment, id],
    queryFn: () => api.get(`/api/comment/commentList/${id}`),
    select: (data) => data.data.data,
  });

export const useCommentMutation = (
  id: string,
  setCommentContent: React.Dispatch<React.SetStateAction<string>>,
) => {
  const addComment = (commentContent: string) => {
    const request = {
      commentContent,
      userTag: [],
    };
    return api.post(`/api/comment/${id}`, request);
  };

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.comment, id] });
      setCommentContent("");
    },
  });

  return { mutate };
};
