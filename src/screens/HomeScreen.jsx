import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CornerFoliage from '../components/CornerFoliage';

export default function HomeScreen({ onStart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb]">
      {/* Background Image: Motorcycle + scenic bridge (slice-home.png) */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-home.png')` }}
      />

      {/* Discreet Bush Foliage in Bottom Corners */}
      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Top Area: Header + 3D Logo + Subtitle (Positioned high in the solid beige sky) */}
      <div className="relative z-10 w-full flex flex-col items-center pt-1">
        {/* Top Header */}
        <Header />

        {/* Title and Subtitle - Anchored comfortably in the upper beige sky */}
        <div className="w-full flex flex-col items-center text-center px-6 pt-1 sm:pt-2 max-w-lg mx-auto">
          {/* Animated Quiz 3D Title with Bounce & Passing Shimmer Shine */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 18, 
              delay: 0.2 
            }}
            className="w-full flex justify-center mb-2 sm:mb-3 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative rounded-3xl anim-logo-shine">
              <motion.img
                animate={{ 
                  y: [0, -6, 0],
                  rotate: [0, 0.4, 0, -0.4, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                src="/assets/logos/quiz-logo.png"
                alt="Quiz Neutralidade de Carbono"
                className="w-full max-w-[380px] sm:max-w-[420px] drop-shadow-xl select-none pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Subtitle - High in the solid sky with crisp contrast */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#1E2D1D] font-bold text-base sm:text-lg leading-relaxed max-w-sm drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] select-none"
          >
            Descubra como pequenas atitudes podem mover um futuro melhor.
          </motion.p>
        </div>
      </div>

      {/* Bottom Button Area with Shimmer Beam Passing Through */}
      <div className="relative z-10 w-full px-8 pb-12 pt-4 flex justify-center max-w-md mx-auto">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20, 
            delay: 0.5 
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="w-full py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-xl sm:text-2xl tracking-wider select-none uppercase shadow-2xl"
        >
          INICIAR QUIZ
        </motion.button>
      </div>
    </div>
  );
}
