import styled, { css } from "styled-components";

export const FeedPostContainer = styled.article<{ $isMultiple: boolean }>`
  margin: 9px;
  position: relative;
  ${(props) =>
    props.$isMultiple
      ? css`
          img:nth-child(1) {
            position: absolute;
            right: 6px;
            top: 6px;
          }
          img:nth-child(2) {
            width: 292px;
            height: 292px;
            cursor: pointer;
          }
        `
      : css`
          img {
            width: 292px;
            height: 292px;
            cursor: pointer;
          }
        `}
`;
