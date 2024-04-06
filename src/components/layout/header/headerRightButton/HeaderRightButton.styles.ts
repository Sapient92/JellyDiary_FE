import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  label {
    color: #717d96;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  &:hover {
    cursor: pointer;
  }
`;
