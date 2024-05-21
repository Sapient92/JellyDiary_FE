import HeaderRightButton from './headerRightButton';

import {
  AccountButton,
  HeaderContainer,
  LogoContainer,
  RightButtonContainer,
  Noti,
  LogoutContent,
} from './Header.styles.ts';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser.ts';
import fakeImg from '../../../assets/images/UserAvatar.png';
import logo from '../../../assets/images/logo.png';
import api from '../../../api/index.ts';
import { LuLogOut } from 'react-icons/lu';
import Notification from './Notifications/index.tsx';

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const fetchAPI = async () => {
      try {
        // Clear authentication-related cookies
        document.cookie = 'Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';

        // Clear JWT token stored in local storage
        localStorage.removeItem('Authorization');

        const response = await api.post('/api/logout');
        if (response.status === 200) {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error occurred during logout:', error);
      }
    };

    fetchAPI();
  };
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
        {user && <HeaderRightButton title={'SNS'} name={'bigSns'} />}
        {user && <HeaderRightButton title={'DIARY'} name={'smallSns'} />}
        {user && <HeaderRightButton title={'MY FEED'} name={'myFeed'} userId={user.userId + ''} />}
        {user && <HeaderRightButton title={'DM'} name={'dm'} />}
        {user && (
          <Noti>
            <Notification />
          </Noti>
        )}
        {!user && <div onClick={() => navigate('/login')}>로그인</div>}
        {user && (
          <AccountButton onClick={handleMypage}>
            <img src={user.profileImg || fakeImg} />
          </AccountButton>
        )}
        {user && (
          <LogoutContent onClick={handleLogout}>
            ㅤ
            <LuLogOut />
            로그아웃
          </LogoutContent>
        )}
      </RightButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
