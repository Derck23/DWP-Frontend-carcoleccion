import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginForm = () => {
    return (
        <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            background: 'rgba(255, 255, 255, 0.13)', 
            padding: '80px', 
            borderRadius: '15px', 
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)', 
            width: '600px', 
            textAlign: 'center'
        }}>
            <h2 style={{ color: 'white', marginBottom: '30px', fontSize: '40px' }}>Login</h2>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={(values) => console.log('Success:', values)}
                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
            >
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
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Iniciar Sesión
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
