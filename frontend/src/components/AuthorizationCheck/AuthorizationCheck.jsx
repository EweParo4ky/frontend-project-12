import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import routes from '../../routes';

const Authorization = ({ children }) => {
  const data = useAuth();
  console.log('data in Authorization', data);
  return data.userData ? children : <Navigate to={routes.loginPagePath()} />;
};
export default Authorization;
