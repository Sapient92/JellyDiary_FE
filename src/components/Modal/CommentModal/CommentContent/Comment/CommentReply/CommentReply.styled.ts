import styled from "styled-components";

export const CommentReplyContainer = styled.div`
  margin: 0 0 0 60px;
  p {
    margin: 0;
  }
`;

export const CommentReplyContent = styled.div`
  display: flex;
  margin-bottom: 4px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const CommentReplyDesc = styled.div`
  margin-left: 6px;

  font-size: 12px;
  font-weight: 400;
`;

export const CommentReplyWriterContainer = styled.div`
  display: flex;
  align-items: center;

  p:nth-child(1) {
    font-size: 14px;
    font-weight: 600;
  }

  p:nth-child(2) {
    font-size: 10px;
    font-weight: 600;
    margin-left: 6px;
  }
`;

export const CommentFormContainer = styled.form`
  input {
    width: 230px;
    height: 20px;
    border: none;
    border-bottom: 1px solid gray;

    &:focus {
      outline: none;
    }
  }
  button {
    border: none;
    background: none;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
  }
`;
