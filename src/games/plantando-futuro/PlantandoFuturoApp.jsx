import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PfCatalogScreen from './screens/PfCatalogScreen';
import PfSuccessScreen from './screens/PfSuccessScreen';

export default function PlantandoFuturoApp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('catalog'); // Starts directly on catalog
  const [resgateData, setResgateData] = useState(null);

  const handleResgateSuccess = (data) => {
    setResgateData(data);
    setCurrentStep('success');
  };

  const handleFinish = () => {
    // Return to mudas catalog screen instead of the modules hub
    setCurrentStep('catalog');
    setResgateData(null);
  };

  return (
    <div className="w-full h-full relative">
      {currentStep === 'catalog' && (
        <PfCatalogScreen 
          onBack={() => navigate('/')}
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
