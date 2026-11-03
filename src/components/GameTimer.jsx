import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function GameTimer({ secondsLeft = 60, className = '' }) {
  const safeSeconds = Math.max(0, secondsLeft);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const isUrgent = safeSeconds <= 10;
  const isWarning = safeSeconds <= 20 && !isUrgent;

  return (
    <motion.div
      animate={
        isUrgent
          ? { scale: [1, 1.06, 1] }
          : {}
      }
      transition={{ repeat: Infinity, duration: 0.8 }}
      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-black tracking-wider shadow-sm select-none border transition-colors ${
        isUrgent
          ? 'bg-red-500 text-white border-red-600 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
          : isWarning
          ? 'bg-amber-500 text-white border-amber-600'
          : 'bg-[#FAF5EC]/95 text-[#1C3B24] border-white/80'
      } ${className}`}
    >
      <Clock
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] ${isUrgent ? 'animate-pulse text-white' : 'text-[#1C3B24]'}`}
      />
      <span className="font-mono font-bold tracking-widest">{formatted}</span>
    </motion.div>
  );
}

