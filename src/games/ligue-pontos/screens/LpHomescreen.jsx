import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import FallingLeavesMatrix from '../../../components/FallingLeavesMatrix';

export default function LpHomescreen({ onStart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb]">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-85"
        style={{ backgroundImage: `url('/assets/bg/slice-home.webp')` }}
      />

      {/* Falling Vector Leaves */}
      <FallingLeavesMatrix count={20} className="absolute top-0 left-0 right-0 h-[50%] overflow-hidden pointer-events-none z-10" />

      {/* Corner Foliage */}
      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Top Header & Title */}
      <div className="relative z-30 w-full flex flex-col items-center">
        <Header className="pt-2 sm:pt-3 pb-0" />

        <div className="w-full flex flex-col items-center text-center px-6 pt-0 max-w-lg mx-auto select-none">
          {/* 3D Official Logo Banner from Assets */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
            className="relative flex flex-col items-center my-0.5"
          >
            {/* Eco Aura Glow */}
            <div className="absolute w-64 h-32 rounded-full bg-[#3cd426]/30 blur-2xl -z-10 pointer-events-none" />

            <motion.img
              animate={{
                y: [0, -6, 0],
                rotate: [-0.8, 0.8, -0.8],
                scale: [1, 1.02, 1]
              }}
              transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
              src="/assets/jogo2/ELEMENTOS/TELA INICIAL/logo-3d-de-circulacao-de-recursos-4.webp"
              alt="Circulação de Recursos - Ligue os Pontos"
              className="w-full max-w-[290px] sm:max-w-[340px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] pointer-events-none select-none"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#1E2D1D] font-extrabold text-xs sm:text-sm leading-snug max-w-xs mt-1 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
          >
            Descubra como os recursos podem ganhar novas possibilidades sustentáveis.
          </motion.p>
        </div>
      </div>

      {/* Center 3D Hero Illustration - Posicionado bem mais para cima no céu bege */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col items-center justify-start pt-2 sm:pt-4 px-4">
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [-1, 1, -1]
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="relative w-52 h-52 xs:w-56 xs:h-56 sm:w-64 sm:h-64 flex items-center justify-center -mt-1 sm:-mt-2"
        >
          {/* Radiant Glow behind hero asset */}
          <div className="absolute w-44 h-44 sm:w-54 sm:h-54 rounded-full bg-[#3cd426]/35 blur-3xl -z-10 pointer-events-none" />
          
          <img
            src="/assets/jogo2/ELEMENTOS/TELA INICIAL/ciclo-sustentavel-entre-maquina-e-natureza-1.webp"
            alt="Circulação de Recursos"
            className="w-full h-full object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.25)] select-none pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Bottom Button - Lifted higher from bottom edge */}
      <div className="relative z-30 w-full px-6 sm:px-8 pb-10 sm:pb-14 pt-2 flex justify-center max-w-md mx-auto flex-shrink-0">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="w-full py-4 sm:py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-lg sm:text-2xl tracking-wider select-none uppercase shadow-2xl"
        >
          INICIAR
        </motion.button>
      </div>
    </div>
  );
}

