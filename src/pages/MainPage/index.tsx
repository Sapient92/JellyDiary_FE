import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    if (!user) {
      navigate('/sns');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return <div>메인 페이지 로딩 중...</div>;
};

export default MainPage;
