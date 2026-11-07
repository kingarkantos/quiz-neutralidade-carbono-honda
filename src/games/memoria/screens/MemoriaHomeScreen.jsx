import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import FallingLeavesMatrix from '../../../components/FallingLeavesMatrix';
import WindLeavesStream from '../../../components/WindLeavesStream';
import ZoomContent from '../../../components/ZoomContent';

export default function MemoriaHomeScreen({ onStart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb]">
      {/* Background with wind turbines and hills */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom pointer-events-none z-0 opacity-85"
        style={{ backgroundImage: `url('/assets/jogo3/FUNDOS/slice-1-1.webp')` }}
      />

      {/* Falling Vector Leaves Matrix Animation in Top Zone */}
      <FallingLeavesMatrix count={14} className="absolute top-0 left-0 right-0 h-[40%] overflow-hidden pointer-events-none z-10" />

      {/* Gentle Wind Carrying Leaves from Left to Right across Landscape */}
      <WindLeavesStream leafCount={15} className="absolute inset-0 pointer-events-none overflow-hidden z-20" />

      {/* Foliage in corners */}
      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-2 px-6">
        {/* Top Header & Logo Area */}
        <div className="w-full flex flex-col items-center">
          <Header className="pt-3 pb-0" />

          <div className="w-full flex flex-col items-center text-center px-4 pt-1 max-w-lg mx-auto select-none">
            {/* Tag Pill */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-block bg-[#1C3B24] text-[#FAF5EC] px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-md mb-2"
            >
              JOGO DA MEMÓRIA
            </motion.div>

            {/* 3D Logo from Asset */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
              className="relative flex items-center justify-center my-1"
            >
              {/* Eco Aura Glow */}
              <div className="absolute w-72 h-36 rounded-full bg-[#3cd426]/35 blur-2xl -z-10 pointer-events-none" />

              <motion.img
                animate={{
                  y: [0, -8, 0],
                  rotate: [-1, 1, -1],
                  scale: [1, 1.02, 1]
                }}
                transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
                src="/assets/jogo3/TELA INICIAL/logo-energia-limpa-jogo-da-memoria.webp"
                alt="Energia Limpa - Jogo da Memória"
                className="w-full max-w-[320px] sm:max-w-[360px] drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)] pointer-events-none select-none"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-[#1E2D1D] font-extrabold text-xs sm:text-sm leading-snug max-w-xs mt-2 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
            >
              Descubra diferentes fontes de energia e aprenda sobre suas características e impactos no ambiente.
            </motion.p>

            {/* Quick Rules / Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mt-2.5 sm:mt-3 w-full max-w-sm bg-[#FAF5EC]/95 backdrop-blur-sm rounded-2xl p-2.5 sm:p-3 border border-white/80 shadow-sm"
            >
              <span className="text-[9.5px] sm:text-[10px] font-black uppercase text-[#1C3B24] tracking-wider block mb-1">
                COMO JOGAR
              </span>
              <p className="text-[#2A402B] font-bold text-[11px] sm:text-xs leading-tight">
                Toque nas cartas para virar e encontre os 5 pares de fontes de energia antes de 1:30s acabar!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Button - Directly below instructions! */}
        <div className="w-full px-2 sm:px-4 mt-4 sm:mt-6 pb-6 flex justify-center max-w-md mx-auto flex-shrink-0">
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.35 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onStart}
            className="w-full py-4 sm:py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-lg sm:text-2xl tracking-wider select-none uppercase shadow-2xl"
          >
            COMEÇAR
          </motion.button>
        </div>
      </ZoomContent>
    </div>
  );
}

