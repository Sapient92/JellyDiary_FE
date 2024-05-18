import React from 'react';
import HeaderRightButton from './headerRightButton';

import {
  AccountButton,
  HeaderContainer,
  LogoContainer,
  RightButtonContainer,
} from './Header.styles.ts';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser.ts';

import logo from '../../../assets/images/logo.png';

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
  const { user } = useUser();
  return (
    <HeaderContainer>
      <LogoContainer to={'/'}>
        <img src={logo} />
      </LogoContainer>
      <RightButtonContainer>
        <HeaderRightButton title={'큰 SNS'} name={'bigSns'} />
        <HeaderRightButton title={'작은 SNS'} name={'smallSns'} />
        <HeaderRightButton title={'내 피드'} name={'myFeed'} userId={user?.userId} />
        <HeaderRightButton title={'DM'} name={'dm'} />
        {!user && <div onClick={() => navigate('/login')}>로그인</div>}
        {/* <div onClick={() => navigate('/login')}>로그인</div> */}
        {user && <AccountButton onClick={handleMypage} />}
        {/* {user && <div>로그아웃</div>} */}
      </RightButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
