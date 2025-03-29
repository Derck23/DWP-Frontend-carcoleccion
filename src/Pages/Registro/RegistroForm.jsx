import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser, setupMFA } from '../../services/authService';
import MFASetupModal from './MFASetupModal';

const RegistroForm = () => {
    const navigate = useNavigate();
    const [mfaSetup, setMfaSetup] = useState(null);

    const onFinish = async (values) => {
        try {
            const response = await registerUser(values.email, values.username, values.password, values.fullName);
            
            if (response.mfaSetup) {
                setMfaSetup({
                    username: values.username,
                    ...response.mfaSetup
                });
            } else {
                message.success('Registro exitoso!');
                navigate('/login');
            }
        } catch (error) {
            message.error('Error al registrar: ' + error.message);
        }
    };

    const handleMFAComplete = async (otp) => {
        try {
            await setupMFA(mfaSetup.username, otp);
            message.success('MFA configurado correctamente');
            navigate('/login');
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <div className="form-container register-form">
                <h2 className="form-header register-header">Registro</h2>
                <Form
                    name="registro"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
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

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, ingrese su contraseña!' }]}
                    >
                        <Input.Password placeholder="Contraseña" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="form-button">
                            Registrar
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <button
                        className="register-extra-button"
                        onClick={() => navigate('/login')}
                    >
                        Ya tengo cuenta
                    </button>
                </div>
            </div>

            {mfaSetup && (
                <MFASetupModal
                    mfaData={mfaSetup}
                    onComplete={handleMFAComplete}
                    onCancel={() => {
                        message.warning('Puedes configurar MFA más tarde en tu perfil');
                        navigate('/login');
                    }}
                />
            )}
        </>
    );
};

export default RegistroForm;
