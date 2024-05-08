import styled, { css } from "styled-components";

export const AlertModalContainer = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;

  ${(props) =>
    props.className === "imageAlert" &&
    css`
      width: 835px;
      background-color: orangered;
      border-radius: 6px;
    `}

  ${(props) =>
    props.className === "duplication" &&
    css`
      width: 835px;
      background-color: darkgray;
      border-radius: 6px;
    `}

  ${(props) =>
    props.className === "titleAlert" &&
    css`
      width: 835px;
      background-color: skyblue;
      border-radius: 6px;
    `}
  
    ${(props) =>
    props.className === "commentAlert" &&
    css`
      background-color: darkgray;
      border-radius: 6px;
      width: 400px;
    `}
  ${(props) =>
    props.className === "replyAlert" &&
    css`
      background-color: darkgray;
      border-radius: 6px;
      width: 300px;
      top: 110px;
    `}
`;

export const AlertModalContent = styled.div`
  p {
    margin: 15px 0;
    color: white;
    font-size: 20px;
    font-weight: 600;
  }
`;
