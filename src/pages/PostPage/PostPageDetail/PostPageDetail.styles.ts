import styled from "styled-components";

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
    cursor: pointer;
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

  p:nth-child(2) {
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
