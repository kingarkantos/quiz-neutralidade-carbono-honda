import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import { MEMORIA_ROUNDS } from '../data/memoriaData';

export default function MemoriaRoundSelectScreen({ onSelectRound }) {
  const round1 = MEMORIA_ROUNDS[1];
  const round2 = MEMORIA_ROUNDS[2];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Header */}
      <Header className="pt-3 pb-1" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-5 sm:px-6 max-w-lg mx-auto w-full my-auto">
        {/* Top Badges */}
        <div className="flex flex-col items-center text-center space-y-1 mb-3 select-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-[#1C3B24] text-white font-extrabold text-xs sm:text-sm tracking-wider px-4 py-1.5 rounded-full shadow uppercase"
          >
            ESCOLHA A RODADA
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#FAF5EC]/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/70 shadow-sm mt-1 max-w-xs"
          >
            <p className="text-[#1A2E1A] font-bold text-xs uppercase tracking-wide">
              Cada rodada possui 5 pares de cartas com diferentes fontes de energia
            </p>
          </motion.div>
        </div>

        {/* 2 Round Cards */}
        <div className="w-full flex flex-row items-center justify-center gap-3 sm:gap-4 my-2">
          {/* Round 1 Card */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.2 }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectRound(1)}
            className="flex-1 max-w-[210px] bg-[#FAF5EC] rounded-[22px] p-2.5 sm:p-3 shadow-3d-card border-2 border-white/80 cursor-pointer flex flex-col items-center text-center transition-all select-none group"
          >
            {/* Image */}
            <div className="w-full h-28 sm:h-36 rounded-xl overflow-hidden bg-[#E2D6C0] relative mb-2 shadow-inner">
              <img
                src={round1.thumb}
                alt={round1.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300 pointer-events-none"
              />
              <span className="absolute top-2 left-2 bg-[#2EB85C] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow">
                Renováveis
              </span>
            </div>

            <h3 className="text-[#1A2E1A] font-black text-sm sm:text-base uppercase leading-tight">
              RODADA 1
            </h3>
            <span className="text-[#455A46] font-bold text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">
              5 PARES DE CARTAS
            </span>
          </motion.div>

          {/* Round 2 Card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.3 }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelectRound(2)}
            className="flex-1 max-w-[210px] bg-[#FAF5EC] rounded-[22px] p-2.5 sm:p-3 shadow-3d-card border-2 border-white/80 cursor-pointer flex flex-col items-center text-center transition-all select-none group"
          >
            {/* Image */}
            <div className="w-full h-28 sm:h-36 rounded-xl overflow-hidden bg-[#E2D6C0] relative mb-2 shadow-inner">
              <img
                src={round2.thumb}
                alt={round2.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300 pointer-events-none"
              />
              <span className="absolute top-2 left-2 bg-[#d97706] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow">
                Transição
              </span>
            </div>

            <h3 className="text-[#1A2E1A] font-black text-sm sm:text-base uppercase leading-tight">
              RODADA 2
            </h3>
            <span className="text-[#455A46] font-bold text-[10px] sm:text-xs uppercase tracking-wider mt-0.5">
              5 PARES DE CARTAS
            </span>
          </motion.div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full px-6 pb-5 pt-1 text-center select-none flex-shrink-0">
        <p className="text-[#455A46] font-semibold text-xs">
          Toque em uma rodada para iniciar o desafio da memória.
        </p>
      </div>
    </div>
  );
}

