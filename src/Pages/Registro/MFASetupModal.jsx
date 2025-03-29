import React, { useState } from 'react';
import { Modal, Input, Button, message, Steps } from 'antd';
import { QRCodeSVG } from 'qrcode.react'; // Importación corregida

const MFASetupModal = ({ mfaData, onComplete, onCancel }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [otp, setOtp] = useState('');
    
    const steps = [
        {
            title: 'Escanear QR',
            content: (
                <div style={{ textAlign: 'center' }}>
                    <p>Escanea este código QR con tu aplicación de autenticación</p>
                    <div style={{ 
                        background: 'white', 
                        padding: '16px', 
                        display: 'inline-block',
                        marginBottom: '20px'
                    }}>
                        <QRCodeSVG 
                            value={mfaData.otpauthUrl}
                            size={200}
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                    <p style={{ marginTop: 20 }}>O ingresa este código manualmente:</p>
                    <p><strong>{mfaData.secret}</strong></p>
                    <p><small>Nombre de la cuenta: CarCollection:{mfaData.username}</small></p>
                </div>
            ),
        },
        {
            title: 'Verificar código',
            content: (
                <div style={{ textAlign: 'center' }}>
                    <p>Ingresa el código de 6 dígitos generado por tu aplicación</p>
                    <Input 
                        placeholder="Código MFA" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        style={{ width: 200, marginBottom: 20 }}
                    />
                </div>
            ),
        },
    ];
    
    const next = async () => {
        if (currentStep === steps.length - 1) {
            if (!otp || otp.length !== 6) {
                message.error('Por favor ingresa un código válido de 6 dígitos');
                return;
            }
            
            try {
                await onComplete(otp);
                message.success('MFA configurado correctamente');
            } catch (error) {
                message.error(error.message);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const prev = () => {
        setCurrentStep(currentStep - 1);
    };
    
    return (
        <Modal
            title="Configurar Autenticación de Dos Factores (MFA)"
            open={true}
            onCancel={onCancel}
            footer={[
                currentStep > 0 && (
                    <Button key="back" onClick={prev}>
                        Atrás
                    </Button>
                ),
                <Button 
                    key="next" 
                    type="primary" 
                    onClick={next}
                >
                    {currentStep === steps.length - 1 ? 'Completar' : 'Siguiente'}
                </Button>,
            ]}
            width={600}
        >
            <Steps current={currentStep} items={steps} style={{ marginBottom: 24 }} />
            <div style={{ marginTop: 24 }}>
                {steps[currentStep].content}
            </div>
        </Modal>
    );
};

export default MFASetupModal;