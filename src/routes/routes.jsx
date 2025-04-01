import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import Login from '../Pages/Login/Login';
import Registro from '../Pages/Registro/Registro';
import Bienvenida from '../Pages/Bienvenida/Bienvenida';
import ProtectedRoute from '../Components/ProtectedRoute';
import Dashboard from '../Pages/Dashboard/dashboard';
import DashboardAdmin from '../Pages/Dashboard/dashboardAdmin';
import NuevaSubasta from '../Pages/EscalasAdministrador/nuevaSubasta';
import Escala118 from '../Pages/Escalas/Escala118';
import Escala124 from '../Pages/Escalas/Escala124';
import Escala143 from '../Pages/Escalas/Escala143';
import Escala164 from '../Pages/Escalas/Escala164';
import Contacto from '../Pages/Contacto/Contacto';
import Perfil from '../Pages/Perfil/Perfil';
import Error404 from '../Pages/error/Error404';
import PasswordRecoveryFlow from '../Pages/ResetPassword/PasswordRecoveryFlow';
import Escala118A from '../Pages/EscalasAdministrador/Escala118A';
import Escala124A from '../Pages/EscalasAdministrador/Escala124A';
import Escala143A from '../Pages/EscalasAdministrador/Escala143A';
import Escala164A from '../Pages/EscalasAdministrador/Escala164A';

const AppRoutes = () => {
    const basename = window.location.pathname.startsWith('/build') ? '/build' : '';
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Bienvenida />} />
                <Route path="/404" element={<Error404 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
                <Route path="/dashboardAdmin" element={<ProtectedRoute> <DashboardAdmin /></ProtectedRoute>} />
                <Route path="/escala-1-18A" element={<ProtectedRoute><Escala118A /></ProtectedRoute> } />
                <Route path="/escala-1-24A" element={<ProtectedRoute><Escala124A /></ProtectedRoute>} />
                <Route path="/escala-1-43A" element={<ProtectedRoute><Escala143A /></ProtectedRoute>} />
                <Route path="/escala-1-64A" element={<ProtectedRoute><Escala164A /></ProtectedRoute>} />
                <Route path="/nueva-subasta" element={<ProtectedRoute><NuevaSubasta  /></ProtectedRoute>} />
                <Route path="/escala-1-18" element={<ProtectedRoute><Escala118 /></ProtectedRoute> } />
                <Route path="/escala-1-24" element={<ProtectedRoute><Escala124 /></ProtectedRoute>} />
                <Route path="/escala-1-43" element={<ProtectedRoute><Escala143 /></ProtectedRoute>} />
                <Route path="/escala-1-64" element={<ProtectedRoute><Escala164 /></ProtectedRoute>} />
                <Route path="/contacto" element={<ProtectedRoute><Contacto /></ProtectedRoute>} />
                <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                <Route path="/forgot-password" element={<PasswordRecoveryFlow />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
