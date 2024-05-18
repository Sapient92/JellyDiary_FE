import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser';
import api from '../../../api';

const SignInPage = () => {
  const navigate = useNavigate();
  //   const {user} = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.post('/api/signin');

      localStorage.setItem('Authorization', response.data.data.authorization);
      return response.data;
    };
    fetchData();
  });
  setTimeout(() => {
    navigate('/');
  }, 3000);

  return <div>...</div>;
};
export default SignInPage;
