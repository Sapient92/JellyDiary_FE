import styled from "styled-components";
import { IoMdCheckmark } from "react-icons/io";

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 32px;

  button {
    position: relative;
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

export const CheckedButton = styled(IoMdCheckmark)`
  position: absolute;
  left: 6px;
  bottom: 4px;
  color: green;
  width: 20px;
  height: 20px;
`;
