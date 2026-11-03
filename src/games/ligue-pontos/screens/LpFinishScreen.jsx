import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import confetti from 'canvas-confetti';
import { RotateCcw } from 'lucide-react';

export default function LpFinishScreen({ onRestart }) {
  useEffect(() => {
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC']
    });
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-75"
        style={{ backgroundImage: `url('/assets/bg/slice-home.png')` }}
      />

      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Header */}
      <Header className="pt-3 pb-1" showTriplaAcao={false} />

      {/* Main Content - Anchored high in the solid beige sky */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start pt-2 sm:pt-4 px-6 max-w-lg mx-auto w-full text-center">
        {/* Celebration Triplo Zero Hero Badge */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: -15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.15 }}
          className="relative w-56 h-48 xs:w-64 xs:h-54 sm:w-72 sm:h-60 flex items-center justify-center my-1 sm:my-2 flex-shrink-0"
        >
          {/* Radial Eco Aura */}
          <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-[#3cd426]/35 blur-3xl pointer-events-none" />

          {/* Triplo Zero Logo (Tripla Ação Para o Zero) */}
          <motion.img
            animate={{
              y: [0, -6, 0],
              scale: [1, 1.025, 1]
            }}
            transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
            src="/assets/logos/tripla-acao.png"
            alt="Tripla Ação Para o Zero"
            className="w-full h-full object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.18)] pointer-events-none select-none z-20"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="my-1 select-none"
        >
          <h1 className="text-[#1A2E1A] font-black text-3xl sm:text-4xl tracking-tight uppercase leading-none">
            PARABÉNS!
          </h1>
          <p className="text-[#2EB85C] font-black text-sm sm:text-base tracking-wider uppercase mt-1">
            VOCÊ COMPLETOU TODAS AS CONEXÕES.
          </p>
        </motion.div>

        {/* Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="w-full bg-[#FAF5EC]/95 backdrop-blur-sm rounded-[22px] p-4 sm:p-5 shadow-3d-card border border-white/70 my-2"
        >
          <p className="text-[#1A2E1A] font-medium text-xs sm:text-sm leading-relaxed">
            A circulação dos recursos faz parte de um ciclo que reduz os impactos ambientais, valoriza os materiais e preserva os recursos naturais contribuindo para um futuro mais sustentável
          </p>
        </motion.div>
      </div>

      {/* Bottom Button Area - Only In-Game Restart */}
      <div className="relative z-10 w-full px-6 sm:px-8 pb-5 sm:pb-8 pt-1 flex justify-center max-w-lg mx-auto flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="w-full py-3.5 sm:py-4.5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-xl tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          <span>JOGAR NOVAMENTE</span>
        </motion.button>
      </div>
    </div>
  );
}

