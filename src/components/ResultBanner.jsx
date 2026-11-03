import React from 'react';
import { motion } from 'framer-motion';

export default function ResultBanner({ type = 'correct', text = '' }) {
  const isCorrect = type === 'correct';
  const isWrong = type === 'wrong' || type === 'incorrect';
  const isResult = type === 'result';

  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotate: isCorrect ? -3 : 3 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 380, 
        damping: 18,
        bounce: 0.6 
      }}
      className="relative my-2 sm:my-3 flex items-center justify-center z-10"
    >
      {/* 3D Plaque Image: ACERTOU! (Exact mockup cutout - cleaned) */}
      {isCorrect && !text && (
        <motion.img
          src="/assets/elements/banner-acertou.png?v=2"
          alt="ACERTOU!"
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -2, 0]
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain drop-shadow-xl select-none pointer-events-none"
        />
      )}

      {/* 3D Plaque Image: QUASE LÁ! (Exact mockup cutout - cleaned) */}
      {isWrong && !text && (
        <motion.img
          src="/assets/elements/banner-quase-la.png?v=2"
          alt="QUASE LÁ!"
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -2, 0]
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain drop-shadow-xl select-none pointer-events-none"
        />
      )}

      {/* Fallback for RESULTADO FINAL or custom text */}
      {(isResult || text) && (
        <div className={`px-8 py-3 rounded-2xl min-w-[280px] sm:min-w-[320px] text-center ${isCorrect || isResult ? 'banner-wood-green' : 'banner-wood-grey'}`}>
          <h2 className="text-3xl sm:text-4xl font-black tracking-wider text-3d-wood uppercase select-none">
            {text || 'RESULTADO FINAL'}
          </h2>
        </div>
      )}
    </motion.div>
  );
}
