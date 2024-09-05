import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  return token ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
