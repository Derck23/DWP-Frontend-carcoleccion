import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { getUserData, updateUserProfile } from '../../services/authService';
import userImage from '../../assets/user.png';

const Perfilform = () => {
    const [userData, setUserData] = useState(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('Sesión expirada, por favor ingrese nuevamente');
                window.location.href = '/login';
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const data = await getUserData(userId);
            setUserData(data);
            form.setFieldsValue({
                email: data.email,
                fullName: data.nombre,
                username: data.username
            });
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            message.error(error.message || 'Error al cargar los datos del perfil');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onFinish = async (values) => {
        setUpdating(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                message.error('Sesión expirada, por favor ingrese nuevamente');
                window.location.href = '/login';
                return;
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            
            await updateUserProfile(userId, {
                email: values.email,
                fullName: values.fullName,
                username: values.username
            });
            
            setUserData(prev => ({
                ...prev,
                email: values.email,
                nombre: values.fullName,
                username: values.username
            }));
            
            message.success('Perfil actualizado con éxito');
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            message.error(error.message || 'Error al actualizar el perfil');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!userData) {
        return <p>No se pudieron cargar los datos del usuario</p>;
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
                form={form}
                name="perfil"
                initialValues={{
                    email: userData.email,
                    fullName: userData.nombre,
                    username: userData.username,
                }}
                onFinish={onFinish}
                onFinishFailed={(errorInfo) => {
                    console.log('Error al actualizar:', errorInfo);
                    message.error('Por favor, complete el formulario correctamente');
                }}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Por favor, ingrese su correo electrónico!' },
                        { type: 'email', message: 'Ingrese un correo electrónico válido' }
                    ]}
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
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="form-button"
                        loading={updating}
                        disabled={updating}
                    >
                        {updating ? 'Actualizando...' : 'Guardar Modificaciones'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Perfilform;
