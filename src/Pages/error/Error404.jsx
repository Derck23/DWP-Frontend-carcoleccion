import React from 'react';
import Header from '../../Layouts/Header';

const Error404 = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
                <div className="text-6xl font-bold text-gray-700 mb-4">404</div>
                <div className="text-2xl text-gray-600">Error archivo no encontrado</div>
            </div>
        </div>
    );
};

export default Error404;
