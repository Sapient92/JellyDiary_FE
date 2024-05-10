import styled from "styled-components";
import { Link } from "react-router-dom";

export const EditModalContainer = styled.div`
  width: 90px;
  height: 65px;
  background-color: white;
  position: absolute;
  border: 1px solid #717d96;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;

  p {
    font-size: 16px;
    color: #717171;
    margin: 0;
    width: 30px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  p:nth-child(1) {
    margin-bottom: 4px;
  }
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  p {
    font-size: 16px;
    color: #717171;
    margin: 0;
    width: 30px;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
