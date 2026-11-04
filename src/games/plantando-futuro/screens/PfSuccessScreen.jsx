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
          else navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, onFinish]);

  const handleReturn = () => {
    if (onFinish) onFinish();
    else navigate('/');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb] select-none">
      {/* Background with Nature Foliage Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />
      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Top Bar with Honda Logo */}
      <div className="relative z-30 w-full flex items-center justify-between px-5 pt-3 pb-1">
        <button
          onClick={handleReturn}
          className="flex items-center space-x-1.5 bg-[#FAF5EC]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-[#2EB85C]/30 text-[#1C3B24] font-black text-xs hover:bg-white"
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
          className="w-full bg-[#FAF5EC]/98 backdrop-blur-md rounded-[28px] p-5 sm:p-6 shadow-2xl border-2 border-white flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* 1. Official Plantando o Futuro Logo Brand Lockup */}
          <div className="mb-2">
            <PfHeaderBrand compact={false} showSubtitle={true} treeSize={56} />
          </div>

          {/* 2. Muda Chosen Card Preview */}
          <div className="w-full flex flex-col items-center mt-1 mb-2">
            <h2 className="text-[#1A2E1A] font-black text-xl sm:text-2xl uppercase tracking-tight font-serif">
              {muda?.nome || 'Muda Nativa'}
            </h2>
            {muda?.cientifico && (
              <div className="inline-flex items-center my-1 bg-[#A9D39C] px-3.5 py-0.5 rounded-full shadow-[0_2px_4px_rgba(25,60,20,0.14)]">
                <span className="text-[#153B18] font-bold text-xs tracking-normal font-sans">
                  {muda.cientifico}
                </span>
              </div>
            )}
          </div>

          {/* Seedling & Grown Tree visual display */}
          <div className="relative w-full max-w-[260px] h-32 my-1 bg-gradient-to-b from-white to-[#F4ECE1] rounded-2xl p-2.5 shadow-inner border border-[#2EB85C]/25 flex items-center justify-around overflow-hidden">
            {muda?.imagemMuda && (
              <div className="h-full w-24 flex items-center justify-center">
                <img 
                  src={muda.imagemMuda} 
                  alt={muda.nome} 
                  className="max-h-full max-w-full object-contain drop-shadow-md"
                />
              </div>
            )}
            {muda?.arvore && (
              <div className="h-full w-28 flex items-center justify-center">
                <img 
                  src={muda.arvore} 
                  alt={`${muda.nome} adulta`} 
                  className="max-h-full max-w-full object-contain drop-shadow-md rounded-xl"
                />
              </div>
            )}
          </div>

          {/* 3. Official Campaign Contribution Message */}
          <div className="w-full my-3 p-3.5 sm:p-4 bg-gradient-to-r from-[#2EB85C]/12 via-[#7FD03F]/18 to-[#2EB85C]/12 rounded-2xl border border-[#2EB85C]/35 text-center shadow-xs">
            <p className="text-[#122D16] font-black text-sm sm:text-base leading-snug">
              Você contribuiu para a neutralização das emissões de CO2 desse evento.
            </p>
          </div>

          {/* Pickup direction */}
          <p className="text-[#3F5441] text-xs font-semibold mb-3">
            🌱 Retire sua muda com a nossa equipe no local.
          </p>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReturn}
            className="w-full py-3.5 px-6 rounded-full btn-tactile-green anim-shimmer text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>CONCLUIR E VOLTAR AO INÍCIO</span>
          </motion.button>

          <p className="text-[11px] text-gray-500 font-semibold mt-2.5">
            Voltando automaticamente ao início em {countdown}s
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
