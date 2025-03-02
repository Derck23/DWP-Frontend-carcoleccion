import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Registro from './Pages/Registro/Registro';
import Bienvenida from './Pages/Bienvenida/Bienvenida';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Bienvenida />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                
            </Routes>
        </Router>
    );
}

export default App;
