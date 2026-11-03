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
      <Header className="pt-3 pb-1" />

      {/* Main Content - Anchored high in the solid beige sky */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start pt-2 sm:pt-4 px-6 max-w-lg mx-auto w-full text-center">
        {/* Celebration 3D Badge - Significantly Enlarged */}
        <motion.div
          initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.15 }}
          className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 flex items-center justify-center my-1 sm:my-2 flex-shrink-0"
        >
          {/* Radial Aura */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#3cd426]/40 blur-3xl pointer-events-none" />

          {/* Floating Leaves decoration BEHIND the disk (z-10) */}
          <motion.img
            animate={{ rotate: [-10, 4, -10], y: [0, -6, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            src="/assets/jogo2/ELEMENTOS/TELA FINAL/folha-verde-curvada-isolada-2.png"
            alt="Folha"
            className="absolute -top-4 -left-4 xs:-top-5 xs:-left-5 sm:-top-7 sm:-left-7 w-26 h-26 xs:w-32 xs:h-32 sm:w-36 sm:h-36 object-contain pointer-events-none z-10"
          />
          <motion.img
            animate={{ rotate: [8, -8, 8], y: [0, 6, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4.0, delay: 0.2, ease: 'easeInOut' }}
            src="/assets/jogo2/ELEMENTOS/TELA FINAL/folha-verde-alongada-a-esquerda-4.png"
            alt="Folha"
            className="absolute -bottom-4 -right-4 xs:-bottom-5 xs:-right-5 sm:-bottom-7 sm:-right-7 w-26 h-26 xs:w-32 xs:h-32 sm:w-36 sm:h-36 object-contain pointer-events-none z-10"
          />

          {/* Green Check Disk - IN FRONT OF LEAVES (z-20) */}
          <img
            src="/assets/jogo2/ELEMENTOS/TELA FINAL/disco-verde-com-marca-de-verificacao-branca-1.png"
            alt="Concluído com Sucesso"
            className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 object-contain drop-shadow-2xl pointer-events-none select-none z-20"
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

