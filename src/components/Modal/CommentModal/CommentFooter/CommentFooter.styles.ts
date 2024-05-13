import styled from "styled-components";

export const CommentFooterContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 20px 10px 20px;

  img {
    width: 40px;
    height: 40px;
  }
  :nth-child(2) {
    border: 2px solid #f6f7f8;
    border-radius: 35px;
    height: 30px;
    width: 250px;
    padding-left: 10px;
    padding-top: 10px;
    font-size: 14px;

    &::placeholder {
      color: #8e8e8e;
    }
  }

  button {
    border: none;
    background: none;
    color: #0095f6;
    font-size: 14px;
    font-weight: 600;
    padding: 0;
    cursor: pointer;
  }
`;
