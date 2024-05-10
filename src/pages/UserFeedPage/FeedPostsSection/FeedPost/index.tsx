import * as React from "react";

import { FeedPostContainer } from "./FeedPost.styles.ts";

interface FeedPostProps {
  postImg: string;
}

const FeedPost: React.FC<FeedPostProps> = ({ postImg }) => {
  return (
    <FeedPostContainer>
      <img src={postImg} alt={"postImg"} />
    </FeedPostContainer>
  );
};

export default FeedPost;
