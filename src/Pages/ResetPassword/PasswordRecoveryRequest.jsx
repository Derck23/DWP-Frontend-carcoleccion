import React, { useState } from 'react';
import { Form, Input, Button, message, Radio } from 'antd';
import { requestPasswordRecovery } from '../../services/authService';

const PasswordRecoveryRequest = ({ onMethodSelected }) => {
    const [loading, setLoading] = useState(false);
    const [availableMethods, setAvailableMethods] = useState(null);
    const [username, setUsername] = useState('');

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await requestPasswordRecovery(values.username);
            setAvailableMethods(response.methodsAvailable);
            setUsername(values.username);
            message.success(response.intMessage);
        } catch (error) {
            message.error(error.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Recuperar Contraseña</h2>
            
            {!availableMethods ? (
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Nombre de usuario"
                        rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Continuar
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <div>
                    <h3>Selecciona un método de recuperación</h3>
                    
                    <Radio.Group onChange={(e) => onMethodSelected(username, e.target.value)}>
                        {availableMethods.email && (
                            <Radio.Button value="email">Recibir código por email</Radio.Button>
                        )}
                        {availableMethods.sms && (
                            <Radio.Button value="sms">Recibir código por SMS</Radio.Button>
                        )}
                        {availableMethods.questions && (
                            <Radio.Button value="questions">Responder preguntas secretas</Radio.Button>
                        )}
                    </Radio.Group>
                </div>
            )}
        </div>
    );
};

export default PasswordRecoveryRequest;