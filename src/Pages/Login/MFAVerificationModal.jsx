import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';

const MFAVerificationModal = ({ onVerify, onCancel }) => {
    const [otp, setOtp] = useState('');
    
    const handleVerify = async () => {
        if (!otp || otp.length !== 6) {
            message.error('Por favor ingresa un código válido de 6 dígitos');
            return;
        }
        
        try {
            await onVerify(otp);
        } catch (error) {
            message.error(error.message);
        }
    };
    
    return (
        <Modal
            title="Verificación en Dos Pasos"
            open={true}
            onCancel={onCancel}
            footer={[
                <Button key="verify" type="primary" onClick={handleVerify}>
                    Verificar
                </Button>,
            ]}
        >
            <p>Ingresa el código de 6 dígitos de tu aplicación de autenticación</p>
            <Input 
                placeholder="Código MFA" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
            />
        </Modal>
    );
};

export default MFAVerificationModal;