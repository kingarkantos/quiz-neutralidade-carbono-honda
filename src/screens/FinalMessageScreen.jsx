import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { RotateCcw } from 'lucide-react';

export default function FinalMessageScreen({ onRestart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Motorcycle + Scenic road (Slice 2 / slice-home.png) */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-home.png')` }}
      />

      {/* Top Header (Honda Logo only, Tripla Ação is in the Hero section below) */}
      <Header showTriplaAcao={false} />

      {/* Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-6 max-w-lg mx-auto w-full text-center py-2">
        {/* 1. HERO TRIPLA AÇÃO PARA O ZERO LOGO (Filling the upper space with impact) */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: -25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: 0.15
          }}
          className="relative my-2 sm:my-3 flex items-center justify-center"
        >
          {/* Subtle Eco Glow behind the Hero Logo */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="absolute w-48 h-20 bg-[#7FD03F]/25 blur-xl rounded-full -z-10 pointer-events-none"
          />

          <motion.img
            animate={{ 
              y: [0, -6, 0],
              rotate: [0, 0.8, 0, -0.8, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.2,
              ease: "easeInOut"
            }}
            src="/assets/logos/tripla-acao.png"
            alt="Tripla Ação Para o Zero"
            className="h-14 sm:h-18 object-contain drop-shadow-md select-none pointer-events-none"
          />
        </motion.div>

        {/* 2. Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.25 }}
          className="space-y-0.5 sm:space-y-1 my-1 select-none"
        >
          <h2 className="text-[#1A2E1A] font-black text-xl sm:text-2xl tracking-wide uppercase leading-tight">
            UM FUTURO COM
          </h2>
          <h1 className="text-[#27A844] font-black text-3xl sm:text-4xl tracking-tight uppercase leading-none drop-shadow-sm">
            MENOS EMISSÕES
          </h1>
          <h2 className="text-[#1A2E1A] font-black text-xl sm:text-2xl tracking-wide uppercase leading-tight pt-0.5">
            COMEÇA COM NOSSAS
          </h2>
          <h1 className="text-[#27A844] font-black text-3xl sm:text-4xl tracking-tight uppercase leading-none drop-shadow-sm">
            ATITUDES.
          </h1>
        </motion.div>

        {/* 3. Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-[#1E2D1D] font-semibold text-sm sm:text-base leading-relaxed max-w-sm select-none px-2 my-1 drop-shadow-sm"
        >
          A Honda trabalha por um mundo com menos emissões de carbono. E cada atitude consciente ajuda a construir esse caminho.
        </motion.p>

        {/* 4. HIGHLIGHT CONTAINER: "Juntos, por um futuro mais sustentável" (High Contrast Badge) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.45 }}
          className="my-2 bg-[#FAF5EC]/95 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/80 flex items-center space-x-2.5 mx-auto"
        >
          <motion.img 
            animate={{ rotate: [-6, 6, -6], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            src="/assets/elements/folha.png" 
            alt="Folha" 
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-sm flex-shrink-0"
          />
          <p className="text-[#1A2E1A] font-extrabold text-sm sm:text-base tracking-wide select-none whitespace-nowrap">
            Juntos, por um futuro mais sustentável.
          </p>
        </motion.div>
      </div>

      {/* Bottom Button Area with Shimmer */}
      <div className="relative z-10 w-full px-8 pb-12 pt-2 flex justify-center max-w-lg mx-auto">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.55 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRestart}
          className="w-full py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-xl sm:text-2xl tracking-wider select-none uppercase flex items-center justify-center space-x-3 shadow-xl"
        >
          <RotateCcw className="w-6 h-6 stroke-[3]" />
          <span>JOGAR NOVAMENTE</span>
        </motion.button>
      </div>
    </div>
  );
}
