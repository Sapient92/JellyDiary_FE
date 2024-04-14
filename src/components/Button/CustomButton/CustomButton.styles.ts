import styled from "styled-components";

export const StyledButton = styled.button<{ backgroundColor: string }>`
  background-color: ${(props) =>
    props.backgroundColor === "red" ? "#FA6650" : "#3361FF"};
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
  &:disabled {
    background-color: #ccc6c6;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
