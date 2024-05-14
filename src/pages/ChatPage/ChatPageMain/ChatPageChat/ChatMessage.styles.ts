import styled from "styled-components";

export const ChatMessageContainer = styled.div<{ $isLoginUser: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 6px;
  margin-top: 6px;
`;

export const ChatMessageImgBox = styled.div<{ $isLoginUser: boolean }>`
  img {
    width: 46px;
    height: 46px;
  }
`;

export const ChatUserInfoContainer = styled.div`
  margin-left: 8px;
  p:nth-child(1) {
    margin: 0;
  }
`;

export const MessageContainer = styled.div`
  background-color: white;
  padding: 4px 8px 4px 8px;
  border-radius: 6px;
`;
