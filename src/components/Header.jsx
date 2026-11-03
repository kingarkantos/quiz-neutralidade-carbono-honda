import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ 
  className = '', 
  showTriplaAcao = true, 
  showMenuButton = true 
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHub = location.pathname === '/' || location.pathname === '';

  return (
    <header className={`relative w-full flex items-center justify-between px-5 sm:px-6 pt-4 pb-2 z-40 ${className}`}>
      {/* Left: Honda Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-40 flex items-center cursor-pointer"
        onClick={() => !isHub && navigate('/')}
        title={isHub ? "Honda" : "Voltar ao Menu Principal"}
      >
        <img
          src="/assets/logos/honda.png"
          alt="Honda - The Power of Dreams"
          className="h-8 sm:h-10 object-contain drop-shadow-md select-none pointer-events-none"
        />
      </motion.div>

      {/* Center: Optional Discreet Hub/Menu Button if inside a game */}
      {showMenuButton && !isHub && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="relative z-40 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#1C3B24] font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm flex items-center space-x-1 border border-[#1C3B24]/15 backdrop-blur-sm transition-all"
        >
          <LayoutGrid className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>JOGOS</span>
        </motion.button>
      )}

      {/* Right: Tripla Ação Para o Zero Logo */}
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
            className="h-7 sm:h-9 object-contain drop-shadow-md select-none pointer-events-none"
          />
        </motion.div>
      ) : (
        <div className="w-1" />
      )}
    </header>
  );
}

