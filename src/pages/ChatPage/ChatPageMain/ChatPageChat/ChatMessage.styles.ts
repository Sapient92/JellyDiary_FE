import styled from "styled-components";

export const SenderMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 8px;
  p {
    background: none;
    font-weight: bolder;
    font-size: 10px;
    margin-right: 6px;
    color: #7d8fb3;
  }
`;

export const SenderMessageContent = styled.div`
  display: flex;
  max-width: 250px;

  p {
    margin: 0;
    background-color: white;
    padding: 8px 6px;
    font-size: 16px;
    border-radius: 8px;
    font-weight: normal;
    color: black;
  }

  img {
    width: 40px;
    height: 40px;
    margin: 0 10px 0 10px;
    border-radius: 50%;
  }
`;

export const ReceiverMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  p {
    background: none;
    font-weight: bolder;
    font-size: 10px;
    margin-left: 6px;
    color: #7d8fb3;
  }
`;

export const ReceiverMessageContent = styled.div`
  max-width: 250px;

  p:nth-child(1) {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
    color: black;
  }

  p:nth-child(2) {
    margin: 0;
    color: black;
    font-size: 16px;
    font-weight: normal;
    background-color: white;
    border-radius: 8px;
    padding: 8px 6px;
  }
`;

export const ReceiverImgContainer = styled.div`
  img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 50%;
  }
`;
