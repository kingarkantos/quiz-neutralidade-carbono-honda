import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ className = '', showTriplaAcao = true }) {
  return (
    <header className={`relative w-full flex items-center justify-between px-6 pt-5 pb-2 z-40 ${className}`}>
      {/* Honda Logo - Always on top of foliage */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-40 flex items-center"
      >
        <img
          src="/assets/logos/honda.png"
          alt="Honda - The Power of Dreams"
          className="h-9 sm:h-11 object-contain drop-shadow-md select-none pointer-events-none"
        />
      </motion.div>

      {/* Tripla Ação Para o Zero Logo - Always on top of foliage */}
      {showTriplaAcao ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="relative z-40 flex items-center"
        >
          <img
            src="/assets/logos/tripla-acao.png"
            alt="Tripla Ação Para o Zero"
            className="h-8 sm:h-10 object-contain drop-shadow-md select-none pointer-events-none"
          />
        </motion.div>
      ) : (
        <div className="w-1" />
      )}
    </header>
  );
}

