import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const expiry = localStorage.getItem('adminTokenExpiry');

  // If token is missing or expired, clear storage and redirect to login
  if (!token || !expiry || new Date().getTime() > Number(expiry)) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiry');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;