import { FC } from "react";
import { FeedPageContainer, FeedPageContent } from "./UserFeedPage.styles.ts";
import FeedIntroduction from "./FeedIntroduction/FeedIntroduction.tsx";
import FeedNavbar from "./FeedNavbar/FeedNavbar.tsx";
import FeedPostsSection from "./FeedPostsSection/FeedPostsSection.tsx";

const UserFeedPage: FC = () => {
  return (
    <FeedPageContainer>
      <FeedPageContent>
        <FeedIntroduction />
        <FeedNavbar />
        <FeedPostsSection />
      </FeedPageContent>
    </FeedPageContainer>
  );
};

export default UserFeedPage;
