import styled from "styled-components";

export const CommentModalContainer = styled.div`
  margin-top: 10px;
  width: 400px;
  height: 826px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DivContainer = styled.div``;

export const CommentHeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;

  span {
    color: #e1d8d8;
    font-size: 30px;
    font-weight: bolder;
    margin-left: 10px;

    &:hover {
      cursor: pointer;
      color: lightslategray;
    }
  }
`;

export const CommentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-weight: bold;
    font-size: 20px;
    margin-right: 38px;
  }
`;
