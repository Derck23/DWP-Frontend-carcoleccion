import React, { useState } from 'react';
import { Steps } from 'antd';
import PasswordRecoveryRequest from './PasswordRecoveryRequest';
import VerifyRecoveryCode from './VerifyRecoveryCode';
import ChangePasswordForm from './ChangePasswordForm';
import Header from '../../Layouts/Header';

const { Step } = Steps;

const PasswordRecoveryFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [username, setUsername] = useState('');
    const [method, setMethod] = useState('');
    const [recoveryToken, setRecoveryToken] = useState('');

    const handleMethodSelected = (username, method) => {
        setUsername(username);
        setMethod(method);
        setCurrentStep(1);
    };

    const handleCodeVerified = (token) => {
        setRecoveryToken(token);
        setCurrentStep(2);
    };

    const steps = [
        {
            title: 'Identificación',
            content: <PasswordRecoveryRequest onMethodSelected={handleMethodSelected} />,
        },
        {
            title: 'Verificación',
            content: <VerifyRecoveryCode 
                username={username} 
                method={method} 
                onVerified={handleCodeVerified} 
            />,
        },
        {
            title: 'Nueva Contraseña',
            content: <ChangePasswordForm recoveryToken={recoveryToken} />,
        },
    ];

    return (
        <div>

        
            <div>
                <Header />
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Steps current={currentStep} style={{ marginBottom: '32px' }}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[currentStep].content}</div>
            </div>
        </div>
    );
};

export default PasswordRecoveryFlow;