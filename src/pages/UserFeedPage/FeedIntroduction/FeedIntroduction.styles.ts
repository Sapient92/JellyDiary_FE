import styled from "styled-components";

export const FeedIntroductionContainer = styled.div`
  height: 440px;
`;

export const FeedIntroductionContent = styled.div`
  display: flex;
  padding-top: 73px;
  padding-bottom: 44px;
`;

export const FeedIntroductionImg = styled.div`
  padding-left: 71px;
  padding-right: 101px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

export const UserStateContainer = styled.div`
  width: 100%;
  padding: 14px 0;
`;

export const UserNicknameContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    color: #262626;
    font-size: 28px;
    font-weight: 200;
    margin: 0;
  }
`;

export const UserDetailStateContainer = styled.div`
  display: flex;

  p:nth-child(1) {
    color: #262626;
    font-size: 16px;
    margin-right: 40px;
    cursor: default;
  }

  p:nth-child(2) {
    color: #262626;
    font-size: 16px;
    margin-right: 40px;
    cursor: pointer;
  }

  p:nth-child(3) {
    color: #262626;
    font-size: 16px;
    margin-right: 40px;
    cursor: pointer;
  }
`;

export const UserDescContainer = styled.div`
  p {
    color: #262626;
    font-weight: 600;
    font-size: 16px;
    margin-top: 0;
    margin-bottom: 0;
  }
`;
