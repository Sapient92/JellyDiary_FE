import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";

export const DeleteCommentButton = styled(RiDeleteBinLine)`
  box-sizing: border-box;
  margin-right: 8px;
  cursor: pointer;
  visibility: hidden;
`;

export const CommentContainer = styled.li`
  display: flex;
  align-items: center;

  margin: 6px 8px 12px 8px;
  img {
    margin: 0;
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  &:hover ${DeleteCommentButton} {
    visibility: visible;
  }
`;

export const CommentProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 367px;
`;

export const CommentContentContainer = styled.div`
  margin-left: 8px;
`;

export const CommentInfoContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
  }
  p:nth-child(1) {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
  }
  p:nth-child(2) {
    font-size: 12px;
    font-weight: 800;
    color: #7d8fb3;
    margin-left: 4px;
  }
`;

export const CommentDescription = styled.div`
  p:nth-child(1) {
    width: 260px;
    margin: 0;
    color: #254630;
    font-size: 14px;
    font-weight: 600;
  }
  p:nth-child(2) {
    margin: 0;
    color: #7d8fb3;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
`;
