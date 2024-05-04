import { PostsSection } from "./FeedPostsSection.styles.ts";
import React from "react";
import { FeedPostType, FeedType } from "../../../types/feedType.ts";
import { Link } from "react-router-dom";
import FeedPost from "./FeedPost";
import FakeCat1 from "../../../assets/testImage/FakeCat-1.png";

interface FeedPostSectionProps {
  postLoading: boolean;
  postData: FeedPostType;
  postIsError: boolean;
  postError: Error | null;
}
const FeedPostSection: React.FC<FeedPostSectionProps> = ({
  postLoading,
  postData,
  postIsError,
  postError,
}) => {
  if (postLoading) return <>로딩중...</>;
  if (postIsError) return <>{postError?.message}</>;

  console.log(postData);

  return (
    <PostsSection>
      {postData?.feeds.map(
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
