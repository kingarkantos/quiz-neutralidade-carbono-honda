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
      {/* 1. TOP-LEFT CORNER (Inspirado na imagem de referência)          */}
      {/* 3 folhas botânicas generosas que "nascem" de fora da tela:      */}
      {/* - Folha A: brota pela borda superior                            */}
      {/* - Folha B: brota pela borda lateral esquerda                    */}
      {/* - Folha C: folha principal no vértice diagonal, sobrepondo as duas*/}
      {/* Zero talos visíveis; moldura botânica limpa, viva e exuberante. */}
      {/* ============================================================== */}
      {showTopLeft && (
        <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none">
          {/* Folha A: Entra pela borda do TOPO (inclinada ~115°) */}
          <div 
            className="absolute -top-12 left-5 w-[92px] h-[122px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha topo"
              animate={{
                scale: [0.95, 1.0, 0.95],
                rotate: [115, 110, 115]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha B: Entra pela borda LATERAL ESQUERDA (inclinada ~160°) */}
          <div 
            className="absolute top-7 -left-11 w-[92px] h-[122px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha lateral"
              animate={{
                scale: [0.95, 1.0, 0.95],
                rotate: [160, 165, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha C: Folha central no canto diagonal (138° - em destaque à frente) */}
          <div 
            className="absolute -top-8 -left-8 w-[104px] h-[138px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha canto"
              animate={{
                scale: [1.0, 1.06, 1.0],
                rotate: [138, 142, 138]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.1, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TOP-RIGHT CORNER (Espelho exato horizontal do canto esquerdo)*/}
      {/* ============================================================== */}
      {showTopRight && (
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none">
          {/* Folha A: Entra pela borda do TOPO (espelho de 115°) */}
          <div 
            className="absolute -top-12 right-5 w-[92px] h-[122px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha topo"
              animate={{
                scale: [0.95, 1.0, 0.95],
                rotate: [115, 110, 115]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha B: Entra pela borda LATERAL DIREITA (espelho de 160°) */}
          <div 
            className="absolute top-7 -right-11 w-[92px] h-[122px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha lateral"
              animate={{
                scale: [0.95, 1.0, 0.95],
                rotate: [160, 165, 160]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-95"
            />
          </div>

          {/* Folha C: Folha central diagonal (espelho de 138° - à frente) */}
          <div 
            className="absolute -top-8 -right-8 w-[104px] h-[138px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha canto"
              animate={{
                scale: [1.0, 1.06, 1.0],
                rotate: [138, 142, 138]
              }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 0.1, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. BOTTOM-LEFT CORNER (Moldura botânica no canto inferior esq)  */}
      {/* ============================================================== */}
      {showBottomLeft && (
        <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none">
          {/* Folha lateral esquerda (entra pela borda lateral: ~20°) */}
          <div 
            className="absolute bottom-6 -left-10 w-[90px] h-[120px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha lateral"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [20, 15, 20]
              }}
              transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-90"
            />
          </div>

          {/* Folha inferior (entra pela borda inferior: ~70°) */}
          <div 
            className="absolute -bottom-11 left-5 w-[90px] h-[120px]"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha base"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [70, 75, 70]
              }}
              transition={{ repeat: Infinity, duration: 4.6, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-90"
            />
          </div>

          {/* Folha central diagonal (45° - em destaque à frente) */}
          <div 
            className="absolute -bottom-8 -left-8 w-[100px] h-[132px] z-10"
            style={{ transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha canto"
              animate={{
                scale: [1.0, 1.06, 1.0],
                rotate: [45, 48, 45]
              }}
              transition={{ repeat: Infinity, duration: 4.6, delay: 0.1, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. BOTTOM-RIGHT CORNER (Espelho exato horizontal do inferior esq)*/}
      {/* ============================================================== */}
      {showBottomRight && (
        <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
          {/* Folha lateral direita (espelho de 20°) */}
          <div 
            className="absolute bottom-6 -right-10 w-[90px] h-[120px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha lateral"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [20, 15, 20]
              }}
              transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-90"
            />
          </div>

          {/* Folha inferior (espelho de 70°) */}
          <div 
            className="absolute -bottom-11 right-5 w-[90px] h-[120px]"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha base"
              animate={{
                scale: [0.93, 0.98, 0.93],
                rotate: [70, 75, 70]
              }}
              transition={{ repeat: Infinity, duration: 4.6, delay: 0.2, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-md opacity-90"
            />
          </div>

          {/* Folha central diagonal (espelho de 45° - à frente) */}
          <div 
            className="absolute -bottom-8 -right-8 w-[100px] h-[132px] z-10"
            style={{ transform: 'scaleX(-1)', transformOrigin: '50% 100%' }}
          >
            <motion.img
              src="/assets/elements/folha.png"
              alt="Folha canto"
              animate={{
                scale: [1.0, 1.06, 1.0],
                rotate: [45, 48, 45]
              }}
              transition={{ repeat: Infinity, duration: 4.6, delay: 0.1, ease: "easeInOut" }}
              style={{ transformOrigin: '50% 100%' }}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
