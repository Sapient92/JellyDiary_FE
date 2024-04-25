import React from 'react';

import SuggestedNavbar from './SuggestedNavbar';
import SuggestedPostsSection from './SuggestedPostsSection';

import { SuggestedPageContainer, SuggestedPageContent } from './SuggestedPage.styles.ts';

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
