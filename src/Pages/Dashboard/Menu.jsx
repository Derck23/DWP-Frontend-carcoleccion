import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
    
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setShowMenu(false); // Cierra el menú después de la navegación
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '20px', position: 'relative' }}>
                <h1 style={{ color: 'white' }}>BIENVENIDO AL MUNDO DEL COLECCIONISMO DE AUTOS A ESCALA</h1>
            </div>
            <div style={{ textAlign: 'left', marginTop: '20px', position: 'relative' }}>
                <h2 style={{ color: 'white' }}>¡Encuentra la escala perfecta para tu colección!</h2>
                <button 
                    onClick={toggleMenu} 
                    style={{ 
                        margin: '10px', 
                        padding: '10px 20px',
                        position: 'relative',
                        left: '0%', // Alinea el botón al centro 
                        cursor: 'pointer', 
                        fontSize: '1rem', 
                        backgroundColor: '#007BFF', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px'
                    }}
                >
                    Escalas
                </button>
                {showMenu && (
                    <ul style={{ 
                        listStyleType: 'none', 
                        padding: 0, 
                        position: 'absolute', 
                        top: '100%', 
                        left: '5%', // Alinea el menú a la izquierda
                        backgroundColor: 'white', 
                        borderRadius: '5px', 
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                        zIndex: 1000,
                        width: '200px' // Ajusta el ancho del menú si es necesario
                    }}>
                        <li style={{ padding: '10px' }}>
                            <button 
                                onClick={() => handleNavigation('/escala-1-18')} 
                                style={{ textDecoration: 'none', color: 'black', display: 'block', width: '100%', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Escala 1:18
                            </button>
                        </li>
                        <li style={{ padding: '10px' }}>
                            <button 
                                onClick={() => handleNavigation('/escala-1-24')} 
                                style={{ textDecoration: 'none', color: 'black', display: 'block', width: '100%', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Escala 1:24
                            </button>
                        </li>
                        <li style={{ padding: '10px' }}>
                            <button 
                                onClick={() => handleNavigation('/escala-1-43')} 
                                style={{ textDecoration: 'none', color: 'black', display: 'block', width: '100%', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Escala 1:43
                            </button>
                        </li>
                        <li style={{ padding: '10px' }}>
                            <button 
                                onClick={() => handleNavigation('/escala-1-64')} 
                                style={{ textDecoration: 'none', color: 'black', display: 'block', width: '100%', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                            >
                                Escala 1:64
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Menu;