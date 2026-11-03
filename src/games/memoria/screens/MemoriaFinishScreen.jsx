import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function MemoriaFinishScreen({ roundNumber, onPlayNextRound, onRestartRound }) {
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.4 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC']
    });
  }, []);

  const hasNextRound = roundNumber === 1;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom pointer-events-none z-0 opacity-75"
        style={{ backgroundImage: `url('/assets/jogo3/FUNDOS/slice-1-1.png')` }}
      />

      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Header */}
      <Header className="pt-3 pb-1" />

      {/* Center Content */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full text-center my-auto">
        {/* Celebration Trophy / Leaf Card */}
        <motion.div
          initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.15 }}
          className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white my-2 flex-shrink-0"
        >
          {/* Green aura */}
          <div className="absolute inset-0 bg-[#3cd426]/30 blur-2xl pointer-events-none" />
          <img
            src="/assets/jogo3/FUNDOS/cartao-verde-com-folha-em-relevo.png"
            alt="Parabéns"
            className="w-full h-full object-cover pointer-events-none select-none"
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
            RODADA CONCLUÍDA!
          </h1>
          <p className="text-[#2EB85C] font-black text-sm sm:text-base tracking-wider uppercase mt-1">
            VOCÊ ENCONTROU TODOS OS 5 PARES DE ENERGIA.
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
            {roundNumber === 1
              ? "As energias renováveis são fundamentais para zerar as emissões de carbono e garantir um fornecimento sustentável para as próximas gerações."
              : "Compreender as fontes fósseis e seu impacto nos ajuda a valorizar e acelerar a transição ecológica rumo ao carbono zero."}
          </p>
        </motion.div>
      </div>

      {/* Bottom Buttons - Isolated In-Game Flow */}
      <div className="relative z-10 w-full px-6 sm:px-8 pb-5 sm:pb-8 pt-1 flex justify-center max-w-lg mx-auto flex-shrink-0">
        {hasNextRound ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onPlayNextRound}
            className="w-full py-3.5 sm:py-4.5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-xl tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
          >
            <span>JOGAR RODADA 2</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRestartRound}
            className="w-full py-3.5 sm:py-4.5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-xl tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>JOGAR NOVAMENTE</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}

