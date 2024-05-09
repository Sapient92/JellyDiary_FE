import styled from "styled-components";

export const CommentDeleteModalContainer = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  padding: 20px;
  p {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }
  background-color: white;
  position: absolute;
  top: 40%;
  right: 28%;
`;

export const ConfirmButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  button:nth-child(1) {
    font-size: 16px;
    cursor: pointer;
    margin-right: 5px;
    padding: 3px 10px 3px 10px;
    border: none;
    border-radius: 4px;
    background-color: #c23939;
    color: white;

    &:hover {
      background-color: red;
    }
  }

  button:nth-child(2) {
    font-size: 16px;
    cursor: pointer;
    margin-left: 5px;
    border: none;
    border-radius: 4px;
    padding: 3px 10px 3px 10px;
    background-color: gray;
    &:hover {
      background-color: darkgray;
    }
  }
`;
