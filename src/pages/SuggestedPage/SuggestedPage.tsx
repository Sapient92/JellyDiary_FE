import React from "react";
import {
  SuggestedPageContainer,
  SuggestedPageContent,
} from "./SuggestedPage.styles";
import SuggestedNavbar from "./SuggestedNavbar/SuggestedNavbar";
import SuggestedPostsSection from "./SuggestedPostsSection/SuggestedPostsSection";

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
