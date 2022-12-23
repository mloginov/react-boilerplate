import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from './auth/auth-context';

const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}) => {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute
