import { FeedPostContainer } from "./FeedPost.styles.ts";
import * as React from "react";

interface FeedPostProps {
  fakeImg: string;
}

const FeedPost: React.FC<FeedPostProps> = ({ fakeImg }) => {
  return (
    <FeedPostContainer>
      <img src={fakeImg} alt={"feed_img"} />
    </FeedPostContainer>
  );
};

export default FeedPost;
