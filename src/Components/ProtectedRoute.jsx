// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verificar si el token existe en localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirigir al login si no está autenticado
    console.log("No existe token en localStorage");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;