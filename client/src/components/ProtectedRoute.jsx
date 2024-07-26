import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
//   const user = true;
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Simple check for demonstration purposes
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
