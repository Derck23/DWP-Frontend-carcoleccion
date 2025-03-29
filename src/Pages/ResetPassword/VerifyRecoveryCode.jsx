import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { verifyRecoveryCode } from '../../services/authService';

const VerifyRecoveryCode = ({ username, method, onVerified }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await verifyRecoveryCode(username, values.code);
            onVerified(response.token);
            message.success(response.intMessage);
        } catch (error) {
            message.error(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Verificar Código</h2>
            <p>Hemos enviado un código de verificación a tu {method === 'email' ? 'email' : 'teléfono'}</p>
            
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="code"
                    label="Código de verificación"
                    rules={[{ required: true, message: 'Por favor ingresa el código' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Verificar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VerifyRecoveryCode;