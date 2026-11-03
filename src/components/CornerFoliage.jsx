import React from 'react';
import { motion } from 'framer-motion';

export default function CornerFoliage({ corners = ['top-left', 'top-right'] }) {
  const showBottomLeft = corners.includes('bottom-left');
  const showBottomRight = corners.includes('bottom-right');
  const showTopLeft = corners.includes('top-left');
  const showTopRight = corners.includes('top-right');

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
      {/* ============================================================== */}
      {/* 1. TOP-LEFT FAN (Leque no canto superior esquerdo - 3 FOLHAS)   */}
      {/* As 3 folhas aparecem nítidas e abertas em leque botânico,       */}
      {/* com o talinho cortado logo na borda externa.                    */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none">
          {/* Folha 1: Superior (105°) */}
          <div 
            className="absolute -top-[102px] -left-[45px] w-[70px] h-[92px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [105, 100, 105]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha 3: Lateral (165°) */}
          <div 
            className="absolute -top-[102px] -left-[45px] w-[70px] h-[92px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [165, 170, 165]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha 2: Central diagonal (135° - em destaque no centro) */}
          <div 
            className="absolute -top-[112px] -left-[49px] w-[78px] h-[102px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [135, 138, 135]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.08, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TOP-RIGHT FAN (Leque no canto superior direito - ESPELHO)    */}
      {/* Espelho horizontal exato (scaleX: -1) mostrando 3 folhas       */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none">
          {/* Folha 1: Superior (espelho de 105°) */}
          <div 
            className="absolute -top-[102px] -right-[45px] w-[70px] h-[92px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [105, 100, 105]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha 3: Lateral (espelho de 165°) */}
          <div 
            className="absolute -top-[102px] -right-[45px] w-[70px] h-[92px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [165, 170, 165]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha 2: Central diagonal (espelho de 135°) */}
          <div 
            className="absolute -top-[112px] -right-[49px] w-[78px] h-[102px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [135, 138, 135]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.08, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. BOTTOM-LEFT FAN (Leque no canto inferior esquerdo - 3 FOLHAS)*/}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none">
          {/* Haste lateral esquerda (18°) */}
          <div 
            className="absolute -bottom-4 -left-[40px] w-[70px] h-[90px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [18, 12, 18]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste inferior (72°) */}
          <div 
            className="absolute -bottom-4 -left-[40px] w-[70px] h-[90px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [72, 78, 72]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste central diagonal (45° - em destaque) */}
          <div 
            className="absolute -bottom-4 -left-[40px] w-[76px] h-[98px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [45, 48, 45]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.1, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. BOTTOM-RIGHT FAN (Leque no canto inferior direito - ESPELHO) */}
      {/* ============================================================== */}
      {showBottomRight && (
        <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none">
          {/* Haste lateral direita (espelho de 18°) */}
          <div 
            className="absolute -bottom-4 -right-[40px] w-[70px] h-[90px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [18, 12, 18]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste inferior (espelho de 72°) */}
          <div 
            className="absolute -bottom-4 -right-[40px] w-[70px] h-[90px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [72, 78, 72]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste central diagonal (espelho de 45°) */}
          <div 
            className="absolute -bottom-4 -right-[40px] w-[76px] h-[98px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [45, 48, 45]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.1, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
