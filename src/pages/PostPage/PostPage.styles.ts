import styled, { css } from "styled-components";

export const PostPageContainer = styled.div<{ $confirmDeleteModal: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  ${(props) =>
    props.$confirmDeleteModal &&
    css`
      opacity: 80%;
    `}
`;

export const PostPageContent = styled.div`
  width: 612px;
  border: 1px solid #dbdbdb;
  background-color: #f7f8fa;
  margin-top: 10px;
  margin-bottom: 10px;
`;
