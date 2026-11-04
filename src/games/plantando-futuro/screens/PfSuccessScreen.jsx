import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Home, ArrowRight } from 'lucide-react';
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
      particleCount: 65,
      spread: 80,
      origin: { y: 0.38 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC', '#F4ECE1'],
      disableForReducedMotion: true
    });

    // Auto-return countdown timer for kiosks
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

      {/* Top Header */}
      <div className="relative z-30 w-full flex items-center justify-between px-5 pt-3 pb-1">
        <PfHeaderBrand compact={true} showSubtitle={false} treeSize={38} />

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
          {/* Top Success Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#2EB85C] text-white px-4 py-1.2 rounded-full text-xs font-black uppercase shadow-md mb-2">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>ESCOLHA REGISTRADA COM SUCESSO!</span>
          </div>

          <h2 className="text-[#1A2E1A] font-black text-2xl sm:text-3xl uppercase tracking-tight mt-1 font-serif">
            {muda?.nome || 'Muda Nativa'}
          </h2>
          <p className="text-gray-500 italic text-xs mb-3">
            {muda?.cientifico || 'Espécie nativa brasileira'}
          </p>

          {/* Seedling & Grown Tree visual display */}
          <div className="relative w-full max-w-[260px] h-36 my-2 bg-gradient-to-b from-white to-[#F4ECE1] rounded-2xl p-2.5 shadow-inner border border-[#2EB85C]/25 flex items-center justify-around overflow-hidden">
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

          {/* Instructions box */}
          <div className="w-full my-3 p-3 bg-white/90 rounded-2xl border border-gray-200 text-center">
            <p className="text-[#1A2E1A] font-bold text-sm leading-snug">
              Retire sua muda com a equipe no local.
            </p>
            <p className="text-[#4b5e4c] text-xs mt-1 leading-relaxed">
              Você assinará a lista manual e receberá todas as orientações para o plantio e cultivo sustentável.
            </p>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReturn}
            className="w-full mt-2 py-3.5 px-6 rounded-full btn-tactile-green anim-shimmer text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2"
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
