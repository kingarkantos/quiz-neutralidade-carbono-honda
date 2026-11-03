import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import confetti from 'canvas-confetti';
import { RotateCcw, LayoutGrid } from 'lucide-react';

export default function LpFinishScreen({ onRestart }) {
  const navigate = useNavigate();

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

      {/* Main Content */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full text-center my-auto">
        {/* Celebration 3D Badge */}
        <motion.div
          initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.15 }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center my-2 flex-shrink-0"
        >
          {/* Radial Aura */}
          <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#3cd426]/40 blur-3xl pointer-events-none" />

          {/* Floating Leaves decoration around the disk */}
          <motion.img
            animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            src="/assets/jogo2/ELEMENTOS/TELA FINAL/folha-verde-curvada-isolada-2.png"
            alt="Folha"
            className="absolute -top-2 -left-2 w-14 h-14 sm:w-18 sm:h-18 object-contain pointer-events-none"
          />
          <motion.img
            animate={{ rotate: [10, -10, 10], y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4.0, delay: 0.2, ease: 'easeInOut' }}
            src="/assets/jogo2/ELEMENTOS/TELA FINAL/folha-verde-alongada-a-esquerda-4.png"
            alt="Folha"
            className="absolute -bottom-2 -right-2 w-14 h-14 sm:w-18 sm:h-18 object-contain pointer-events-none"
          />

          <img
            src="/assets/jogo2/ELEMENTOS/TELA FINAL/disco-verde-com-marca-de-verificacao-branca-1.png"
            alt="Concluído com Sucesso"
            className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-2xl pointer-events-none select-none z-10"
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
            A circulação de recursos faz parte de um ciclo que reduz impactos ambientais e valoriza os materiais, contribuindo diretamente para um futuro de zero emissões de carbono.
          </p>
        </motion.div>
      </div>

      {/* Bottom Buttons */}
      <div className="relative z-10 w-full px-6 sm:px-8 pb-5 sm:pb-8 pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-lg mx-auto flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="w-full sm:flex-1 py-3.5 sm:py-4 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <RotateCcw className="w-5 h-5 stroke-[2.5]" />
          <span>JOGAR NOVAMENTE</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full btn-tactile-brown text-white font-black text-sm sm:text-base tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <LayoutGrid className="w-4 h-4 stroke-[2.5]" />
          <span>OUTROS JOGOS</span>
        </motion.button>
      </div>
    </div>
  );
}
