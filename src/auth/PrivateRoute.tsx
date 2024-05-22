import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: any) => {
  const isLoggedIn = !!localStorage.getItem('Authorization');

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
