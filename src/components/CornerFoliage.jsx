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
      {/* Folhas bem abertas cobrindo totalmente os cantos (sem vãos/gaps) */}
      {/* e afastadas do centro, deixando as logos 100% livres.           */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-52 h-52 pointer-events-none">
          {/* Haste 1: Folha rente à borda superior (85°) - fecha o vão do topo */}
          <div 
            className="absolute -top-[124px] -left-[60px] w-[80px] h-[106px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [85, 80, 85]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 3: Folha rente à borda lateral esquerda (185°) - fecha o vão lateral */}
          <div 
            className="absolute -top-[124px] -left-[60px] w-[80px] h-[106px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [185, 190, 185]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 2: Folha central diagonal (135° - preenche o vértice) */}
          <div 
            className="absolute -top-[132px] -left-[64px] w-[88px] h-[116px] z-10"
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
      {/* Espelho horizontal exato (scaleX: -1) cobrindo todo o canto dir */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-52 h-52 pointer-events-none">
          {/* Haste 1: Folha rente à borda superior (espelho de 85°) */}
          <div 
            className="absolute -top-[124px] -right-[60px] w-[80px] h-[106px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [85, 80, 85]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 3: Folha rente à borda lateral direita (espelho de 185°) */}
          <div 
            className="absolute -top-[124px] -right-[60px] w-[80px] h-[106px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.94, 1.0, 0.94],
                rotate: [185, 190, 185]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 2: Folha central diagonal (espelho de 135°) */}
          <div 
            className="absolute -top-[132px] -right-[64px] w-[88px] h-[116px] z-10"
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
      {/* 3. BOTTOM-LEFT FAN (Leque no canto inferior esquerdo)           */}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-52 h-52 pointer-events-none">
          {/* Haste lateral esquerda (15°) */}
          <div 
            className="absolute -bottom-6 -left-[50px] w-[76px] h-[98px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [15, 10, 15]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste inferior (75°) */}
          <div 
            className="absolute -bottom-6 -left-[50px] w-[76px] h-[98px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [75, 80, 75]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste central diagonal (45° - em destaque) */}
          <div 
            className="absolute -bottom-6 -left-[50px] w-[82px] h-[106px] z-10"
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
          {/* Haste lateral direita (espelho de 15°) */}
          <div 
            className="absolute -bottom-6 -right-[50px] w-[76px] h-[98px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [15, 10, 15]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste inferior (espelho de 75°) */}
          <div 
            className="absolute -bottom-6 -right-[50px] w-[76px] h-[98px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.92, 0.98, 0.92],
                rotate: [75, 80, 75]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-sm opacity-90"
            />
          </div>

          {/* Haste central diagonal (espelho de 45°) */}
          <div 
            className="absolute -bottom-6 -right-[50px] w-[82px] h-[106px] z-10"
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
