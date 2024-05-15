import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-top: 16px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  padding: 10px;
  border: 2px solid #f6f7f8;

  &:hover {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const ChatImgContainer = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 6px;

  img {
    width: 40px;
    height: 40px;
    margin-left: 4px;
    border-radius: 50%;
  }
`;

export const ChatInfoContainer = styled.div`
  margin: 0 8px 0 20px;
  p:nth-child(1) {
    margin: 0;
    font-weight: 600;
  }
  p:nth-child(2) {
    margin: 0;
    font-size: 12px;
    color: darkgray;
    font-weight: bolder;
  }
`;
