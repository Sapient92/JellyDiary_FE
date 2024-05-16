import React from 'react';

import { LoginPageContainer, LoginPageContent, LoginButton } from './LoginPage.styles';

import login_K from '../../assets/button/Login_K.png';
import login_N from '../../assets/button/Login_N.png';
import login_G from '../../assets/button/Login_G.png';
import login_F from '../../assets/button/Login_F.png';
import login_Line from '../../assets/button/Login_Line.png';

const BaseURL = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const handleLogin = (prop: string) => {
    const newLink = BaseURL + `/oauth2/authorization/${prop}`;
    window.location.href = newLink;
  };

  return (
    <LoginPageContainer>
      <LoginPageContent>
        <LoginButton>
          <img src={login_K} />
        </LoginButton>
        <img src={login_Line} />
        <LoginButton onClick={() => handleLogin('naver')}>
          <img src={login_N} />
          <span>네이버 로그인 </span>
        </LoginButton>
        <LoginButton onClick={() => handleLogin('google')}>
          <img src={login_G} />
          <span>Google 로그인 </span>
        </LoginButton>
      </LoginPageContent>
    </LoginPageContainer>
  );
};

export default LoginPage;
