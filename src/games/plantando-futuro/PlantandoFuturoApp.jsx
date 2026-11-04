import React, { useState } from 'react';
import PfWelcomeScreen from './screens/PfWelcomeScreen';
import PfSignatureScreen from './screens/PfSignatureScreen';
import PfCatalogScreen from './screens/PfCatalogScreen';
import PfVoucherScreen from './screens/PfVoucherScreen';

export default function PlantandoFuturoApp() {
  const [currentStep, setCurrentStep] = useState('welcome'); // welcome | signature | catalog | voucher
  const [colaboradorInfo, setColaboradorInfo] = useState({ nome: '', signatureData: '' });
  const [resgateData, setResgateData] = useState(null);

  const handleStart = () => {
    setCurrentStep('signature');
  };

  const handleSignatureConfirmed = (info) => {
    setColaboradorInfo(info);
    setCurrentStep('catalog');
  };

  const handleResgateSuccess = (data) => {
    setResgateData(data);
    setCurrentStep('voucher');
  };

  const handleFinish = () => {
    setCurrentStep('welcome');
    setColaboradorInfo({ nome: '', signatureData: '' });
    setResgateData(null);
  };

  return (
    <div className="w-full h-full relative">
      {currentStep === 'welcome' && (
        <PfWelcomeScreen onStart={handleStart} />
      )}

      {currentStep === 'signature' && (
        <PfSignatureScreen 
          onBack={() => setCurrentStep('welcome')}
          onConfirm={handleSignatureConfirmed}
        />
      )}

      {currentStep === 'catalog' && (
        <PfCatalogScreen 
          onBack={() => setCurrentStep('signature')}
          colaboradorInfo={colaboradorInfo}
          onResgateSuccess={handleResgateSuccess}
        />
      )}

      {currentStep === 'voucher' && (
        <PfVoucherScreen 
          resgateData={resgateData}
          colaboradorInfo={colaboradorInfo}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}
