import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const LogoContainer = styled(Link)`
  padding-left: 104px;
  display: flex;
  align-items: center;
  text-decoration: none;

  button {
    width: 100px;
    height: 40px;
    font-size: 20px;
  }
  img {
    height: 2.5rem;
  }
`;
export const RightButtonContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 104px;
`;

export const AccountButton = styled.div`
  width: 34px;
  height: 34px;
  background-color: gray; /* Set background color for the circular container */
  border-radius: 50%; /* Make the container circular */
  display: flex;

  img {
    width: 100%; /* Adjust the image size as needed */
    border-radius: 50%; /* Make the image circular */
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Noti = styled.div`
  color: #717d96;
  font-size: x-large;
  display: flex;
  padding-right: 30px;
`;

export const LogoutContent = styled.div`
  color: #717d96;
  padding-left: 20px;

  display: flex;
  font-size: small;
  font-weight: 400;
  vertical-align: middle;
`;
