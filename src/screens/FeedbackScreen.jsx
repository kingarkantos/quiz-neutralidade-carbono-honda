import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Stepper from '../components/Stepper';
import ResultBanner from '../components/ResultBanner';
import CornerFoliage from '../components/CornerFoliage';
import { ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FeedbackScreen({
  isCorrect,
  question,
  selectedOption,
  questionIndex,
  totalQuestions,
  answers,
  onNext
}) {
  const isLastQuestion = questionIndex + 1 >= totalQuestions;

  // Trigger eco confetti when correct
  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.4 },
        colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC'],
        disableForReducedMotion: true
      });
    }
  }, [isCorrect]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Foliage (Slice 1 / slice-quiz.png) */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      {/* Top Corner Leaves Fan */}
      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Top Stepper Area */}
      <div className="relative z-10 pt-4 px-4">
        <Stepper 
          currentStep={questionIndex + 1} 
          totalSteps={totalQuestions} 
          answers={answers}
        />
      </div>

      {/* Center Feedback Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full">
        {/* Animated Planet with Floating Leaves Behind */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2">
          {isCorrect ? (
            /* --- HAPPY EARTH WITH 4 LEAVES CAREFULLY SPROUTING FROM BEHIND --- */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Vibrant Radiant Green Aura behind Earth and Leaves (Inspired by user mockup) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.65, 0.88, 0.65] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#3cd426]/50 blur-2xl z-0 pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.7, 0.45] }}
                transition={{ repeat: Infinity, duration: 4.0, delay: 0.2, ease: 'easeInOut' }}
                className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#7FD03F]/40 blur-3xl z-0 pointer-events-none"
              />

              {/* Leaf 1: Top-Left (Pointing Up-Left from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 20, y: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.2 }}
                className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.png"
                  alt="Folha Verde"
                  animate={{
                    rotate: [-30, -20, -30],
                    scale: [1, 1.07, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md origin-bottom-right"
                />
              </motion.div>

              {/* Leaf 2: Top-Right (Pointing Up-Right from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -20, y: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.png"
                  alt="Folha Verde"
                  animate={{
                    rotate: [30, 40, 30],
                    scale: [1, 1.07, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.2, delay: 0.3, ease: 'easeInOut' }}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md origin-bottom-left"
                />
              </motion.div>

              {/* Leaf 3: Bottom-Left (Pointing Down-Left from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 20, y: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 }}
                className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.png"
                  alt="Folha Verde"
                  animate={{
                    rotate: [-65, -55, -65],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.8, delay: 0.6, ease: 'easeInOut' }}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md origin-top-right"
                />
              </motion.div>

              {/* Leaf 4: Bottom-Right (Pointing Down-Right from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -20, y: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.png"
                  alt="Folha Verde"
                  animate={{
                    rotate: [65, 75, 65],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.4, delay: 0.4, ease: 'easeInOut' }}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md origin-top-left"
                />
              </motion.div>

              {/* Happy Earth Globe (IN FRONT OF LEAVES: z-20) */}
              <motion.img
                initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1,
                  y: [0, -8, 0]
                }}
                transition={{
                  scale: { type: 'spring', stiffness: 300, damping: 18, bounce: 0.6 },
                  rotate: { type: 'spring', stiffness: 240, damping: 20 },
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }
                }}
                src="/assets/elements/earth-happy.png"
                alt="Terra Feliz"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.32)] z-20 select-none pointer-events-none"
              />
            </div>
          ) : (
            /* --- SAD EARTH WITH FLOATING CO2 CLOUDS --- */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Sad Earth Globe (Face fully visible in the center) */}
              <motion.img
                initial={{ scale: 0.3, opacity: 0, y: -15 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, 8, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  scale: { type: 'spring', stiffness: 260, damping: 18, bounce: 0.5 },
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 4.2, ease: 'easeInOut' }
                }}
                src="/assets/elements/earth-sad.png"
                alt="Terra Triste"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.32)] z-20 select-none pointer-events-none"
              />

              {/* CO2 Cloud Left - No canto superior esquerdo do planeta */}
              <motion.img
                src="/assets/elements/co2-cloud.png"
                alt="Nuvem de CO2"
                animate={{
                  y: [0, -10, 0],
                  x: [0, -4, 0],
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute top-1 -left-3 sm:top-2 sm:-left-4 w-[74px] h-[74px] sm:w-[88px] sm:h-[88px] object-contain z-30 drop-shadow-lg pointer-events-none"
              />

              {/* CO2 Cloud Right - No canto superior direito do planeta */}
              <motion.img
                src="/assets/elements/co2-cloud.png"
                alt="Nuvem de CO2"
                animate={{
                  y: [0, -12, 0],
                  x: [0, 4, 0],
                  scale: [1.05, 0.95, 1.05],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.4, ease: 'easeInOut' }}
                className="absolute top-3 -right-3 sm:top-4 sm:-right-4 w-[74px] h-[74px] sm:w-[88px] sm:h-[88px] object-contain z-30 drop-shadow-lg pointer-events-none"
              />
            </div>
          )}
        </div>

        {/* 3D Banner: "ACERTOU!" or "QUASE LÁ!" */}
        <ResultBanner type={isCorrect ? 'correct' : 'wrong'} />

        {/* Feedback Explanation Card */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.2 }}
          className="w-full bg-[#FAF5EC]/95 backdrop-blur-sm rounded-[24px] p-5 sm:p-6 shadow-3d-card border border-white/60 text-center my-2 z-10"
        >
          {!isCorrect && (
            <p className="text-[#b91c1c] font-black text-sm uppercase tracking-wider mb-1">
              A resposta correta é a alternativa {question.correctOptionId}
            </p>
          )}
          <p className="text-[#1A2E1A] font-medium text-sm sm:text-base leading-relaxed">
            {isCorrect ? question.explanationCorrect : question.explanationIncorrect}
          </p>
        </motion.div>
      </div>

      {/* Bottom Button Area with Shimmer */}
      <div className="relative z-10 w-full px-8 pb-10 pt-3 flex justify-center max-w-lg mx-auto">
        <motion.button
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="w-full py-5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-lg sm:text-xl tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <span>{isLastQuestion ? 'VER RESULTADO' : 'PRÓXIMA PERGUNTA'}</span>
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </motion.button>
      </div>
    </div>
  );
}
