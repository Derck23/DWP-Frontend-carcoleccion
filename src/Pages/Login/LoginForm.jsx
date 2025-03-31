import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, verifyMFA } from '../../services/authService';
import MFAVerificationModal from './MFAVerificationModal';

const LoginForm = () => {
  const navigate = useNavigate();
  const [mfaVerification, setMfaVerification] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await loginUser(values.username, values.password);
      
      if (response.requiresMFA) {
        setMfaVerification({
          tempToken: response.tempToken
        });
      } else if (response && response.data) {
        if (response.data.rol === 'admin') {
          navigate('/DashboardAdmin');
        } else {
          navigate('/dashboard');
        }
      } else {
        throw new Error('Respuesta de inicio de sesión inválida');
      }
    } catch (error) {
      message.error(error.message || 'Usuario o contraseña incorrectos');
    }
  };

  const handleMFAVerify = async (otp) => {
    try {
      const response = await verifyMFA(mfaVerification.tempToken, otp);
      
      if (response && response.data) {
        if (response.data.rol === 'admin') {
          navigate('/DashboardAdmin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div className="form-container login-form">
        <h2 className="form-header login-header">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
            <Button type="primary" htmlType="submit" className="form-button">
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
        <p >
            <a style={{ textAlign: 'center', marginTop: '16px', color: 'White' }} href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </p>
      </div>

      {mfaVerification && (
        <MFAVerificationModal
          onVerify={handleMFAVerify}
          onCancel={() => setMfaVerification(null)}
        />
      )}
    </>
  );
};

export default LoginForm;
