import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 604px;
  height: 720px;
  border: 1px solid #dbdbdb;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatFlexContainer = styled.div`
  width: 100%;
`;

export const ChatHeader = styled.div`
  width: 100%;
  height: 67px;
  background: white;
  border: none;
  display: flex;
  align-items: center;

  p {
    margin: 0 0 0 20px;
    font-size: 22px;
    font-weight: 600;
  }
`;

export const ChatMessagesContainer = styled.div`
  max-height: 595px;
  height: 595px;
  overflow-y: auto;
  padding: 0 0 10px 0;
`;

export const ChatFooter = styled.form`
  padding: 0 26px 10px 26px;
  position: relative;

  input {
    height: 50px;
    width: 100%;
    font-size: 16px;
    border: none;
    box-sizing: border-box;
    border-radius: 60px;
    padding-left: 18px;
    padding-right: 46px;
  }

  button {
    border: none;
    background: none;
    position: absolute;
    top: 16px;
    right: 40px;
    padding: 0;
    cursor: pointer;
  }
`;

export const NextFetchTarget = styled.div`
  width: 100%;
  height: 10px;
`;
