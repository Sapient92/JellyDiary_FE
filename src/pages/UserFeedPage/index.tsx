import { FC, useState } from "react";

import FeedIntroduction from "./FeedIntroduction";
import FeedNavbar from "./FeedNavbar";
import FeedPostSection from "./FeedPostsSection";
import FollowModal from "../../components/Modal/FollowModal";

import { FeedPageContainer, FeedPageContent } from "./UserFeedPage.styles.ts";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { useParams } from "react-router-dom";

const UserFeedPage: FC = () => {
  const [toggleFollowerModal, setToggleFollowerModal] = useState(false);
  const [toggleFollowModal, setToggleFollowModal] = useState(false);
  const { userId } = useParams();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetch-userFeed", userId],
    queryFn: () => api.get(`/api/feed/userInfo/${userId}`),
    select: (data) => data.data?.data,
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>불러오는 중 에러가 발생했습니다.</>;

  return (
    <>
      {toggleFollowerModal && (
        <FollowModal
          title={"팔로워"}
          closeModal={setToggleFollowerModal}
          follow={data.followerCount}
        />
      )}
      {toggleFollowModal && (
        <FollowModal
          title={"팔로우"}
          closeModal={setToggleFollowModal}
          follow={data.followingCount}
        />
      )}
      <FeedPageContainer
        $toggleFollowerModal={toggleFollowerModal}
        $toggleFollowModal={toggleFollowModal}
      >
        <FeedPageContent>
          <FeedIntroduction
            setToggleFollowerModal={setToggleFollowerModal}
            setToggleFollowModal={setToggleFollowModal}
            data={data}
          />
          <FeedNavbar />
          <FeedPostSection />
        </FeedPageContent>
      </FeedPageContainer>
    </>
  );
};

export default UserFeedPage;
