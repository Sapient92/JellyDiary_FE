import styled, { css } from "styled-components";

export const ChatUserListContainer = styled.div<{ $isChatting: boolean }>`
  ${(props) =>
    !props.$isChatting
      ? css`
          width: 100%;
        `
      : css`
          width: 329px;
        `}
`;
