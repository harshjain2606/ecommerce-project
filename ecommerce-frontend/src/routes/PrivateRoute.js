import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token || (role && role !== userRole)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;