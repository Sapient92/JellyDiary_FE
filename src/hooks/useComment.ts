import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { queryKeys } from "../react-query/constants.ts";
import { queryClient } from "../react-query/queryClient.ts";
import { useTagsStore } from "../store/tagStore/tagStore.ts";

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
  const { userTag } = useTagsStore((state) => state);
  const addComment = (commentContent: string) => {
    const tagId = userTag?.map((user) => user.id);
    const request = {
      commentContent,
      userTag: tagId,
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

export const useCommentDeleteMutation = (
  postId: number,
  commentId?: number,
  replyId?: {
    parentId: number;
    replyId: number;
  },
) => {
  const deleteComment = () => {
    if (commentId) {
      return api.delete(`api/comment/${postId}/${commentId}`);
    } else {
      return api.delete(`api/comment/${postId}/${replyId?.replyId}`);
    }
  };

  const { mutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (commentId) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.comment, String(postId)],
        });
      } else if (replyId) {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.commentReply,
            String(postId),
            String(replyId.parentId),
          ],
        });
      }
    },
  });

  return { mutate };
};
