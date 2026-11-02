import React from 'react';
import { motion } from 'framer-motion';

export default function CornerFoliage({ corners = ['top-left', 'top-right'] }) {
  const showBottomLeft = corners.includes('bottom-left');
  const showBottomRight = corners.includes('bottom-right');
  const showTopLeft = corners.includes('top-left');
  const showTopRight = corners.includes('top-right');

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none overflow-visible">
      {/* ============================================================== */}
      {/* TOP-LEFT FAN (LEQUE DE 3 FOLHAS NO CANTO SUPERIOR ESQUERDO)     */}
      {/* Todas as 3 folhas saem do mesmo vértice (0,0) em leque de 30°   */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none">
          {/* Folha 1 do leque: Haste superior (108°) */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.92, 0.98, 0.92],
              opacity: 0.9,
              rotate: [108, 102, 108]
            }}
            transition={{
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
              default: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            className="absolute top-0 left-0 w-16 h-20 sm:w-18 sm:h-24 object-contain origin-top-left drop-shadow-sm"
          />

          {/* Folha 3 do leque: Haste inferior (168°) */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.92, 0.98, 0.92],
              opacity: 0.9,
              rotate: [168, 174, 168]
            }}
            transition={{
              scale: { duration: 0.4, delay: 0.1 },
              opacity: { duration: 0.3, delay: 0.1 },
              rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
              default: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            className="absolute top-0 left-0 w-16 h-20 sm:w-18 sm:h-24 object-contain origin-top-left drop-shadow-sm"
          />

          {/* Folha 2 do leque: Haste central diagonal (138° - Destaque em cima das outras) */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1.02, 1.1, 1.02],
              opacity: 1,
              rotate: [138, 141, 138]
            }}
            transition={{
              scale: { duration: 0.45, delay: 0.05 },
              opacity: { duration: 0.3, delay: 0.05 },
              rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
              default: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            className="absolute top-0 left-0 w-18 h-22 sm:w-21 sm:h-26 object-contain origin-top-left drop-shadow-lg z-10"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* TOP-RIGHT FAN (LEQUE DE 3 FOLHAS NO CANTO SUPERIOR DIREITO)     */}
      {/* Espelhado simetricamente a partir do vértice (top-0, right-0)    */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none">
          {/* Folha 1 do leque: Haste superior (-108°) */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.92, 0.98, 0.92],
              opacity: 0.9,
              rotate: [-108, -102, -108]
            }}
            transition={{
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
              default: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-0 right-0 w-16 h-20 sm:w-18 sm:h-24 object-contain origin-top-right drop-shadow-sm"
          />

          {/* Folha 3 do leque: Haste inferior (-168°) */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.92, 0.98, 0.92],
              opacity: 0.9,
              rotate: [-168, -174, -168]
            }}
            transition={{
              scale: { duration: 0.4, delay: 0.1 },
              opacity: { duration: 0.3, delay: 0.1 },
              rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
              default: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-0 right-0 w-16 h-20 sm:w-18 sm:h-24 object-contain origin-top-right drop-shadow-sm"
          />

          {/* Folha 2 do leque: Haste central diagonal (-138° - Destaque em cima) */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1.02, 1.1, 1.02],
              opacity: 1,
              rotate: [-138, -141, -138]
            }}
            transition={{
              scale: { duration: 0.45, delay: 0.05 },
              opacity: { duration: 0.3, delay: 0.05 },
              rotate: { repeat: Infinity, duration: 4.2, ease: "easeInOut" },
              default: { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-0 right-0 w-18 h-22 sm:w-21 sm:h-26 object-contain origin-top-right drop-shadow-lg z-10"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM-LEFT FAN (LEQUE NO CANTO INFERIOR ESQUERDO)             */}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-36 sm:h-36 pointer-events-none">
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            animate={{
              scale: [0.92, 0.98, 0.92],
              rotate: [-15, -10, -15]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-15 h-18 sm:w-17 sm:h-20 object-contain origin-bottom-left drop-shadow-sm opacity-90"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            animate={{
              scale: [0.92, 0.98, 0.92],
              rotate: [45, 50, 45]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-15 h-18 sm:w-17 sm:h-20 object-contain origin-bottom-left drop-shadow-sm opacity-90"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            animate={{
              scale: [1.02, 1.08, 1.02],
              rotate: [15, 20, 15]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-16 h-20 sm:w-19 sm:h-22 object-contain origin-bottom-left drop-shadow-md z-10"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM-RIGHT FAN (LEQUE NO CANTO INFERIOR DIREITO)            */}
      {/* ============================================================== */}
      {showBottomRight && (
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-36 sm:h-36 pointer-events-none">
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            animate={{
              scale: [0.92, 0.98, 0.92],
              rotate: [15, 10, 15]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-0 right-0 w-15 h-18 sm:w-17 sm:h-20 object-contain origin-bottom-right drop-shadow-sm opacity-90"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            animate={{
              scale: [0.92, 0.98, 0.92],
              rotate: [-45, -50, -45]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-0 right-0 w-15 h-18 sm:w-17 sm:h-20 object-contain origin-bottom-right drop-shadow-sm opacity-90"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha leque"
            animate={{
              scale: [1.02, 1.08, 1.02],
              rotate: [-15, -20, -15]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-0 right-0 w-16 h-20 sm:w-19 sm:h-22 object-contain origin-bottom-right drop-shadow-md z-10"
          />
        </div>
      )}
    </div>
  );
}
