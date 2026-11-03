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
      {/* 1. TOP-LEFT FAN (Leque no canto superior esquerdo)               */}
      {/* O talo fica para fora da tela (cortado), mostrando as folhas    */}
      {/* brotando com naturalidade a partir do canto externo.            */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-52 h-52 pointer-events-none">
          {/* Haste 1: Folha próxima ao topo (115°) */}
          <div 
            className="absolute -top-[108px] -left-[54px] w-[78px] h-[104px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [115, 109, 115]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 3: Folha lateral esquerda (160°) */}
          <div 
            className="absolute -top-[108px] -left-[54px] w-[78px] h-[104px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [160, 166, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 2: Folha central diagonal (138° - em destaque) */}
          <div 
            className="absolute -top-[118px] -left-[58px] w-[86px] h-[116px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [138, 142, 138]
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
      {/* Espelho horizontal exato (scaleX: -1) com talo fora da tela     */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none">
          {/* Haste 1: Folha próxima ao topo (espelho) */}
          <div 
            className="absolute -top-[108px] -right-[54px] w-[78px] h-[104px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [115, 109, 115]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 3: Folha lateral direita (espelho) */}
          <div 
            className="absolute -top-[108px] -right-[54px] w-[78px] h-[104px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [160, 166, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 2: Folha central diagonal (espelho) */}
          <div 
            className="absolute -top-[118px] -right-[58px] w-[86px] h-[116px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [1.02, 1.08, 1.02],
                rotate: [138, 142, 138]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.08, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. BOTTOM-LEFT FAN (Leque no canto inferior esquerdo)           */}
      {/* Talo discretamente fora da tela                                */}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-52 h-52 pointer-events-none">
          {/* Haste lateral esquerda (20°) */}
          <div 
            className="absolute -bottom-5 -left-[45px] w-[74px] h-[96px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
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
            className="absolute -bottom-5 -left-[45px] w-[74px] h-[96px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
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

          {/* Haste central diagonal (45° - em destaque) */}
          <div 
            className="absolute -bottom-5 -left-[45px] w-[80px] h-[104px] z-10"
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
        <div className="absolute bottom-0 right-0 w-52 h-52 pointer-events-none">
          {/* Haste lateral direita (espelho de 20°) */}
          <div 
            className="absolute -bottom-5 -right-[45px] w-[74px] h-[96px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
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
            className="absolute -bottom-5 -right-[45px] w-[74px] h-[96px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
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

          {/* Haste central diagonal (espelho de 45°) */}
          <div 
            className="absolute -bottom-5 -right-[45px] w-[80px] h-[104px] z-10"
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
