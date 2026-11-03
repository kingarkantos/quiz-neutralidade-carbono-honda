import React from 'react';
import { motion } from 'framer-motion';
import CornerFoliage from '../components/CornerFoliage';
import { RotateCcw } from 'lucide-react';

export default function FinalMessageScreen({ onRestart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Motorcycle + Scenic road (Slice 2 / slice-home.png) */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-home.png')` }}
      />

      {/* Bush Foliage in Bottom Corners */}
      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Top Header - Honda Logo Centered in Row */}
      <header className="relative w-full flex items-center justify-center pt-4 pb-1 z-40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-40 flex items-center justify-center"
        >
          <img
            src="/assets/logos/honda.png"
            alt="Honda - The Power of Dreams"
            className="h-8 sm:h-10 object-contain drop-shadow-md select-none pointer-events-none"
          />
        </motion.div>
      </header>

      {/* Main Content Area - Anchored in the Solid Upper Beige Zone */}
      <div className="relative z-30 flex-1 min-h-0 flex flex-col items-center justify-start px-5 sm:px-6 max-w-lg mx-auto w-full text-center pt-0 sm:pt-1">
        {/* 1. HERO TRIPLA AÇÃO PARA O ZERO LOGO (Bem maior e destacado) */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: 0.15
          }}
          className="relative my-0.5 sm:my-2 flex items-center justify-center w-full flex-shrink-0"
        >
          {/* Luminous Eco Glow Aura */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="absolute w-60 sm:w-72 h-28 sm:h-32 bg-[#7FD03F]/35 blur-2xl rounded-full -z-10 pointer-events-none"
          />

          <motion.img
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.0,
              ease: "easeInOut"
            }}
            src="/assets/logos/tripla-acao.png"
            alt="Tripla Ação Para o Zero"
            className="h-16 sm:h-26 max-w-[220px] sm:max-w-[320px] w-auto object-contain drop-shadow-xl select-none pointer-events-none"
          />
        </motion.div>

        {/* 2. Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.25 }}
          className="space-y-0 sm:space-y-1 my-0.5 sm:my-1 select-none"
        >
          <h2 className="text-[#1A2E1A] font-black text-base sm:text-xl tracking-wide uppercase leading-tight">
            UM FUTURO COM
          </h2>
          <h1 className="text-[#27A844] font-black text-xl sm:text-3xl tracking-tight uppercase leading-none drop-shadow-sm">
            MENOS EMISSÕES
          </h1>
          <h2 className="text-[#1A2E1A] font-black text-base sm:text-xl tracking-wide uppercase leading-tight pt-0.5">
            COMEÇA COM NOSSAS
          </h2>
          <h1 className="text-[#27A844] font-black text-xl sm:text-3xl tracking-tight uppercase leading-none drop-shadow-sm">
            ATITUDES.
          </h1>
        </motion.div>

        {/* 3. Supporting Paragraph - Positioned high in the solid beige background for maximum contrast */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-[#142616] font-bold text-xs sm:text-sm leading-relaxed max-w-sm select-none px-2 my-0.5 sm:my-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]"
        >
          A Honda trabalha por um mundo com menos emissões de carbono. E cada atitude consciente ajuda a construir esse caminho.
        </motion.p>
      </div>

      {/* Bottom Button Area with Shimmer */}
      <div className="relative z-10 w-full px-6 sm:px-8 pb-5 sm:pb-8 pt-1 flex justify-center max-w-lg mx-auto flex-shrink-0">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.55 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRestart}
          className="w-full py-3.5 sm:py-4.5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-2xl tracking-wider select-none uppercase flex items-center justify-center space-x-3 shadow-xl"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          <span>JOGAR NOVAMENTE</span>
        </motion.button>
      </div>
    </div>
  );
}
