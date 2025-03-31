import React from 'react';
import './Bienvenida.css';

const Buttons = () => {
    return (
        <div className="container">
            <button className="button" onClick={() => window.location.href = '/login'}> 
                INICIO DE SESION
            </button>
            <button className="button" onClick={() => window.location.href = '/registro'}>
                REGISTRO
            </button>
        </div>
    );
};

export default Buttons;