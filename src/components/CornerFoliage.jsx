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
      {/* 1. TOP-LEFT FAN (Leque botânico de 3 folhas no canto superior)  */}
      {/* Deslocado ligeiramente para a esquerda/topo para eliminar o      */}
      {/* vão de fundo e esconder qualquer vestígio de talo.              */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-44 h-44 pointer-events-none">
          {/* Folha 1: Superior (110°) */}
          <div 
            className="absolute -top-[104px] -left-[50px] w-[68px] h-[90px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [110, 106, 110]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Folha 3: Lateral (160°) */}
          <div 
            className="absolute -top-[104px] -left-[50px] w-[68px] h-[90px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [160, 164, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Folha 2: Central diagonal (135° - em destaque à frente) */}
          <div 
            className="absolute -top-[112px] -left-[53px] w-[74px] h-[98px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [135, 138, 135]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.08, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TOP-RIGHT FAN (Leque superior direito - ESPELHO EXATO)       */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none">
          {/* Folha 1: Superior (espelho de 110°) */}
          <div 
            className="absolute -top-[104px] -right-[50px] w-[68px] h-[90px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [110, 106, 110]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Folha 3: Lateral (espelho de 160°) */}
          <div 
            className="absolute -top-[104px] -right-[50px] w-[68px] h-[90px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [160, 164, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Folha 2: Central diagonal (espelho de 135° - à frente) */}
          <div 
            className="absolute -top-[112px] -right-[53px] w-[74px] h-[98px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [135, 138, 135]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.08, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. BOTTOM-LEFT FAN (Leque no canto inferior esquerdo - 3 FOLHAS)*/}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-44 h-44 pointer-events-none">
          {/* Haste lateral esquerda (20°) */}
          <div 
            className="absolute -bottom-4 -left-[42px] w-[68px] h-[88px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [20, 14, 20]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste inferior (70°) */}
          <div 
            className="absolute -bottom-4 -left-[42px] w-[68px] h-[88px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [70, 76, 70]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste central diagonal (45° - em destaque à frente) */}
          <div 
            className="absolute -bottom-4 -left-[42px] w-[74px] h-[96px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
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
        <div className="absolute bottom-0 right-0 w-44 h-44 pointer-events-none">
          {/* Haste lateral direita (espelho de 20°) */}
          <div 
            className="absolute -bottom-4 -right-[42px] w-[68px] h-[88px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [20, 14, 20]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste inferior (espelho de 70°) */}
          <div 
            className="absolute -bottom-4 -right-[42px] w-[68px] h-[88px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [70, 76, 70]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste central diagonal (espelho de 45° - à frente) */}
          <div 
            className="absolute -bottom-4 -right-[42px] w-[74px] h-[96px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.webp"
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
