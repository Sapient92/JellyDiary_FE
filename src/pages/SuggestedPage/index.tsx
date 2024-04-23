import React from "react";
import {
  SuggestedPageContainer,
  SuggestedPageContent,
} from "./SuggestedPage.styles";
import SuggestedNavbar from "./SuggestedNavbar";
import SuggestedPostsSection from "./SuggestedPostsSection";

const SuggestedPage = () => {
  return (
    <SuggestedPageContainer>
      <SuggestedPageContent>
        <SuggestedNavbar />
        <SuggestedPostsSection />
      </SuggestedPageContent>
    </SuggestedPageContainer>
  );
};

export default SuggestedPage;
