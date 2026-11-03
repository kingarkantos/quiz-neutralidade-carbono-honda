import React from 'react';
import { motion } from 'framer-motion';

export default function CornerFoliage({ corners = ['top-left', 'top-right'] }) {
  const showBottomLeft = corners.includes('bottom-left');
  const showBottomRight = corners.includes('bottom-right');
  const showTopLeft = corners.includes('top-left');
  const showTopRight = corners.includes('top-right');

  // Leaf dimensions:
  // Base size: 70px width x 92px height (center leaf: 76px x 100px)
  // In folha.png, stem is at bottom-center: (50%, 100%).

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* ============================================================== */}
      {/* 1. TOP-LEFT FAN (Leque no canto superior esquerdo)               */}
      {/* Hastes convergem no vértice superior esquerdo, apontando para  */}
      {/* dentro da tela (para baixo e para a direita).                   */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none">
          {/* Haste 1: Folha próxima ao topo (115°) */}
          <div 
            className="absolute -top-[86px] -left-[31px] w-[68px] h-[90px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.99, 0.93],
                rotate: [115, 109, 115]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 3: Folha lateral esquerda (160°) */}
          <div 
            className="absolute -top-[86px] -left-[31px] w-[68px] h-[90px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.99, 0.93],
                rotate: [160, 166, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 2: Folha central diagonal (138° - em destaque no meio) */}
          <div 
            className="absolute -top-[94px] -left-[35px] w-[76px] h-[100px] z-10"
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
      {/* Espelho horizontal exato (scaleX: -1) do leque superior esquerdo */}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none">
          {/* Haste 1: Folha próxima ao topo (espelho) */}
          <div 
            className="absolute -top-[86px] -right-[31px] w-[68px] h-[90px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.99, 0.93],
                rotate: [115, 109, 115]
              }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 3: Folha lateral direita (espelho) */}
          <div 
            className="absolute -top-[86px] -right-[31px] w-[68px] h-[90px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha leque"
              animate={{
                scale: [0.93, 0.99, 0.93],
                rotate: [160, 166, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.2, delay: 0.15, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Haste 2: Folha central diagonal (espelho) */}
          <div 
            className="absolute -top-[94px] -right-[35px] w-[76px] h-[100px] z-10"
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
      {/* Aprovado pelo usuário ("esse ficou bom")                        */}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-48 h-48 pointer-events-none">
          {/* Haste lateral esquerda (20°) */}
          <div 
            className="absolute -bottom-2 -left-[35px] w-[68px] h-[88px]"
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
            className="absolute -bottom-2 -left-[35px] w-[68px] h-[88px]"
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
            className="absolute -bottom-2 -left-[35px] w-[74px] h-[96px] z-10"
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
      {/* Espelho horizontal exato (scaleX: -1) do leque inferior esquerdo*/}
      {/* ============================================================== */}
      {showBottomRight && (
        <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none">
          {/* Haste lateral direita (espelho de 20°) */}
          <div 
            className="absolute -bottom-2 -right-[35px] w-[68px] h-[88px]"
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
            className="absolute -bottom-2 -right-[35px] w-[68px] h-[88px]"
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
            className="absolute -bottom-2 -right-[35px] w-[74px] h-[96px] z-10"
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
