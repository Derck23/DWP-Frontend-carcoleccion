import React from 'react';
import Header from '../../Layouts/Header';
import BackgroundImage from '../../Components/BackgroundImagen';
import MainText from '../../Components/MainText';
import Buttons from './Buttons';

const Bienvenida = () => {
    return (
        <div>
            <Header />
            <BackgroundImage />
            <MainText />
            <Buttons />
        </div>
    );
};

export default Bienvenida;