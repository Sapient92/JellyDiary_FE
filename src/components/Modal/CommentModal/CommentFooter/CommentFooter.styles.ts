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
    border-radius: 50%;
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
