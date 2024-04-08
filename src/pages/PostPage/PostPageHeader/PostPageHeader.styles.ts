import styled from "styled-components";

export const PostPageHeaderContainer = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    width: 42px;
    height: 42px;
  }

  p {
    margin-left: 14px;
    font-weight: 600;
    font-size: 18px;
  }
`;

export const PostMenuButton = styled.button`
  color: black;
  margin-right: 20px;
  background: none;
  border: none;
  img {
    width: 15px;
    height: 15px;
  }
`;
