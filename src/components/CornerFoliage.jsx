import React from 'react';
import { motion } from 'framer-motion';

export default function CornerFoliage({ corners = ['bottom-left', 'bottom-right'] }) {
  const showBottomLeft = corners.includes('bottom-left');
  const showBottomRight = corners.includes('bottom-right');
  const showTopLeft = corners.includes('top-left');
  const showTopRight = corners.includes('top-right');

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none">
      {/* ============================================================== */}
      {/* TOP-LEFT BUSH CLUSTER (3 Leaves pointing down into screen)       */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-36 h-36 sm:w-40 sm:h-40 pointer-events-none">
          {/* Leaf 1: Back leaf peeking down-right */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo esquerda"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: 0.95,
              rotate: [125, 115, 125],
              x: [0, 3, 0],
              y: [0, 3, 0]
            }}
            transition={{
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
            }}
            className="absolute top-0 left-0 w-18 h-18 sm:w-20 sm:h-20 object-contain drop-shadow-md"
          />

          {/* Leaf 2: Center leaf reaching further down-right */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo esquerda"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1.02, 1.08, 1.02],
              opacity: 1,
              rotate: [145, 155, 145],
              x: [0, 4, 0],
              y: [0, 4, 0]
            }}
            transition={{
              scale: { duration: 0.5, delay: 0.1 },
              opacity: { duration: 0.3, delay: 0.1 },
              rotate: { repeat: Infinity, duration: 3.8, delay: 0.2, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 3.8, delay: 0.2, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 3.8, delay: 0.2, ease: "easeInOut" }
            }}
            className="absolute top-4 left-6 sm:left-8 w-18 h-18 sm:w-22 sm:h-22 object-contain drop-shadow-lg"
          />

          {/* Leaf 3: Front accent leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo esquerda"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.95, 1.04, 0.95],
              opacity: 1,
              rotate: [95, 85, 95],
              x: [0, 2, 0]
            }}
            transition={{
              scale: { duration: 0.4, delay: 0.2 },
              opacity: { duration: 0.3, delay: 0.2 },
              rotate: { repeat: Infinity, duration: 4.2, delay: 0.5, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 4.2, delay: 0.5, ease: "easeInOut" }
            }}
            className="absolute top-8 left-0 sm:top-10 sm:left-1 w-15 h-15 sm:w-17 sm:h-17 object-contain drop-shadow-md"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* TOP-RIGHT BUSH CLUSTER (3 Leaves pointing down into screen)      */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-36 h-36 sm:w-40 sm:h-40 pointer-events-none">
          {/* Leaf 1: Back leaf peeking down-left */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo direita"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: 0.95,
              rotate: [-125, -115, -125],
              x: [0, -3, 0],
              y: [0, 3, 0]
            }}
            transition={{
              scale: { duration: 0.4 },
              opacity: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 4.6, delay: 0.1, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 4.6, delay: 0.1, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 4.6, delay: 0.1, ease: "easeInOut" }
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-0 right-0 w-18 h-18 sm:w-20 sm:h-20 object-contain drop-shadow-md"
          />

          {/* Leaf 2: Center leaf reaching further down-left */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo direita"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1.02, 1.08, 1.02],
              opacity: 1,
              rotate: [-145, -155, -145],
              x: [0, -4, 0],
              y: [0, 4, 0]
            }}
            transition={{
              scale: { duration: 0.5, delay: 0.15 },
              opacity: { duration: 0.3, delay: 0.15 },
              rotate: { repeat: Infinity, duration: 3.9, delay: 0.3, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 3.9, delay: 0.3, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 3.9, delay: 0.3, ease: "easeInOut" }
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-4 right-6 sm:right-8 w-18 h-18 sm:w-22 sm:h-22 object-contain drop-shadow-lg"
          />

          {/* Leaf 3: Front accent leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo direita"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.95, 1.04, 0.95],
              opacity: 1,
              rotate: [-95, -85, -95],
              x: [0, -2, 0]
            }}
            transition={{
              scale: { duration: 0.4, delay: 0.25 },
              opacity: { duration: 0.3, delay: 0.25 },
              rotate: { repeat: Infinity, duration: 4.4, delay: 0.6, ease: "easeInOut" },
              x: { repeat: Infinity, duration: 4.4, delay: 0.6, ease: "easeInOut" }
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-8 right-0 sm:top-10 sm:right-1 w-15 h-15 sm:w-17 sm:h-17 object-contain drop-shadow-md"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM-LEFT BUSH                                               */}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none">
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [-20, -12, -20],
              scale: [1, 1.05, 1]
            }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
            className="absolute bottom-1 left-0 w-16 h-16 object-contain drop-shadow-sm opacity-90"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [22, 30, 22],
              scale: [1.02, 1.07, 1.02]
            }}
            transition={{ repeat: Infinity, duration: 4.0, delay: 0.3, ease: "easeInOut" }}
            className="absolute bottom-3 left-3 w-16 h-16 object-contain drop-shadow-md"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [0, -8, 0],
              scale: [0.95, 1.03, 0.95]
            }}
            transition={{ repeat: Infinity, duration: 4.4, delay: 0.7, ease: "easeInOut" }}
            className="absolute bottom-0 left-6 w-14 h-14 object-contain drop-shadow-sm"
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* BOTTOM-RIGHT BUSH                                              */}
      {/* ============================================================== */}
      {showBottomRight && (
        <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none">
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [20, 12, 20],
              scale: [1, 1.05, 1]
            }}
            transition={{ repeat: Infinity, duration: 4.6, delay: 0.2, ease: "easeInOut" }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-1 right-0 w-16 h-16 object-contain drop-shadow-sm opacity-90"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [-22, -30, -22],
              scale: [1.02, 1.07, 1.02]
            }}
            transition={{ repeat: Infinity, duration: 4.2, delay: 0.5, ease: "easeInOut" }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-3 right-3 w-16 h-16 object-contain drop-shadow-md"
          />
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [0, 8, 0],
              scale: [0.95, 1.03, 0.95]
            }}
            transition={{ repeat: Infinity, duration: 4.5, delay: 0.8, ease: "easeInOut" }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-0 right-6 w-14 h-14 object-contain drop-shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
