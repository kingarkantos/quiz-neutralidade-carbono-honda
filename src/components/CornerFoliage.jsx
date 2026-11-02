import React from 'react';
import { motion } from 'framer-motion';

export default function CornerFoliage({ corners = ['bottom-left', 'bottom-right'] }) {
  const showBottomLeft = corners.includes('bottom-left');
  const showBottomRight = corners.includes('bottom-right');
  const showTopLeft = corners.includes('top-left');
  const showTopRight = corners.includes('top-right');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
      {/* TOP-LEFT BUSH CLUSTER (3 Leaves hanging into top-left corner) */}
      {showTopLeft && (
        <div className="absolute -top-3 -left-3 w-28 h-28 sm:w-32 sm:h-32 origin-top-left pointer-events-none z-10">
          {/* Leaf 1: Back leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo esquerda"
            animate={{
              rotate: [120, 110, 120],
              scale: [1, 1.05, 1],
              x: [0, 2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.6,
              ease: "easeInOut"
            }}
            className="absolute top-2 left-1 w-14 h-14 sm:w-16 sm:h-16 object-contain origin-top-left drop-shadow-sm opacity-90"
          />

          {/* Leaf 2: Center leaf pointing down-right */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo esquerda"
            animate={{
              rotate: [142, 150, 142],
              scale: [1.02, 1.08, 1.02],
              y: [0, 3, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.8,
              delay: 0.3,
              ease: "easeInOut"
            }}
            className="absolute top-4 left-4 w-15 h-15 sm:w-17 sm:h-17 object-contain origin-top-left drop-shadow-md"
          />

          {/* Leaf 3: Front accent leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo esquerda"
            animate={{
              rotate: [95, 87, 95],
              scale: [0.95, 1.03, 0.95]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.2,
              delay: 0.6,
              ease: "easeInOut"
            }}
            className="absolute top-1 left-5 w-12 h-12 sm:w-14 sm:h-14 object-contain origin-top-left drop-shadow-sm"
          />
        </div>
      )}

      {/* TOP-RIGHT BUSH CLUSTER (3 Leaves hanging into top-right corner) */}
      {showTopRight && (
        <div className="absolute -top-3 -right-3 w-28 h-28 sm:w-32 sm:h-32 origin-top-right pointer-events-none z-10">
          {/* Leaf 1: Back leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo direita"
            animate={{
              rotate: [-120, -110, -120],
              scale: [1, 1.05, 1],
              x: [0, -2, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              delay: 0.2,
              ease: "easeInOut"
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-2 right-1 w-14 h-14 sm:w-16 sm:h-16 object-contain origin-top-right drop-shadow-sm opacity-90"
          />

          {/* Leaf 2: Center leaf pointing down-left */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo direita"
            animate={{
              rotate: [-142, -150, -142],
              scale: [1.02, 1.08, 1.02],
              y: [0, 3, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.0,
              delay: 0.5,
              ease: "easeInOut"
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-4 right-4 w-15 h-15 sm:w-17 sm:h-17 object-contain origin-top-right drop-shadow-md"
          />

          {/* Leaf 3: Front accent leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha topo direita"
            animate={{
              rotate: [-95, -87, -95],
              scale: [0.95, 1.03, 0.95]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.3,
              delay: 0.8,
              ease: "easeInOut"
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute top-1 right-5 w-12 h-12 sm:w-14 sm:h-14 object-contain origin-top-right drop-shadow-sm"
          />
        </div>
      )}

      {/* BOTTOM-LEFT BUSH (Discreet corner accent) */}
      {showBottomLeft && (
        <div className="absolute -bottom-3 -left-3 w-24 h-24 sm:w-28 sm:h-28 origin-bottom-left pointer-events-none">
          {/* Leaf 1: Back leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [-20, -12, -20],
              scale: [1, 1.05, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.8,
              ease: "easeInOut"
            }}
            className="absolute bottom-2 left-1 w-14 h-14 sm:w-16 sm:h-16 object-contain origin-bottom-left drop-shadow-sm opacity-90"
          />

          {/* Leaf 2: Center leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [20, 28, 20],
              scale: [1.02, 1.07, 1.02]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.0,
              delay: 0.3,
              ease: "easeInOut"
            }}
            className="absolute bottom-3 left-3 w-14 h-14 sm:w-16 sm:h-16 object-contain origin-bottom-left drop-shadow-md"
          />

          {/* Leaf 3: Front leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [0, -8, 0],
              scale: [0.95, 1.03, 0.95]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.4,
              delay: 0.7,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-5 w-12 h-12 sm:w-14 sm:h-14 object-contain origin-bottom-left drop-shadow-sm"
          />
        </div>
      )}

      {/* BOTTOM-RIGHT BUSH (Discreet corner accent) */}
      {showBottomRight && (
        <div className="absolute -bottom-3 -right-3 w-24 h-24 sm:w-28 sm:h-28 origin-bottom-right pointer-events-none">
          {/* Leaf 1: Back leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [20, 12, 20],
              scale: [1, 1.05, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.6,
              delay: 0.2,
              ease: "easeInOut"
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-2 right-1 w-14 h-14 sm:w-16 sm:h-16 object-contain origin-bottom-right drop-shadow-sm opacity-90"
          />

          {/* Leaf 2: Center leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [-20, -28, -20],
              scale: [1.02, 1.07, 1.02]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.2,
              delay: 0.5,
              ease: "easeInOut"
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-3 right-3 w-14 h-14 sm:w-16 sm:h-16 object-contain origin-bottom-right drop-shadow-md"
          />

          {/* Leaf 3: Front leaf */}
          <motion.img
            src="/assets/elements/folha.png"
            alt="Folha canto"
            animate={{
              rotate: [0, 8, 0],
              scale: [0.95, 1.03, 0.95]
            }}
            transition={{
              repeat: Infinity,
              duration: 4.5,
              delay: 0.8,
              ease: "easeInOut"
            }}
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-0 right-5 w-12 h-12 sm:w-14 sm:h-14 object-contain origin-bottom-right drop-shadow-sm"
          />
        </div>
      )}
    </div>
  );
}
