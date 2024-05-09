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

export const useFetchCommentReply = (postId: string, commentId: string) =>
  useQuery({
    queryKey: [queryKeys.commentReply, postId, commentId],
    queryFn: () => api.get(`/api/comment/${postId}/${commentId}`),
    select: (data) => data.data.data,
  });

export const useCommentReplyMutation = (
  postId: string,
  commentId: string,
  setCommentReply: React.Dispatch<React.SetStateAction<string>>,
) => {
  const addCommentReply = (replyContent: string) => {
    const request = {
      commentContent: replyContent,
      userTag: [],
    };
    return api.post(`/api/comment/${postId}/${commentId}`, request);
  };

  const { mutate } = useMutation({
    mutationFn: addCommentReply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.commentReply, postId, commentId],
      });
      setCommentReply("");
    },
  });

  return { mutate };
};

export const useCommentDeleteMutation = (postId: number, commentId: number) => {
  const deleteComment = () => api.delete(`api/comment/${postId}/${commentId}`);

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.comment, String(postId)],
      });
    },
  });

  return { mutate };
};
