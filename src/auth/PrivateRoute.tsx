import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const PrivateRoute = ({ children }: any) => {
  const { user, isLoading, isError }: any = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
