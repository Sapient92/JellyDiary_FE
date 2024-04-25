import React from 'react';
import NotFound from '../../assets/images/NotFound.png';
import { NotFoundPageContainer, NotFoundPageContent } from './NotFoundPage.styles';

const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <NotFoundPageContent>
        <img src={NotFound} />
      </NotFoundPageContent>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
