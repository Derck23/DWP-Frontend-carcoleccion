import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        // Verificar si el token existe en localStorage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Si el token existe, isAuthenticated será true
        setIsAuth(!token);
    }, []);

    const handleLogout = () => {
        // Eliminar el token y otros datos relacionados con la sesión
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        //localStorage.removeItem('rol'); // Si estás almacenando el rol

        // Redirigir al login
        navigate('/login');
    };

    return (
        <header style={{ 
            background: 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)', 
            padding: '30px',
            position: 'relative' // Necesario para posicionar el botón absolutamente
        }}>
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '20px',
                position: 'relative' // Contenedor relativo para el botón absoluto
            }}>
                {/* Enlaces centrados */}
                {isAuth && (<Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Inicio</Link>)}
                <Link to="/dashboardAdmin" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Home</Link> 
                <Link to="/contacto" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Contacto</Link> 
                <Link to="/perfil" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Perfil</Link>
    
                {/* Botón en esquina derecha (absoluto) */}
                {isAuthenticated && (
                    <button 
                        onClick={handleLogout} 
                        style={{ 
                            position: 'absolute',
                            right: '0',
                            backgroundColor: 'white', 
                            color: 'black', 
                            padding: '5px 10px', 
                            borderRadius: '5px'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
