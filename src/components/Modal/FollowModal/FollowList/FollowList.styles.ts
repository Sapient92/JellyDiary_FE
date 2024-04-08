import styled from "styled-components";

export const FollowListContainer = styled.div`
  max-height: 220px;
  overflow-y: auto;
  margin: 0 16px;
  padding-top: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
