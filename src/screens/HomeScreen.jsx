import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CornerFoliage from '../components/CornerFoliage';
import FallingLeavesMatrix from '../components/FallingLeavesMatrix';

export default function HomeScreen({ onStart }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb]">
      {/* Background Image: Motorcycle + scenic bridge (slice-home.png) */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-home.webp')` }}
      />

      {/* Falling Vector Leaves (Matrix effect falling from sky, passing behind the logo) */}
      <FallingLeavesMatrix count={24} className="absolute top-0 left-0 right-0 h-[56%] overflow-hidden pointer-events-none z-10" />

      {/* Discreet Bush Foliage in Bottom Corners */}
      <CornerFoliage corners={['bottom-left', 'bottom-right']} />

      {/* Top Area: Header + 3D Logo + Subtitle (Moved high into the solid beige sky) */}
      <div className="relative z-30 w-full flex flex-col items-center">
        {/* Top Header */}
        <Header className="pt-3 pb-0" />

        {/* Title and Subtitle - Anchored comfortably in the upper beige sky */}
        <div className="w-full flex flex-col items-center text-center px-6 pt-0 max-w-lg mx-auto">
          {/* Animated Quiz 3D Title with Eco Aura + Organic 3D Float + Masked Sunbeam Shimmer */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: -25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 18, 
              delay: 0.15 
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94, rotate: -0.8 }}
            className="relative w-full flex items-center justify-center mb-1 cursor-pointer select-none"
          >
            {/* 1. Aura de Energia Limpa (Eco Glow Breathing) */}
            <motion.div
              animate={{
                scale: [0.95, 1.18, 0.95],
                opacity: [0.45, 0.78, 0.45]
              }}
              transition={{
                repeat: Infinity,
                duration: 4.2,
                ease: "easeInOut"
              }}
              className="absolute w-72 h-36 sm:w-80 sm:h-44 rounded-full bg-[#3cd426]/40 blur-2xl -z-10 pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1, 1.14, 1],
                opacity: [0.3, 0.65, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 5.0,
                delay: 0.3,
                ease: "easeInOut"
              }}
              className="absolute w-[340px] h-48 sm:w-[390px] sm:h-52 rounded-full bg-[#7FD03F]/30 blur-3xl -z-10 pointer-events-none"
            />

            {/* 2. Container com Flutuação Orgânica 3D (Levitação + Inclinação 3D) */}
            <motion.div
              animate={{ 
                y: [0, -9, 0],
                rotate: [-1.2, 1.2, -1.2],
                scale: [1, 1.025, 1]
              }}
              transition={{
                repeat: Infinity,
                duration: 4.6,
                ease: "easeInOut"
              }}
              className="relative logo-shine-wrapper"
            >
              <img
                src="/assets/logos/quiz-logo.webp"
                alt="Quiz Neutralidade de Carbono"
                className="w-full max-w-[340px] sm:max-w-[380px] drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)] select-none pointer-events-none"
              />
              {/* 3. Feixe Solar que varre exclusivamente os contornos das letras 3D */}
              <div className="absolute inset-0 logo-shine-sweep pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Subtitle - High in the solid sky with crisp contrast */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#1E2D1D] font-extrabold text-sm sm:text-base leading-snug max-w-xs drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)] select-none mt-0.5"
          >
            Descubra como pequenas atitudes podem mover um futuro melhor.
          </motion.p>
        </div>
      </div>

      {/* Bottom Button Area with Shimmer Beam Passing Through */}
      <div className="relative z-10 w-full px-6 sm:px-8 pb-5 sm:pb-8 pt-2 flex justify-center max-w-md mx-auto flex-shrink-0">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20, 
            delay: 0.45 
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="w-full py-4 sm:py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-lg sm:text-2xl tracking-wider select-none uppercase shadow-2xl"
        >
          INICIAR QUIZ
        </motion.button>
      </div>
    </div>
  );
}
