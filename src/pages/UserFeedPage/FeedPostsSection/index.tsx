import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FeedPost from "./FeedPost";

import { PostsSection } from "./FeedPostsSection.styles.ts";
import { FeedType } from "../../../types/feedType.ts";

import FakeCat1 from "../../../assets/testImage/FakeCat-1.png";

const FeedPostSection = () => {
  // const { isLoading, data, isError } = useQuery({
  //   queryKey: ["fetch-feeds"],
  //   queryFn: fetchFeeds,
  // });

  // if (isLoading) return <>Loading...</>;
  // if (isError) return <>데이터를 불러오지 못했습니다.</>;
  return (
    <PostsSection>
      {/*{data?.data.map(*/}
      {/*  (feed: FeedType) =>*/}
      {/*    feed.isPublic && (*/}
      {/*      <Link key={feed.postId} to={`/post/${feed.postId}`}>*/}
      {/*        <FeedPost fakeImg={FakeCat1} />*/}
      {/*      </Link>*/}
      {/*    ),*/}
      {/*)}*/}
    </PostsSection>
  );
};

export default FeedPostSection;
