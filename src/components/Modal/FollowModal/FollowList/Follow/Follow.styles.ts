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

  p:nth-child(1) {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
  }
  p:nth-child(2) {
    margin: 0;
    font-size: 14px;
  }
`;

export const FollowButton = styled.button<{ $status: boolean }>`
  color: ${(props) => (!props.$status ? "#0095f6" : "rgb(100,100,100)")};
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
`;
