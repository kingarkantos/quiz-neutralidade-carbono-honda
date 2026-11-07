import React from 'react';
import { motion } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import ZoomContent from '../../../components/ZoomContent';
import LpInteractiveTutorial from '../components/LpInteractiveTutorial';

export default function LpHowToPlayScreen({ onStart }) {
  const steps = [
    {
      num: 1,
      icon: "/assets/jogo2/ELEMENTOS/TELA INICIAL/mao-tocando-alvo-circular-3.webp",
      title: "Selecione a ação",
      desc: "Toque em uma das ações industriais sustentáveis na coluna da esquerda."
    },
    {
      num: 2,
      icon: "/assets/jogo2/ELEMENTOS/TELA INICIAL/nos-circulares-conectados-por-linha-tracejada-2.webp",
      title: "Conecte ao benefício",
      desc: "Toque no benefício ambiental correspondente na coluna da direita."
    },
    {
      num: 3,
      icon: "/assets/jogo2/ELEMENTOS/TELA INICIAL/circulo-aberto-com-marca-de-verificacao-1.webp",
      title: "Descubra o impacto",
      desc: "Cada par correto revela detalhes de como a indústria protege o planeta."
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />

      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-2 px-4 sm:px-6">
        {/* Top Header */}
        <Header className="pt-2 pb-1" />

        {/* Center Content */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-start pt-1 sm:pt-3 px-2 max-w-lg mx-auto w-full">
          {/* Animated Tutorial Demonstration */}
          <div className="w-full mb-2.5 sm:mb-3">
            <LpInteractiveTutorial />
          </div>

          {/* Badges */}
          <div className="flex flex-col items-center space-y-0.5 mb-2 sm:mb-2.5 select-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-[#1C3B24] text-white font-extrabold text-[10px] sm:text-xs tracking-wider px-3 py-0.5 rounded-full shadow uppercase"
            >
              CIRCULAÇÃO DE RECURSOS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#1A2E1A] font-black text-lg sm:text-xl uppercase tracking-wide"
            >
              COMO JOGAR
            </motion.h2>
          </div>

          {/* 3 Steps */}
          <div className="w-full space-y-2 sm:space-y-2.5">
            {steps.map((st, idx) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                  delay: 0.15 + idx * 0.12
                }}
                className="bg-[#faf5ec]/95 backdrop-blur-sm rounded-[18px] sm:rounded-[22px] p-2.5 sm:p-3 shadow-3d-card flex items-center space-x-3 border border-white/70"
              >
                {/* Icon circle */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#EBE0CC]/80 flex-shrink-0 flex items-center justify-center p-1.5 shadow-inner border border-white/60">
                  <img
                    src={st.icon}
                    alt={st.title}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 text-left min-w-0">
                  <p className="text-[#1A2E1A] font-bold text-xs sm:text-sm leading-snug">
                    {st.title}
                  </p>
                  <p className="text-[#455A46] text-[10px] sm:text-xs font-medium leading-tight mt-0.5">
                    {st.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Button - Directly below the steps! */}
          <div className="w-full mt-4 sm:mt-6 pb-6 flex justify-center flex-shrink-0">
            <motion.button
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStart}
              className="w-full max-w-md py-3.5 sm:py-4.5 rounded-full btn-tactile-light anim-shimmer text-[#1C3B24] font-black text-base sm:text-xl tracking-wider select-none uppercase shadow-lg"
            >
              COMEÇAR
            </motion.button>
          </div>
        </div>
      </ZoomContent>
    </div>
  );
}

