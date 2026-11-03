import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MemoriaMatchModal({ card, onClose, isLast }) {
  if (!card) return null;

  useEffect(() => {
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.4 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC'],
      disableForReducedMotion: true
    });
  }, []);

  const isRenovavel = card.type === 'Renovável';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="relative w-full max-w-sm sm:max-w-md bg-[#FAF5EC] rounded-[28px] p-4 sm:p-5 shadow-2xl border-2 border-white flex flex-col items-center text-center overflow-hidden max-h-[92vh] overflow-y-auto"
        >
          {/* Top Green Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#2EB85C] text-white px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-md mb-2">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>PAR ENCONTRADO!</span>
          </div>

          {/* Energy Title */}
          <h2 className="text-[#1A2E1A] font-black text-xl sm:text-2xl uppercase tracking-tight mt-0.5">
            {card.name}
          </h2>

          {/* Type Tag (Renovável / Não renovável) */}
          <div className="my-1">
            <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
              isRenovavel 
                ? 'bg-[#2EB85C]/18 text-[#1b7e3b] border border-[#2EB85C]/30' 
                : 'bg-[#d97706]/18 text-[#b45309] border border-[#d97706]/30'
            }`}>
              {card.type}
            </span>
          </div>

          {/* Photo */}
          <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden bg-[#E5DAC6] my-2 shadow-inner border border-white">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </div>

          {/* Box 1: O que é? */}
          <div className="w-full bg-white/70 rounded-2xl p-2.5 sm:p-3 my-1 border border-[#E5DAC6] text-center">
            <span className="inline-block bg-[#1C3B24] text-white text-[10px] sm:text-xs font-black uppercase px-3 py-0.5 rounded-full mb-1">
              O que é?
            </span>
            <p className="text-[#1A2E1A] font-medium text-xs sm:text-sm leading-relaxed px-1">
              {card.whatIs}
            </p>
          </div>

          {/* Box 2: Você sabia? */}
          <div className="w-full bg-[#E9E4DC] rounded-2xl p-2.5 sm:p-3 my-1 border border-[#D5CDBF] text-center">
            <span className="inline-block bg-[#6B7280] text-white text-[10px] sm:text-xs font-black uppercase px-3 py-0.5 rounded-full mb-1">
              Você sabia?
            </span>
            <p className="text-[#374151] font-medium text-xs sm:text-sm leading-relaxed px-1">
              {card.didYouKnow}
            </p>
          </div>

          {/* Button */}
          <div className="w-full pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-3.5 sm:py-4 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>{isLast ? 'FINALIZAR RODADA' : 'CONTINUAR JOGANDO'}</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

