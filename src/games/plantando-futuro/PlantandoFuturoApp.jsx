import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PfWelcomeScreen from './screens/PfWelcomeScreen';
import PfCatalogScreen from './screens/PfCatalogScreen';
import PfSuccessScreen from './screens/PfSuccessScreen';

export default function PlantandoFuturoApp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('welcome'); // Starts on welcome/instructions
  const [resgateData, setResgateData] = useState(null);

  const handleStart = () => {
    setCurrentStep('catalog');
  };

  const handleResgateSuccess = (data) => {
    setResgateData(data);
    setCurrentStep('success');
  };

  const handleFinish = () => {
    // Return to module initial screen with instructions
    setCurrentStep('welcome');
    setResgateData(null);
  };

  return (
    <div className="w-full h-full relative">
      {currentStep === 'welcome' && (
        <PfWelcomeScreen onStart={handleStart} />
      )}

      {currentStep === 'catalog' && (
        <PfCatalogScreen 
          onBack={() => setCurrentStep('welcome')}
          onResgateSuccess={handleResgateSuccess}
        />
      )}

      {currentStep === 'success' && (
        <PfSuccessScreen 
          resgateData={resgateData}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
}
