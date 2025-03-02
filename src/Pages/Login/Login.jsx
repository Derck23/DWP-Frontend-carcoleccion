import React from 'react';
import Header from '../../Layouts/Header';
import BackgroundImage from '../../Components/BackgroundImagen';
import LoginForm from './LoginForm';

const Login = () => {
    return (
        <div>
            <Header />
            <BackgroundImage />
            <LoginForm />
        </div>
    );
};

export default Login;