import { PostsSection } from "./FeedPostsSection.styles.ts";
import React from "react";
import { FeedPostType, FeedType } from "../../../types/feedType.ts";
import { Link } from "react-router-dom";
import FeedPost from "./FeedPost";

interface FeedPostSectionProps {
  postLoading: boolean;
  postData: FeedPostType;
  postIsError: boolean;
  postError: Error | null;
  isLoginUser: boolean;
}

const FeedPostSection: React.FC<FeedPostSectionProps> = ({
  postLoading,
  postData,
  postIsError,
  postError,
  isLoginUser,
}) => {
  if (postLoading) return <>로딩중...</>;
  if (postIsError) return <>{postError?.message}</>;
  console.log(postData);

  return (
    <PostsSection>
      {!isLoginUser
        ? postData?.feeds.map(
            (feed: FeedType) =>
              feed.isPublic && (
                <Link key={feed.postId} to={`/post/${feed.postId}`}>
                  <FeedPost
                    postImg={feed.postImg}
                    isMultiple={feed.postImgIsMultiple}
                  />
                </Link>
              ),
          )
        : postData?.feeds.map((feed) => (
            <Link key={feed.postId} to={`/post/${feed.postId}`}>
              <FeedPost
                postImg={feed.postImg}
                isMultiple={feed.postImgIsMultiple}
              />
            </Link>
          ))}
    </PostsSection>
  );
};

export default FeedPostSection;
