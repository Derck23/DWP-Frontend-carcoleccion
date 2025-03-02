import React from 'react';
import { Form, Input, Button } from 'antd';

const RegistroForm = () => {
    return (
        <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            background: 'rgba(255, 255, 255, 0.11)', 
            padding: '40px', 
            borderRadius: '15px', 
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)', 
            width: '400px', 
            textAlign: 'center'
        }}>
            <h2 style={{ marginBottom: '30px', fontSize: '24px', color: 'white' }}>Registro</h2>
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
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Registrar
                    </Button>
                </Form.Item>
                
                <div>
                    <button style={{ 
                    margin: '10px', 
                    padding: '5px 10px', 
                    cursor: 'pointer', 
                    fontSize: '1.2rem', 
                    letterSpacing: '0.05rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.13)', 
                    color: 'white', 
                    border: '1px solid white', 
                    borderRadius: '5px'
                }} onClick={() => window.location.href = '/login'}> 
                    Ya tengo cuenta
                </button></div>
            </Form>
        </div>
    );
};

export default RegistroForm;
