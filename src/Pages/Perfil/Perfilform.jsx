import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { getUserData } from '../../services/authService';
import userImage from '../../assets/user.png';

const Perfilform = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                // Decodificar el token para obtener el ID del usuario
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;

                // Obtener los datos del usuario desde el backend
                const data = await getUserData(userId);
                setUserData(data);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <div className="form-container register-form">
            <img 
                src={userImage} 
                alt="User" 
                style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    marginBottom: '20px',
                    border: '3px solid #007BFF',
                    objectFit: 'cover' 
                }} 
            />
            <h2 className="form-header register-header">Perfil</h2>
            <Form
                name="perfil"
                initialValues={{
                    email: userData.email,
                    fullName: userData.nombre,
                    username: userData.username,
                }}
                onFinish={(values) => console.log('Datos actualizados:', values)}
                onFinishFailed={(errorInfo) => console.log('Error al actualizar:', errorInfo)}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Por favor, ingrese su correo electrónico!' }]}
                >
                    <Input placeholder="Correo Electrónico" />
                </Form.Item>
                
                <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: 'Por favor, ingrese su nombre completo!' }]}
                >
                    <Input placeholder="Nombre Completo" />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor, ingrese su usuario!' }]}
                >
                    <Input placeholder="Usuario" />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="form-button">
                        Guardar Modificaciones
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Perfilform;
