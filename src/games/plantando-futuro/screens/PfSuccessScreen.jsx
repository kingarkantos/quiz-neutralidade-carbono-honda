import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Home, Leaf } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import CornerFoliage from '../../../components/CornerFoliage';
import PfHeaderBrand from '../components/PfHeaderBrand';

export default function PfSuccessScreen({ resgateData, onFinish }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const muda = resgateData?.muda;

  useEffect(() => {
    // Joyful confetti explosion
    confetti({
      particleCount: 70,
      spread: 85,
      origin: { y: 0.35 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#A9D39C', '#FAF5EC'],
      disableForReducedMotion: true
    });

    // Auto-return countdown timer for totens
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onFinish) onFinish();
          else navigate('/plantando-o-futuro');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, onFinish]);

  const handleReturn = () => {
    if (onFinish) onFinish();
    else navigate('/plantando-o-futuro');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb] select-none">
      {/* Background with Nature Foliage Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />
      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Top Bar with Honda Logo Centered */}
      <div className="relative z-30 w-full flex items-center justify-center px-5 pt-3 pb-1 min-h-[44px]">
        <button
          onClick={handleReturn}
          className="absolute left-5 top-3 flex items-center space-x-1.5 bg-[#FAF5EC]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-[#2EB85C]/30 text-[#1C3B24] font-black text-xs hover:bg-white z-10"
        >
          <Home className="w-3.5 h-3.5 text-[#2EB85C]" />
          <span>INÍCIO</span>
        </button>

        <img 
          src="/assets/logos/honda.svg" 
          alt="Honda" 
          className="h-7 w-auto object-contain" 
        />
      </div>

      {/* Main Success Container */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-2 max-w-md mx-auto w-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="w-full bg-[#FAF5EC]/98 backdrop-blur-md rounded-[28px] p-6 sm:p-8 shadow-2xl border-2 border-white flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* 1. Official Plantando o Futuro Logo Brand Lockup */}
          <div className="mb-2">
            <PfHeaderBrand compact={false} showSubtitle={true} treeSize={56} />
          </div>

          {/* 2. Official Carbon Reduction Pill Card (-17,33 kgCO2e/ano) */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22, delay: 0.12 }}
            className="w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[390px] my-3 drop-shadow-md select-none"
          >
            <img 
              src="/assets/plantando-futuro/card-reducao-emissao.png" 
              alt="-17,33 kgCO2e/ano de emissões reduzidas" 
              className="w-full h-auto object-contain pointer-events-none"
            />
          </motion.div>

          {/* 3. Official Campaign Contribution Message */}
          <div className="w-full my-2.5 p-4 sm:p-5 bg-gradient-to-r from-[#2EB85C]/12 via-[#7FD03F]/18 to-[#2EB85C]/12 rounded-2xl border border-[#2EB85C]/35 text-center shadow-xs">
            <p className="text-[#122D16] font-black text-base sm:text-lg leading-relaxed">
              Você contribuiu para a neutralização das emissões de CO2 desse evento.
            </p>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReturn}
            className="w-full py-4 px-6 rounded-full btn-tactile-green anim-shimmer text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 mt-2"
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>VOLTAR AO INÍCIO</span>
          </motion.button>

          <p className="text-[11px] text-gray-500 font-semibold mt-3">
            Voltando automaticamente ao catálogo em {countdown}s
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-30 w-full px-5 py-2 text-center text-xs text-[#1A2E1A]/60 font-semibold">
        Honda • Plantando o Futuro
      </div>
    </div>
  );
}
