import React from "react";
import NotFound from "../../assets/images/NotFound.png";
import {
  NotFoundPageContainer,
  NotFoundPageContent,
} from "./NotFoundPage.styles";

const NotFoundPage = () => {
  // 404 페이지는 어떻게 라우팅 처리하지?
  return (
    <NotFoundPageContainer>
      <NotFoundPageContent>
        <img src={NotFound} />
      </NotFoundPageContent>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
