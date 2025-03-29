import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { changePasswordWithToken } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = ({ recoveryToken }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        if (values.newPassword !== values.confirmPassword) {
            message.error('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        try {
            await changePasswordWithToken(recoveryToken, values.newPassword);
            message.success('Contraseña cambiada con éxito');
            navigate('/login');
        } catch (error) {
            message.error(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Cambiar Contraseña</h2>
            
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="newPassword"
                    label="Nueva contraseña"
                    rules={[{ required: true, message: 'Por favor ingresa tu nueva contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>
                
                <Form.Item
                    name="confirmPassword"
                    label="Confirmar nueva contraseña"
                    rules={[{ required: true, message: 'Por favor confirma tu nueva contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cambiar Contraseña
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePasswordForm;