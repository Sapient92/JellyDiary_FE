import * as React from "react";

import { FeedPostContainer } from "./FeedPost.styles.ts";

import isImageMultiple from "../../../../assets/images/isImageMultiple.png";

interface FeedPostProps {
  postImg: string;
  isMultiple: boolean;
}

const FeedPost: React.FC<FeedPostProps> = ({ postImg, isMultiple }) => {
  return (
    <FeedPostContainer $isMultiple={isMultiple}>
      {isMultiple && <img src={isImageMultiple} alt={"imageMultipleIcon"} />}
      <img src={postImg} alt={"postImg"} />
    </FeedPostContainer>
  );
};

export default FeedPost;
