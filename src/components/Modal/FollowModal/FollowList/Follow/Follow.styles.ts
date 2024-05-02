import styled from "styled-components";

export const FollowContainer = styled.div`
  padding: 8px 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const UserContent = styled.div`
  display: flex;
`;

export const UserProfileImg = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;

  img {
    width: 45px;
    height: 45px;
  }
`;

export const UserProfileDesc = styled.div`
  width: 198px;
  p {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }
`;

export const FollowButton = styled.button`
  color: #0095f6;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
`;
