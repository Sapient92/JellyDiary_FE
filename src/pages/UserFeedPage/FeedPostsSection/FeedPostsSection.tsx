import { PostsSection } from "./FeedPostsSection.styles.ts";
import FeedPost from "./FeedPost/FeedPost.tsx";
import FakeCat1 from "../../../assets/testImage/FakeCat-1.png";
import FakeCat2 from "../../../assets/testImage/FakeCat-2.png";
import FakeCat3 from "../../../assets/testImage/FakeCat-3.png";

const FeedPostsSection = () => {
  return (
    <PostsSection>
      <FeedPost fakeImg={FakeCat1} />
      <FeedPost fakeImg={FakeCat2} />
      <FeedPost fakeImg={FakeCat3} />
      <FeedPost fakeImg={FakeCat1} />
      <FeedPost fakeImg={FakeCat2} />
      <FeedPost fakeImg={FakeCat3} />
    </PostsSection>
  );
};

export default FeedPostsSection;
