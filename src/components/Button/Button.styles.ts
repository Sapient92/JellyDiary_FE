import styled, { css } from "styled-components";

export const ButtonTag = styled.button`
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  ${(props) =>
    props.className === "follow" &&
    css`
      background-color: #0095f6;
      margin-left: 20px;
    `}

  ${(props) =>
    props.className === "send_message" &&
    css`
      background-color: #717d96;
      margin-left: 5px;
    `}
  
  ${(props) =>
    props.className === "post" &&
    css`
      background-color: #3ea9e5;
      padding: 10px 28px;
    `}
`;
