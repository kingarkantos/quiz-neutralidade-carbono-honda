import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LpSuccessModal({ item, onClose, isLast }) {
  if (!item) return null;

  React.useEffect(() => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC'],
      disableForReducedMotion: true
    });
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="relative w-full max-w-md bg-[#FAF5EC] rounded-[28px] p-5 sm:p-6 shadow-2xl border-2 border-white flex flex-col items-center text-center overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Top Green Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#2EB85C] text-white px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-md mb-2">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>CONEXÃO CORRETA!</span>
          </div>

          {/* 3D Artwork Render with Glow */}
          <div className="relative w-44 h-36 sm:w-56 sm:h-44 my-1 flex items-center justify-center">
            <div className="absolute w-36 h-36 rounded-full bg-[#3cd426]/30 blur-2xl pointer-events-none" />
            <img
              src={item.modalImage}
              alt={item.headline}
              className="w-full h-full object-contain drop-shadow-xl pointer-events-none select-none"
            />
          </div>

          {/* Headline */}
          <h3 className="text-[#1A2E1A] font-black text-lg sm:text-xl leading-tight mt-1">
            {item.headline}
          </h3>

          {/* Benefit Badge */}
          <div className="my-2 inline-flex items-center justify-center space-x-2 bg-[#2EB85C]/15 px-3.5 py-1.5 rounded-2xl border border-[#2EB85C]/30 max-w-full">
            <img 
              src="/assets/elements/folha.webp" 
              alt="Folha" 
              className="w-4 h-4 object-contain flex-shrink-0" 
            />
            <span className="text-[#1A2E1A] font-extrabold text-xs sm:text-sm text-center leading-snug">
              {item.benefitTitle}
            </span>
          </div>

          {/* Educational Paragraph */}
          <p className="text-[#3b4c3c] font-medium text-xs sm:text-sm leading-relaxed px-2 my-1">
            {item.explanation}
          </p>

          {/* Action Button */}
          <div className="w-full pt-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-3.5 sm:py-4 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>{isLast ? 'VER RESULTADO' : 'CONTINUAR'}</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

