// src/Pages/Bienvenida/Components/Buttons.jsx
import React from 'react';

const Buttons = () => {
    return (
        <div style={{ 
            position: 'absolute', 
            top: '60%', 
            left: '48%', 
            transform: 'translate(-50%, -50%)', 
            textAlign: 'center' 
        }}>
            <button style={{ 
                margin: '10px', 
                padding: '15px 30px', 
                cursor: 'pointer', 
                fontSize: '1.2rem', 
                letterSpacing: '0.5rem', 
                backgroundColor: '#007BFF', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px'
            }} onClick={() => window.location.href = '/login'}> 
                INICIO DE SESION
            </button>
            <button style={{ 
                margin: '10px', 
                padding: '15px 30px', 
                cursor: 'pointer', 
                fontSize: '1.2rem', 
                letterSpacing: '0.5rem', 
                backgroundColor: '#007BFF', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px'
            }} onClick={() => window.location.href = '/registro'}>
                REGISTRO
            </button>
        </div>
    );
};

export default Buttons;
