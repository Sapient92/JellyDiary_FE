import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";

export const CommentReplyContainer = styled.div`
  margin: 0 0 0 60px;
  p {
    margin: 0;
  }
`;

export const DeleteCommentButton = styled(RiDeleteBinLine)`
  box-sizing: border-box;
  margin-left: 16px;
  cursor: pointer;
  visibility: hidden;
`;

export const CommentReplyContent = styled.div`
  display: flex;
  margin-bottom: 4px;

  img {
    width: 30px;
    height: 30px;
  }
  &:hover ${DeleteCommentButton} {
    visibility: visible;
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
  display: flex;

  button {
    border: none;
    background: none;
    font-size: 14px;
    cursor: pointer;
    font-weight: 600;
  }
`;
