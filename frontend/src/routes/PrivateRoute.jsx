import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function PrivateRoute({ requiredRole }) {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) return <div>Carregando...</div>;

  if (!signed) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />; // Redirect if not authorized
  }

  return <Outlet />;
}
