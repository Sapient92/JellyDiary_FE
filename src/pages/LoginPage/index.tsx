import {
  LogoContainer,
  LoginPageContainer,
  LoginPageContent,
  LoginButton,
  ContractContent,
} from './LoginPage.styles';

import logo from '../../assets/images/logo.png';
import login_K from '../../assets/button/Login_K.png';
import login_N from '../../assets/button/Login_N.png';
import login_G from '../../assets/button/Login_G.png';
import login_Line from '../../assets/button/Login_Line.png';

const BaseURL = 'https://api.jellydiary.life';

const LoginPage = () => {
  // const navigate = useNavigate();

  const handleLogin = (prop: string) => {
    const newLink = `${BaseURL}/oauth2/authorization/${prop}`;
    console.log('Redirecting to:', newLink);
    window.location.href = newLink;
  };

  return (
    <LoginPageContainer>
      <LoginPageContent>
        <LogoContainer>
          <img src={logo} />
        </LogoContainer>
        <LoginButton onClick={() => handleLogin('kakao')}>
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
      <ContractContent>
        <div>Copyrightⓒ JellD Corp. All rights reserved.</div>
      </ContractContent>
    </LoginPageContainer>
  );
};

export default LoginPage;
