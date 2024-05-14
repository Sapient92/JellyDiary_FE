import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  margin-left: 10px;
  margin-right: 10px;
  border: 2px solid #f6f7f8;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 6px;
`;

export const ChatImgContainer = styled.div`
  width: 40px;
  height: 40px;

  img {
    width: 40px;
    height: 40px;
    margin-left: 4px;
  }
`;

export const ChatInfoContainer = styled.div`
  margin: 0 8px 0 8px;
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
