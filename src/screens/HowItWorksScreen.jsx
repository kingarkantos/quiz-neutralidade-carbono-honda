import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CornerFoliage from '../components/CornerFoliage';
import ZoomContent from '../components/ZoomContent';

export default function HowItWorksScreen({ onStart }) {
  const steps = [
    {
      number: 1,
      title: "Responda 3 perguntas",
      text: "sobre neutralidade de carbono e sustentabilidade"
    },
    {
      number: 2,
      title: "A cada acerto",
      text: "o velocímetro avança a zero de emissões"
    },
    {
      number: 3,
      title: "Ao final veja sua pontuação",
      text: "e descubra como você pode fazer a diferença"
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Foliage texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />

      {/* Top Corner Leaves Fan */}
      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-2 px-5 sm:px-6">
        {/* Top Header */}
        <Header />

        {/* Center Content */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-start pt-3 sm:pt-6 px-2 max-w-lg mx-auto w-full">
          {/* "COMO FUNCIONA" Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="bg-[#1C3B24] text-white font-extrabold text-lg sm:text-xl tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg mb-4 sm:mb-6 uppercase select-none"
          >
            COMO FUNCIONA
          </motion.div>

          {/* 3 Step Cards with Staggered Bounce Animation */}
          <div className="w-full space-y-3 sm:space-y-4">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 24, 
                  delay: 0.15 + idx * 0.15 
                }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#faf5ec]/95 backdrop-blur-sm rounded-[20px] sm:rounded-[24px] p-3.5 sm:p-5 shadow-3d-card flex items-center space-x-3.5 sm:space-x-4 border border-white/60"
              >
                {/* Number Circle */}
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#1C3B24] text-white flex-shrink-0 flex items-center justify-center font-black text-xl sm:text-2xl shadow-md">
                  {step.number}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-[#1A2E1A] font-bold text-base sm:text-xl leading-snug">
                    {step.title}
                  </p>
                  <p className="text-[#455A46] text-xs sm:text-base font-medium leading-tight mt-0.5">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Button - Directly below the steps! */}
          <div className="w-full mt-6 sm:mt-8 pb-6 flex justify-center flex-shrink-0">
            <motion.button
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.6 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStart}
              className="w-full max-w-md py-4 sm:py-5 rounded-full btn-tactile-light anim-shimmer text-[#1C3B24] font-black text-lg sm:text-2xl tracking-wider select-none uppercase shadow-lg"
            >
              INICIAR QUIZ
            </motion.button>
          </div>
        </div>
      </ZoomContent>
    </div>
  );
}

