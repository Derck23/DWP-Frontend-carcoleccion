import React from 'react';
import VWImage from '../assets/VW.jpg';

const BackgroundImage = ({ children }) => {
    return (
        <div style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${VWImage})`, 
            backgroundSize: 'cover', 
            height: '100vh', 
            position: 'relative' 
        }}>
            {children}
        </div>
    );
};

export default BackgroundImage;