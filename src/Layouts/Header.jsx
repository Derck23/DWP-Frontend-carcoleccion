import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={{ 
            background: 'linear-gradient(90deg, #1CB5E0 0%, #000851 100%)', 
            padding: '30px' 
        }}>
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: '20px' 
            }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Inicio</Link>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Home</Link> 
                <Link to="/contacto" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Contacto</Link> 
                <Link to="/perfil" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Perfil</Link>
            </nav>
        </header>
    );
};

export default Header;
