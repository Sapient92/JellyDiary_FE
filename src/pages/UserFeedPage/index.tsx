import { FC, useState } from "react";

import FeedIntroduction from "./FeedIntroduction";
import FeedNavbar from "./FeedNavbar";
import FeedPostSection from "./FeedPostsSection";
import FollowModal from "../../components/Modal/FollowModal";

import { FeedPageContainer, FeedPageContent } from "./UserFeedPage.styles.ts";

const UserFeedPage: FC = () => {
  const [toggleFollowerModal, setToggleFollowerModal] = useState(false);
  const [toggleFollowModal, setToggleFollowModal] = useState(false);

  return (
    <>
      {toggleFollowerModal && (
        <FollowModal title={"팔로워"} closeModal={setToggleFollowerModal} />
      )}
      {toggleFollowModal && (
        <FollowModal title={"팔로우"} closeModal={setToggleFollowModal} />
      )}
      <FeedPageContainer
        $toggleFollowerModal={toggleFollowerModal}
        $toggleFollowModal={toggleFollowModal}
      >
        <FeedPageContent>
          <FeedIntroduction
            setToggleFollowerModal={setToggleFollowerModal}
            setToggleFollowModal={setToggleFollowModal}
          />
          <FeedNavbar />
          <FeedPostSection />
        </FeedPageContent>
      </FeedPageContainer>
    </>
  );
};

export default UserFeedPage;
