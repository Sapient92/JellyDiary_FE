import { CommentFooterContainer } from "./CommentFooter.styles.ts";
import userImg from "../../../../assets/testImage/Image.png";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const CommentFooter = () => {
  const [comment, setComment] = useState("");
  const idRef = useRef(10);
  const addComment = (comment: object) => {
    return axios.post("/comment", comment);
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetch-comments");
      setComment("");
      idRef.current++;
    },
  });

  const handlePostClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newComment = {
      userId: idRef.current,
      userName: "찰리친구",
      userProfileImg: "/testImage/FakeCat-1.png",
      commentId: idRef.current + 1,
      createdAt: new Date(),
      userTag: [],
      commentContent: comment,
      isDelete: false,
    };
    mutate(newComment);
  };

  return (
    <CommentFooterContainer>
      <img src={userImg} alt={"user_image"} />
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type={"text"}
        placeholder={"terrylucas님에게 댓글 추가..."}
      />
      <button onClick={handlePostClick}>post</button>
    </CommentFooterContainer>
  );
};

export default CommentFooter;
