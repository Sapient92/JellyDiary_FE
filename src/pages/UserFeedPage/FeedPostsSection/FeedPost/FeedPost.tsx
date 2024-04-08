import { FeedPostContainer } from "./FeedPost.styles.ts";

const FeedPost = ({ fakeImg }) => {
  return (
    <FeedPostContainer>
      <img src={fakeImg} alt={"feed_img"} />
    </FeedPostContainer>
  );
};

export default FeedPost;
