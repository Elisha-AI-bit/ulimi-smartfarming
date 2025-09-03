import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useRBAC, roles } from '../context/RBACContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn } = useAuth();
  const { userRole } = useRBAC();

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and user doesn't have it, redirect to their dashboard
  if (requiredRole && userRole !== requiredRole) {
    // Redirect to the appropriate dashboard based on user role
    switch (userRole) {
      case roles.ADMIN:
        return <Navigate to="/admin" replace />;
      case roles.FARMER:
        return <Navigate to="/farmer" replace />;
      case roles.BUYER:
        return <Navigate to="/buyer" replace />;
      case roles.VENDOR:
        return <Navigate to="/vendor" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  // If user is logged in and has the required role (or no specific role is required), render children
  return children;
};

export default ProtectedRoute;