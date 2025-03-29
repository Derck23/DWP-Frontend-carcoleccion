import React from 'react';
import Header from '../../Layouts/HeaderAdmin';
import BackgroundImage from '../../Components/BackgroundImagen';
import Menu from '../../Components/MenuAdmin';

function Dashboard() {
    return (
        <div>
            
            <BackgroundImage>
                <Header />
                <Menu />
            </BackgroundImage>
        </div>   
    );
}

export default Dashboard;