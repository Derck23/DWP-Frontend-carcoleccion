import React from 'react';
import { Form, Input, Button } from 'antd';
import '../../App.css';

const LoginForm = () => {
    return (
        <div className="form-container login-form">
            <h2 className="form-header login-header">Login</h2>
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
                    <Button type="primary" htmlType="submit" className="form-button" onClick={() => window.location.href = '/dashboard'}>
                        Iniciar Sesión
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
