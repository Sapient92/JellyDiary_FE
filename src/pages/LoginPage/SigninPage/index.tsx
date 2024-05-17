import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser';
import api from '../../../api';

const SignInPage = () => {
  const navigate = useNavigate();
  //   const {user} = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/api/users/profile');
      console.log(response.data);
      return response.data;
    };
    console.log('test');
    fetchData();
  });
  setTimeout(() => {
    navigate('/');
  }, 30000);

  return <div>...</div>;
};
export default SignInPage;
