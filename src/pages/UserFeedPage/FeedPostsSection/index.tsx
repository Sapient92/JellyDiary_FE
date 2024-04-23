import { PostsSection } from "./FeedPostsSection.styles.ts";
import FeedPost from "./FeedPost";
import FakeCat1 from "../../../assets/testImage/FakeCat-1.png";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { FeedType } from "../../../types/feedType.ts";

const fetchFeeds = () => axios.get("/feeds");

const FeedPostSection = () => {
  const { isLoading, data, isError } = useQuery("fetch-feeds", fetchFeeds);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>데이터를 불러오지 못했습니다.</>;
  return (
    <PostsSection>
      {data?.data.map(
        (feed: FeedType) =>
          feed.isPublic && (
            <Link key={feed.postId} to={`/post/${feed.postId}`}>
              <FeedPost fakeImg={FakeCat1} />
            </Link>
          ),
      )}
    </PostsSection>
  );
};

export default FeedPostSection;
