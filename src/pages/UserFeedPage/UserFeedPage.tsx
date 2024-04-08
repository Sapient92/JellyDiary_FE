import { FC, useState } from "react";
import { FeedPageContainer, FeedPageContent } from "./UserFeedPage.styles.ts";
import FeedIntroduction from "./FeedIntroduction/FeedIntroduction.tsx";
import FeedNavbar from "./FeedNavbar/FeedNavbar.tsx";
import FeedPostsSection from "./FeedPostsSection/FeedPostsSection.tsx";
import FollowModal from "../../components/Modal/FollowModal/FollowModal.tsx";

const UserFeedPage: FC = () => {
  const [toggleFollowerModal, setToggleFollowerModal] = useState(false);
  return (
    <FeedPageContainer toggleFollowerModal={toggleFollowerModal}>
      {toggleFollowerModal && <FollowModal />}
      <FeedPageContent>
        <FeedIntroduction setToggleFollowerModal={setToggleFollowerModal} />
        <FeedNavbar />
        <FeedPostsSection />
      </FeedPageContent>
    </FeedPageContainer>
  );
};

export default UserFeedPage;
