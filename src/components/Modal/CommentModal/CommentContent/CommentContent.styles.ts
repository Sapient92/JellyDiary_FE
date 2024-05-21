import styled, { css } from "styled-components";

export const CommentContentContainer = styled.ul<{ $comment: boolean }>`
  list-style: none;
  padding: 0;
  max-height: 700px;
  overflow-y: auto;
  ${(props) =>
    !props.$comment &&
    css`
      p:nth-child(1) {
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        margin-top: 50px;
      }
    `}
`;
