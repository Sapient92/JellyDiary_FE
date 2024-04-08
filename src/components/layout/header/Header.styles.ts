import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: space-between;
  background: white;

  p {
    color: #717d96;
    font-size: 16px;
    font-weight: bold;
  }
`;

export const LogoContainer = styled.div`
  padding-left: 104px;
  display: flex;
  align-items: center;

  button {
    width: 100px;
    height: 40px;
    font-size: 20px;
  }
`;
export const RightButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 104px;
`;

export const AccountButton = styled(MdAccountCircle)`
  width: 52px;
  height: 52px;
  color: gray;

  &:hover {
    cursor: pointer;
  }
`;
