import styled from "styled-components";

export const FollowModalContainer = styled.div`
  position: fixed;
  z-index: 10;
  top: 35%;
  left: 40%;
  width: 344px;
  height: 329px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow:
    1px 5px 5px rgba(0, 0, 0, 0.25),
    -1px 5px 5px rgba(0, 0, 0, 0.25);
`;

export const FollowModalContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  margin-left: 24px;
  p {
    color: #262626;
    font-size: 18px;
    font-weight: 600;
  }
`;
