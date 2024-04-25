import styled from "styled-components";

export const StyledButton = styled.button<{ backgroundColor: string }>`
  background-color: ${(props) => {
    if (props.backgroundColor === "red") {
      return "#FA6650";
    } else if (props.backgroundColor === "gray") {
      return "#DBDBDB";
    } else {
      return "#3361FF";
    }
  }};
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
