import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import ResultBanner from '../components/ResultBanner';
import CornerFoliage from '../components/CornerFoliage';
import { ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScoreScreen({ correctCount, totalQuestions, onContinue }) {
  // Score out of 100
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  
  // Animated counter
  const springValue = useSpring(0, { stiffness: 60, damping: 20 });
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    springValue.set(scorePercent);
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayScore(Math.round(latest));
    });

    if (scorePercent >= 60) {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.45 },
        colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC']
      });
    }

    return () => unsubscribe();
  }, [scorePercent]);

  // Messages based on score
  let feedbackTitle = "Muito bem!";
  let feedbackText = "Você mostrou que entende como podemos construir um futuro com menos emissões de carbono.";
  
  if (scorePercent === 100) {
    feedbackTitle = "Excelente!";
    feedbackText = "Pontuação perfeita! Você tem total consciência ambiental e lidera pelo exemplo rumo à neutralidade de carbono.";
  } else if (scorePercent <= 33) {
    feedbackTitle = "Bom esforço!";
    feedbackText = "Cada aprendizado é um passo a mais na construção de hábitos mais sustentáveis e um planeta melhor.";
  }

  // Symmetrical Tachometer Speedometer Arch:
  // Starts at bottom-left (165°), peaks at top-center (270°), ends at bottom-right (15°).
  // Symmetrical gap of 150° perfectly centered at 6 o'clock (90° bottom-center)!
  const radius = 80;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // 502.65
  const arcAngle = 210; // 210 degrees arc dome
  const totalArcLength = circumference * (arcAngle / 360); // ~293.21
  const gapLength = circumference - totalArcLength; // ~209.44
  const filledLength = totalArcLength * (displayScore / 100);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Foliage (Slice 1 / slice-quiz.png) */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />

      {/* Top Corner Leaves Fan */}
      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Top Banner Area */}
      <div className="pt-6 sm:pt-8 px-6 z-10 w-full flex justify-center">
        <ResultBanner type="result" text="RESULTADO FINAL" />
      </div>

      {/* Gauge / Velocímetro Area - Moved higher */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start pt-2 sm:pt-4 px-5 sm:px-6 max-w-lg mx-auto w-full">
        {/* Gauge Container */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
          className="relative w-52 h-52 xs:w-60 xs:h-60 sm:w-76 sm:h-76 flex items-center justify-center flex-shrink-0"
        >
          {/* Circular SVG Gauge - Rotated to place bottom-gap exactly at the bottom-center */}
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1C3B24" />
                <stop offset="35%" stopColor="#227734" />
                <stop offset="70%" stopColor="#2EB85C" />
                <stop offset="100%" stopColor="#7FD03F" />
              </linearGradient>
            </defs>

            {/* Symmetrical Background Track (starts at bottom-left 165°, peaks at top, ends at bottom-right 15°) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#d5c8b2"
              strokeWidth={strokeWidth}
              strokeDasharray={`${totalArcLength} ${gapLength}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              transform="rotate(165 100 100)"
            />

            {/* Symmetrical Animated Active Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={`${filledLength} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              transform="rotate(165 100 100)"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Central Inner Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-32 h-32 xs:w-38 xs:h-38 sm:w-48 sm:h-48 rounded-full bg-[#FAF5EC] shadow-inner flex flex-col items-center justify-center border-4 border-white">
              {/* Green Leaf Icon */}
              <motion.img
                animate={{ rotate: [-4, 4, -4], scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                src="/assets/elements/folha.webp"
                alt="Folha"
                className="w-7 h-7 sm:w-10 sm:h-10 object-contain drop-shadow-sm mb-0.5 sm:mb-1"
              />

              {/* Score Number */}
              <span className="text-[#1A2E1A] font-black text-4xl xs:text-5xl sm:text-6xl tracking-tight leading-none">
                {displayScore}
              </span>

              {/* "PONTOS" */}
              <span className="text-[#455A46] font-extrabold text-xs sm:text-base tracking-widest uppercase mt-0.5 sm:mt-1">
                PONTOS
              </span>
            </div>
          </div>
        </motion.div>

        {/* Feedback Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.3 }}
          className="w-full bg-[#FAF5EC]/95 backdrop-blur-sm rounded-[18px] sm:rounded-[24px] p-3.5 sm:p-5 shadow-3d-card border border-white/60 mt-2 sm:mt-3 text-left"
        >
          <h3 className="text-[#1A2E1A] font-extrabold text-lg sm:text-2xl mb-1">
            {feedbackTitle}
          </h3>
          <p className="text-[#3b4c3c] font-medium text-xs sm:text-base leading-relaxed">
            {feedbackText}
          </p>
        </motion.div>
      </div>

      {/* Bottom Continue Area with Shimmer - Lifted higher from bottom edge */}
      <div className="relative z-10 w-full px-6 sm:px-8 pb-9 sm:pb-12 pt-2 flex justify-center max-w-lg mx-auto flex-shrink-0">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          className="w-full py-3.5 sm:py-4.5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-xl tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <span>CONTINUAR</span>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
        </motion.button>
      </div>
    </div>
  );
}
