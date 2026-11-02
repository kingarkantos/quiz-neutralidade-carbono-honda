import React from 'react';
import { motion } from 'framer-motion';

export default function ResultBanner({ type = 'correct', text = '' }) {
  const isCorrect = type === 'correct';
  const isResult = type === 'result';

  const defaultText = isResult 
    ? 'RESULTADO FINAL' 
    : isCorrect 
      ? 'ACERTOU!' 
      : 'QUASE LÁ!';

  const displayText = text || defaultText;

  const bgStyle = (isCorrect || isResult)
    ? 'banner-wood-green'
    : 'banner-wood-grey';

  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotate: isCorrect ? -4 : 4 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 380, 
        damping: 18,
        bounce: 0.6 
      }}
      className="relative my-3 flex items-center justify-center z-10"
    >
      <div className={`px-8 py-3 rounded-2xl min-w-[280px] sm:min-w-[320px] text-center ${bgStyle}`}>
        <h2 className="text-3xl sm:text-4xl font-black tracking-wider text-3d-wood uppercase select-none">
          {displayText}
        </h2>
      </div>
    </motion.div>
  );
}

