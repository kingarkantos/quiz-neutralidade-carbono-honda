import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function LpInteractiveTutorial({ className = '' }) {
  // Phases:
  // 0: Hand glides to Action 1
  // 1: Hand taps Action 1 (Action 1 selected)
  // 2: Hand glides to Benefit 2 (the match)
  // 3: Hand taps Benefit 2
  // 4: Success matched! Both green, line connects, hold for 1.8s
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeouts = [];

    const runLoop = () => {
      setPhase(0);

      // Phase 1: Tap Action 1
      timeouts.push(setTimeout(() => setPhase(1), 1100));

      // Phase 2: Move to Benefit 2
      timeouts.push(setTimeout(() => setPhase(2), 2000));

      // Phase 3: Tap Benefit 2
      timeouts.push(setTimeout(() => setPhase(3), 3000));

      // Phase 4: Match Success
      timeouts.push(setTimeout(() => setPhase(4), 3600));

      // Loop restart
      timeouts.push(setTimeout(runLoop, 5800));
    };

    runLoop();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const isAction1Selected = phase >= 1 && phase < 4;
  const isAction1Matched = phase >= 4;
  const isBenefit2Selected = phase === 3;
  const isBenefit2Matched = phase >= 4;

  // Hand position coordinates (%) based on phase
  // Action 1 center is roughly: left 24%, top 28%
  // Benefit 2 center is roughly: left 76%, top 72%
  // Idle position: left 50%, top 90%
  let handX = '48%';
  let handY = '80%';
  let handScale = 1;

  if (phase === 0) {
    handX = '26%';
    handY = '30%';
    handScale = 1;
  } else if (phase === 1) {
    handX = '26%';
    handY = '30%';
    handScale = 0.82; // tap press
  } else if (phase === 2) {
    handX = '74%';
    handY = '72%';
    handScale = 1;
  } else if (phase === 3) {
    handX = '74%';
    handY = '72%';
    handScale = 0.82; // tap press
  } else if (phase === 4) {
    handX = '82%';
    handY = '88%';
    handScale = 0.9;
  }

  return (
    <div className={`relative w-full max-w-sm sm:max-w-md mx-auto select-none ${className}`}>
      {/* Video Tutorial Container Card */}
      <div className="relative bg-[#FAF5EC]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 shadow-lg border-2 border-white/90 overflow-hidden">
        {/* Top "Tutorial / Demonstração" Header Pill */}
        <div className="flex items-center justify-between mb-1.5 px-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2EB85C] animate-ping" />
            <span className="text-[#1C3B24] font-black text-[10px] sm:text-xs uppercase tracking-wider">
              Como funciona
            </span>
          </div>
          <span className="text-[#6b7280] font-bold text-[9px] sm:text-[10px] uppercase bg-black/5 px-2 py-0.5 rounded-full">
            Toque e conecte
          </span>
        </div>

        {/* Mini 2-Column Board */}
        <div className="relative grid grid-cols-2 gap-2 sm:gap-2.5">
          {/* Connecting SVG curved line between Action 1 and Benefit 2 */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {phase >= 4 && (
              <motion.path
                d="M 120 28 C 160 28, 160 85, 200 85"
                fill="none"
                stroke="#2EB85C"
                strokeWidth="3"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )}
          </svg>

          {/* Left Column (2 Ações) */}
          <div className="flex flex-col space-y-1.5">
            <div className="text-[10px] font-black text-[#1C3B24] uppercase text-center tracking-wider opacity-80">
              Ações
            </div>

            {/* Action Card 1: Reutilização de embalagens */}
            <motion.div
              animate={
                isAction1Matched
                  ? { scale: [1, 1.04, 1] }
                  : isAction1Selected
                  ? { scale: 1.03 }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
              className={`relative flex items-center justify-between p-1 sm:p-1.5 rounded-xl border transition-all duration-200 ${
                isAction1Matched
                  ? 'bg-[#2EB85C]/20 border-[#2EB85C] shadow-sm'
                  : isAction1Selected
                  ? 'bg-white border-[#2EB85C] ring-2 ring-[#2EB85C]/40 shadow-md'
                  : 'bg-white/80 border-white/90 shadow-xs'
              }`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#eadecc]/70 p-0.5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/jogo2/ELEMENTOS/ELEMENTOS AÇÕES/tres-caixas-plasticas-industriais-empilhadas-1.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="flex-1 px-1 text-[9px] sm:text-[10px] font-bold text-[#1A2E1A] leading-tight truncate">
                Reutilização
              </p>
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[8px] font-bold ${
                  isAction1Matched
                    ? 'bg-[#2EB85C]'
                    : isAction1Selected
                    ? 'bg-[#2EB85C] animate-pulse'
                    : 'bg-[#cfc3a7]'
                }`}
              >
                {isAction1Matched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </motion.div>

            {/* Action Card 2: Reciclagem de metais */}
            <div className="relative flex items-center justify-between p-1 sm:p-1.5 rounded-xl border bg-white/80 border-white/90 shadow-xs opacity-75">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#eadecc]/70 p-0.5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/jogo2/ELEMENTOS/ELEMENTOS AÇÕES/pilha-compacta-de-sucata-metalica-2.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="flex-1 px-1 text-[9px] sm:text-[10px] font-bold text-[#1A2E1A] leading-tight truncate">
                Reciclagem
              </p>
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#cfc3a7] flex-shrink-0" />
            </div>
          </div>

          {/* Right Column (2 Benefícios) */}
          <div className="flex flex-col space-y-1.5">
            <div className="text-[10px] font-black text-[#1C3B24] uppercase text-center tracking-wider opacity-80">
              Benefícios
            </div>

            {/* Benefit Card 1: Preserva recursos */}
            <div className="relative flex items-center justify-between p-1 sm:p-1.5 rounded-xl border bg-white/80 border-white/90 shadow-xs opacity-75">
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#cfc3a7] flex-shrink-0" />
              <div className="flex-1 px-1 text-left min-w-0">
                <div className="flex items-center space-x-0.5">
                  <span className="text-[#2EB85C] font-black text-[7px] uppercase">IMPACTO</span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-[#1A2E1A] leading-tight truncate">
                  Preserva água
                </p>
              </div>
            </div>

            {/* Benefit Card 2: Reduz resíduos (MATCH for Action 1!) */}
            <motion.div
              animate={
                isBenefit2Matched
                  ? { scale: [1, 1.04, 1] }
                  : isBenefit2Selected
                  ? { scale: 1.03 }
                  : { scale: 1 }
              }
              transition={{ duration: 0.3 }}
              className={`relative flex items-center justify-between p-1 sm:p-1.5 rounded-xl border transition-all duration-200 ${
                isBenefit2Matched
                  ? 'bg-[#2EB85C]/20 border-[#2EB85C] shadow-sm'
                  : isBenefit2Selected
                  ? 'bg-white border-[#2EB85C] ring-2 ring-[#2EB85C]/40 shadow-md'
                  : 'bg-white/80 border-white/90 shadow-xs'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[8px] font-bold ${
                  isBenefit2Matched
                    ? 'bg-[#2EB85C]'
                    : isBenefit2Selected
                    ? 'bg-[#2EB85C] animate-pulse'
                    : 'bg-[#cfc3a7]'
                }`}
              >
                {isBenefit2Matched && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <div className="flex-1 px-1 text-left min-w-0">
                <div className="flex items-center space-x-0.5">
                  <span className="text-[#2EB85C] font-black text-[7px] uppercase">IMPACTO</span>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-[#1A2E1A] leading-tight truncate">
                  Reduz resíduos
                </p>
              </div>
            </motion.div>
          </div>

          {/* Animated Hand / Finger Cursor */}
          <motion.div
            className="absolute pointer-events-none z-30"
            initial={false}
            animate={{
              left: handX,
              top: handY,
              scale: handScale,
              opacity: phase === 4 ? 0.3 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 24
            }}
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            {/* Tap Ripple Ring */}
            {(phase === 1 || phase === 3) && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[#2EB85C]/40 border-2 border-[#2EB85C] pointer-events-none"
              />
            )}

            {/* Hand Pointer Icon */}
            <div className="relative">
              <img
                src="/assets/jogo2/ELEMENTOS/TELA INICIAL/mao-tocando-alvo-circular-3.png"
                alt="Toque"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] select-none pointer-events-none -rotate-12"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
