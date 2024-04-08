import styled from "styled-components";

export const WritePageItemContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;
  padding: 12px 30px;
  border-top: 2px solid #f5f6f7;

  input:last-child {
    padding-left: 6px;
    width: 600px;
    height: 35px;
    border: 1px solid #cad1dc;
    border-radius: 1px;
    font-size: 16px;
  }
`;

export const WritePageItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-between;

  input:first-child {
    width: 17px;
    height: 17px;
  }
`;

export const WritePageTitle = styled.div`
  width: 56px;
  display: flex;
  justify-content: center;

  p {
    white-space: pre-wrap;
    font-size: 14px;
    font-weight: bold;
    color: #7d8fb3;
  }
`;
