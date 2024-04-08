import { FC, useState } from "react";
import { FeedPageContainer, FeedPageContent } from "./UserFeedPage.styles.ts";
import FeedIntroduction from "./FeedIntroduction/FeedIntroduction.tsx";
import FeedNavbar from "./FeedNavbar/FeedNavbar.tsx";
import FeedPostsSection from "./FeedPostsSection/FeedPostsSection.tsx";
import FollowModal from "../../components/Modal/FollowModal/FollowModal.tsx";

const UserFeedPage: FC = () => {
  const [toggleFollowerModal, setToggleFollowerModal] = useState(false);
  const [toggleFollowModal, setToggleFollowModal] = useState(false);
  return (
    <>
      {toggleFollowerModal && <FollowModal title={"팔로워"} />}
      {toggleFollowModal && <FollowModal title={"팔로우"} />}
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
          <FeedPostsSection />
        </FeedPageContent>
      </FeedPageContainer>
    </>
  );
};

export default UserFeedPage;
