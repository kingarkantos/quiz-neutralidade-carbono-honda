import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

export default function LpWrongModal({ onClose }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className="relative w-full max-w-sm bg-[#FAF5EC] rounded-[28px] p-6 shadow-2xl border-2 border-white flex flex-col items-center text-center overflow-hidden"
        >
          {/* Top Red Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#d32f2f] text-white px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-md mb-3">
            <X className="w-4 h-4 stroke-[3]" />
            <span>TENTE NOVAMENTE!</span>
          </div>

          {/* Error Illustration / Icon */}
          <div className="relative w-28 h-28 my-2 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#d32f2f]/15 flex items-center justify-center border-2 border-[#d32f2f]/40">
              <X className="w-10 h-10 text-[#d32f2f] stroke-[2.5]" />
            </div>
          </div>

          <h3 className="text-[#1A2E1A] font-black text-lg sm:text-xl leading-tight mt-1">
            Essa conexão não está correta
          </h3>

          <p className="text-[#556956] font-medium text-xs sm:text-sm leading-relaxed px-3 my-2">
            Observe com atenção a ação selecionada e procure o benefício ambiental direto gerado por ela.
          </p>

          <div className="w-full pt-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full py-3.5 rounded-full btn-tactile-brown text-white font-black text-base tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>TENTAR OUTRA CONEXÃO</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
