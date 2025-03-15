import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import Login from './Pages/Login/Login';
import Registro from './Pages/Registro/Registro';
import Bienvenida from './Pages/Bienvenida/Bienvenida';
import Dashboard from './Pages/Dashboard/dashboard';
import Escala1_18 from './Pages/Escalas/Escala1-18';
import Escala1_24 from './Pages/Escalas/Escala1-24';
import Escala1_43 from './Pages/Escalas/Escala1-43';
import Escala1_64 from './Pages/Escalas/Escala1-64';
import Contacto from './Pages/Contacto/Contacto';
import Perfil from './Pages/Perfil/Perfil';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Bienvenida />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/escala-1-18" element={<Escala1_18 />} />
                <Route path="/escala-1-24" element={<Escala1_24 />} />
                <Route path="/escala-1-43" element={<Escala1_43 />} />
                <Route path="/escala-1-64" element={<Escala1_64 />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </Router>
    );
}

export default App;
