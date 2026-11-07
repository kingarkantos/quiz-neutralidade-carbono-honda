import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import ZoomContent from '../../../components/ZoomContent';
import { MEMORIA_ROUNDS } from '../data/memoriaData';

export default function MemoriaRoundSelectScreen({ onSelectRound }) {
  const round1 = MEMORIA_ROUNDS[1];
  const round2 = MEMORIA_ROUNDS[2];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />

      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-2 px-5 sm:px-6">
        {/* Header */}
        <Header className="pt-2 pb-1" />

        {/* Main Content */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-start pt-3 sm:pt-6 px-2 max-w-lg mx-auto w-full">
        {/* Badge & Instruction Card */}
        <div className="flex flex-col items-center text-center select-none w-full max-w-sm px-2 mb-4 sm:mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="inline-block bg-[#1C3B24] text-[#FAF5EC] font-black text-xs sm:text-sm tracking-widest px-5 py-2 rounded-full shadow-md uppercase mb-2.5"
          >
            ESCOLHA A RODADA
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full bg-[#FAF5EC]/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-white/80 shadow-3d-card"
          >
            <p className="text-[#1A2E1A] font-extrabold text-xs sm:text-sm uppercase tracking-wide leading-relaxed">
              Cada rodada possui 5 pares de cartas com diferentes fontes de energia
            </p>
          </motion.div>
        </div>

        {/* 2 Round Cards - Larger, taller, and nicely spaced */}
        <div className="w-full flex flex-row items-center justify-center gap-4 sm:gap-6 px-1">
          {/* Round 1 Card */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.2 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectRound(1)}
            className="flex-1 max-w-[210px] sm:max-w-[230px] bg-[#FAF5EC] rounded-[24px] p-3 sm:p-4 shadow-3d-card border-2 border-white cursor-pointer flex flex-col items-center text-center transition-all select-none group"
          >
            {/* Image */}
            <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden bg-[#E2D6C0] relative mb-2.5 shadow-inner">
              <img
                src={round1.thumb}
                alt={round1.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300 pointer-events-none"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#2EB85C] text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                Renováveis
              </span>
            </div>

            <h3 className="text-[#1A2E1A] font-black text-base sm:text-lg uppercase leading-tight tracking-tight">
              RODADA 1
            </h3>
            <span className="text-[#455A46] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider mt-1">
              5 PARES DE CARTAS
            </span>
          </motion.div>

          {/* Round 2 Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.3 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectRound(2)}
            className="flex-1 max-w-[210px] sm:max-w-[230px] bg-[#FAF5EC] rounded-[24px] p-3 sm:p-4 shadow-3d-card border-2 border-white cursor-pointer flex flex-col items-center text-center transition-all select-none group"
          >
            {/* Image */}
            <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden bg-[#E2D6C0] relative mb-2.5 shadow-inner">
              <img
                src={round2.thumb}
                alt={round2.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300 pointer-events-none"
              />
              <span className="absolute top-2.5 left-2.5 bg-[#d97706] text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                Transição
              </span>
            </div>

            <h3 className="text-[#1A2E1A] font-black text-base sm:text-lg uppercase leading-tight tracking-tight">
              RODADA 2
            </h3>
            <span className="text-[#455A46] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider mt-1">
              5 PARES DE CARTAS
            </span>
          </motion.div>
        </div>
      </div>

        {/* Footer Info */}
        <div className="w-full px-6 pb-6 pt-1 text-center select-none flex-shrink-0">
          <p className="text-[#455A46] font-semibold text-xs">
            Toque em uma rodada para iniciar o desafio da memória.
          </p>
        </div>
      </ZoomContent>
    </div>
  );
}

