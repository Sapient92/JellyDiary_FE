import styled from "styled-components";
import { IoChatbubblesOutline, IoPaw, IoPawOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";

export const PostPageDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostDetailImgContainer = styled.div`
  background-color: white;
  img {
    width: 612px;
    height: 612px;
  }
`;

export const PostDetailBtnContainer = styled.div`
  height: 54px;
  padding-left: 16px;
  background-color: white;
  display: flex;
  align-items: center;

  button {
    width: 40px;
    height: 40px;
    background: none;
    border: none;
  }
`;

export const PostDetailDesc = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-bottom: 16px;

  margin-bottom: 10px;

  p {
    margin: 0;
  }

  p:nth-child(1) {
    font-size: 14px;
    font-weight: 600;
  }

  button {
    margin: 4px 0;
    padding: 0;
    background: none;
    border: none;
    color: #8e8e8e;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  p:nth-child(4) {
    color: #8e8e8e;
    font-size: 12px;
  }
`;

export const PostDetailDescContainer = styled.div<{ $seeMore: boolean }>`
  display: flex;
  flex-direction: ${(props) => (!props.$seeMore ? "row" : "column")};
  margin-top: 4px;

  p:nth-child(1) {
    font-weight: 600;
    margin-right: 6px;
  }

  p:nth-child(2) {
    font-size: 14px;
    margin: 0 6px 0 0;

    span {
      color: #8e8e8e;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

export const NotLikeButton = styled(IoPawOutline)`
  font-size: 30px;
  cursor: pointer;
`;

export const LikeButton = styled(IoPaw)`
  font-size: 30px;
  color: hotpink;
  cursor: pointer;
`;

export const CommentButton = styled(IoChatbubblesOutline)`
  font-size: 26px;
  cursor: pointer;
`;

export const SendButton = styled(BsSend)`
  font-size: 26px;
  cursor: pointer;
`;
