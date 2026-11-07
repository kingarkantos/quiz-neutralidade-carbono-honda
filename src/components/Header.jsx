import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ 
  className = '', 
  showTriplaAcao = false 
}) {
  return (
    <header className={`relative w-full flex items-center justify-center px-5 sm:px-6 pt-4 pb-2 z-40 ${className}`}>
      {/* Center: Honda Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-40 flex items-center justify-center p-0.5"
      >
        <img
          src="/assets/logos/honda.svg"
          alt="Honda"
          className="h-9 sm:h-11 w-auto max-w-[120px] object-contain drop-shadow-sm select-none pointer-events-none"
        />
      </motion.div>

      {/* Right: Tripla Ação Para o Zero Logo (se explicitamente habilitado) */}
      {showTriplaAcao && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="absolute right-5 sm:right-6 top-4 z-40 flex items-center"
        >
          <img
            src="/assets/logos/tripla-acao.webp"
            alt="Tripla Ação Para o Zero"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-md select-none pointer-events-none"
          />
        </motion.div>
      )}
    </header>
  );
}

