import React from 'react';
import { Form, Input, Button } from 'antd';

const RegistroForm = () => {
    return (
        <div className="form-container register-form">
            <h2 className="form-header register-header">Registro</h2>
            <Form
                name="registro"
                initialValues={{ remember: true }}
                onFinish={(values) => console.log('Success:', values)}
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
                    <Button type="primary" htmlType="submit" className="form-button" onClick={() => window.location.href = '/login'}>
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
            <div>
                    <button className="register-extra-button" onClick={() => window.location.href = '/login'}> 
                        Ya tengo cuenta
                    </button>
            </div>
        </div>
    );
};

export default RegistroForm;
