import styled from "styled-components";

interface FeedPageContainer {
  toggleFollowerModal: boolean;
  toggleFollowModal: boolean;
}

export const FeedPageContainer = styled.div<FeedPageContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) =>
    (props.toggleFollowerModal || props.toggleFollowModal) && "60%"};
`;

export const FeedPageContent = styled.div`
  width: 935px;
  background-color: white;
  margin-top: 10px;
`;
