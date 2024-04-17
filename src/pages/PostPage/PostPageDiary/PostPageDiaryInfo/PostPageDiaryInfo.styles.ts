import styled from "styled-components";

export const PostPageDiaryInfoContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid #f5f6f7;

  p:nth-child(1) {
    margin: 0 20px 0 10px;
    width: 50px;
    color: #7d8fb3;
    font-size: 14px;
    font-weight: bold;
    white-space: pre-wrap;
  }

  p:nth-child(2) {
    color: #254630;
    font-size: 14px;
    font-weight: bold;
    margin-left: 30px;
  }
`;
