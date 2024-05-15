import React, { useState } from "react";

import {
  LeftClickButton,
  PostDetailImgsContainer,
  PostImgContainer,
  PostImgNavigator,
  PostImgNavigatorContainer,
  RightClickButton,
} from "./PostDetailImgs.styles.ts";

export interface PostImg {
  imgId: number;
  diaryPostImg: string;
}

interface PostDetailImgsProps {
  postImgs: PostImg[];
}

const PostDetailImgs: React.FC<PostDetailImgsProps> = ({ postImgs }) => {
  const [postIndex, setPostIndex] = useState(0);
  const handleRightClick = () => {
    if (postIndex !== postImgs.length - 1) {
      setPostIndex(postIndex + 1);
    }
  };

  const handleLeftClick = () => {
    if (postIndex !== 0) {
      setPostIndex(postIndex - 1);
    }
  };

  const handleNavigatorClick = (index: number) => {
    if (postIndex !== index) {
      setPostIndex(index);
    }
  };

  return (
    <PostDetailImgsContainer $postImgs={postImgs} $postIndex={postIndex}>
      <LeftClickButton onClick={handleLeftClick} />
      <PostImgContainer>
        <img src={postImgs[postIndex].diaryPostImg} alt={"postImg"} />
      </PostImgContainer>
      <RightClickButton onClick={handleRightClick} />
      <PostImgNavigatorContainer>
        {postImgs?.map((img, index) => (
          <PostImgNavigator
            key={img.imgId}
            $isView={img.diaryPostImg === postImgs[postIndex].diaryPostImg}
            onClick={() => handleNavigatorClick(index)}
          ></PostImgNavigator>
        ))}
      </PostImgNavigatorContainer>
    </PostDetailImgsContainer>
  );
};

export default PostDetailImgs;
