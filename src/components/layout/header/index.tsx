import React from 'react';
import HeaderRightButton from './headerRightButton';

import {
  AccountButton,
  HeaderContainer,
  LogoContainer,
  RightButtonContainer,
} from './Header.styles.ts';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  // const handleLogout = () => {
  //   const fetchAPI = async () => {
  //     const response = await api.post('/api/logout');
  //     console.log(response);
  //   };
  //   fetchAPI();
  //   return;
  // };
  const handleMypage = () => {
    navigate('/setting');
  };
  return (
    <HeaderContainer>
      <LogoContainer to={'/'}>
        <button>로고</button>
      </LogoContainer>
      <RightButtonContainer>
        <HeaderRightButton title={'큰 SNS'} name={'bigSns'} />
        <HeaderRightButton title={'작은 SNS'} name={'smallSns'} />
        <HeaderRightButton title={'내 피드'} name={'myFeed'} />
        <HeaderRightButton title={'DM'} name={'dm'} />
        <AccountButton onClick={handleMypage} />
      </RightButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
