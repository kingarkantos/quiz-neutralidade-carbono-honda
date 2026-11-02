import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
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

  // Gauge calculations for SVG Arc (semi-circle / 240 degrees)
  // Let's create an elegant, responsive SVG speedometer
  const radius = 80;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius; // ~502
  // We use 75% of the circle (270 degrees)
  const maxArc = circumference * 0.75;
  const currentArcOffset = maxArc - (maxArc * (displayScore / 100));

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Foliage */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      {/* Spacer top */}
      <div className="pt-8 px-6 z-10 w-full flex justify-center">
        {/* Banner "RESULTADO FINAL" */}
        <ResultBanner type="result" text="RESULTADO FINAL" />
      </div>

      {/* Gauge / Velocímetro Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full">
        {/* Gauge Container */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.1 }}
          className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center"
        >
          {/* Circular SVG Gauge */}
          <svg className="w-full h-full transform -rotate-[135deg]" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#d5c8b2"
              strokeWidth={strokeWidth}
              strokeDasharray={maxArc}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Animated Gradient Active Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={maxArc}
              strokeDashoffset={currentArcOffset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C3B24" />
                <stop offset="50%" stopColor="#2EB85C" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Inner Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-[#FAF5EC] shadow-inner flex flex-col items-center justify-center border-4 border-white">
              {/* Green Leaf Icon */}
              <motion.img
                animate={{ rotate: [-4, 4, -4], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                src="/assets/elements/folha.png"
                alt="Folha"
                className="w-10 h-10 object-contain drop-shadow-sm mb-1"
              />

              {/* Score Number */}
              <span className="text-[#1A2E1A] font-black text-5xl sm:text-6xl tracking-tight leading-none">
                {displayScore}
              </span>

              {/* "PONTOS" */}
              <span className="text-[#455A46] font-extrabold text-sm sm:text-base tracking-widest uppercase mt-1">
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
          className="w-full bg-[#FAF5EC]/95 backdrop-blur-sm rounded-[24px] p-6 shadow-3d-card border border-white/60 mt-4 text-left"
        >
          <h3 className="text-[#1A2E1A] font-extrabold text-xl sm:text-2xl mb-1.5">
            {feedbackTitle}
          </h3>
          <p className="text-[#3b4c3c] font-medium text-base leading-relaxed">
            {feedbackText}
          </p>
        </motion.div>
      </div>

      {/* Bottom Continue Area */}
      <div className="relative z-10 w-full px-8 pb-10 pt-3 flex justify-center max-w-lg mx-auto">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          className="w-full py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-lg sm:text-xl tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <span>CONTINUAR</span>
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </motion.button>
      </div>
    </div>
  );
}

