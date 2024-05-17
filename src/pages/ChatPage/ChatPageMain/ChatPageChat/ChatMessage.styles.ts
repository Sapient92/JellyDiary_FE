import styled from "styled-components";

export const SenderMessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 8px;
`;

export const SenderMessageContent = styled.div`
  display: flex;
  max-width: 250px;

  p {
    margin: 0;
    background-color: white;
    padding: 8px 6px;
    border-radius: 8px;
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
  margin-top: 8px;
`;

export const ReceiverMessageContent = styled.div`
  max-width: 250px;

  p:nth-child(1) {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }

  p:nth-child(2) {
    margin: 0;
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
