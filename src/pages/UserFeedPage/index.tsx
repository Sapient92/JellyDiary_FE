import { FC, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useFetchUserFeed,
  useFetchUserFeedPost,
} from "../../hooks/useUserFeed.ts";
import useLoginUser from "../../hooks/useLoginUser.ts";

import FeedIntroduction from "./FeedIntroduction";
import FeedNavbar from "./FeedNavbar";
import FeedPostSection from "./FeedPostsSection";
import FollowModal from "../../components/Modal/FollowModal";

import { FeedPageContainer, FeedPageContent } from "./UserFeedPage.styles.ts";

const UserFeedPage: FC = () => {
  const [toggleFollowerModal, setToggleFollowerModal] = useState(false);
  const [toggleFollowModal, setToggleFollowModal] = useState(false);
  const { userId } = useParams();
  const { isLoading, data, isError, error } = useFetchUserFeed(
    userId as string,
  );
  const {
    isLoading: postLoading,
    data: postData,
    isError: postIsError,
    error: postError,
  } = useFetchUserFeedPost(userId as string);
  const { isLoginUser, loading } = useLoginUser(userId as string);

  if (isLoading || loading) return <>Loading...</>;
  if (isError) return <>{error?.message}</>;

  return (
    <>
      {toggleFollowerModal && (
        <FollowModal
          title={"팔로워"}
          closeModal={setToggleFollowerModal}
          userId={userId}
        />
      )}
      {toggleFollowModal && (
        <FollowModal
          title={"팔로우"}
          userId={userId}
          closeModal={setToggleFollowModal}
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
            postData={postData}
            isLoginUser={isLoginUser}
          />
          <FeedNavbar />
          <FeedPostSection
            postLoading={postLoading}
            postData={postData}
            postIsError={postIsError}
            postError={postError}
            isLoginUser={isLoginUser}
          />
        </FeedPageContent>
      </FeedPageContainer>
    </>
  );
};

export default UserFeedPage;
