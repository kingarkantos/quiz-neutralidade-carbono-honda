import React from 'react';
import { motion } from 'framer-motion';

export default function CornerFoliage({ corners = ['bottom-left', 'bottom-right'] }) {
  const showBottomLeft = corners.includes('bottom-left');
  const showBottomRight = corners.includes('bottom-right');

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
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
