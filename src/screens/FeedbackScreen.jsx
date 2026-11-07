import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Stepper from '../components/Stepper';
import ResultBanner from '../components/ResultBanner';
import CornerFoliage from '../components/CornerFoliage';
import ZoomContent from '../components/ZoomContent';
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
  const [isAdvancing, setIsAdvancing] = useState(false);

  // Early guard if question is somehow undefined during unmount/transition
  if (!question) {
    return null;
  }

  const isLastQuestion = questionIndex + 1 >= totalQuestions;
  const userOption = selectedOption || answers[answers.length - 1]?.selectedOption;

  const handleNextClick = () => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    if (onNext) onNext();
  };

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
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />

      {/* Top Corner Leaves Fan */}
      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-4 px-4">
        {/* Top Stepper Area */}
        <div className="w-full max-w-lg mx-auto flex-shrink-0">
          <Stepper 
            currentStep={questionIndex + 1} 
            totalSteps={totalQuestions} 
            answers={answers}
          />
        </div>

        {/* Center Feedback Area */}
        <div className="flex-1 min-h-0 flex flex-col items-center justify-start pt-2 sm:pt-4 px-5 sm:px-6 max-w-lg mx-auto w-full">
        {/* Animated Planet with Floating Leaves Behind */}
        <div className={`relative flex items-center justify-center my-1 sm:my-2 flex-shrink-0 ${
          isCorrect ? 'w-44 h-44 sm:w-60 sm:h-60' : 'w-36 h-36 sm:w-48 sm:h-48'
        }`}>
          {isCorrect ? (
            /* --- HAPPY EARTH WITH 4 LEAVES CAREFULLY SPROUTING FROM BEHIND --- */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Vibrant Radiant Green Aura behind Earth and Leaves (Inspired by user mockup) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.65, 0.88, 0.65] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-[#3cd426]/50 blur-2xl z-0 pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.7, 0.45] }}
                transition={{ repeat: Infinity, duration: 4.0, delay: 0.2, ease: 'easeInOut' }}
                className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-[#7FD03F]/40 blur-3xl z-0 pointer-events-none"
              />

              {/* Leaf 1: Top-Left (Pointing Up-Left from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 20, y: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.2 }}
                className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.webp"
                  alt="Folha Verde"
                  animate={{
                    rotate: [-30, -20, -30],
                    scale: [1, 1.07, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="w-11 h-11 sm:w-16 sm:h-16 object-contain drop-shadow-md origin-bottom-right"
                />
              </motion.div>

              {/* Leaf 2: Top-Right (Pointing Up-Right from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -20, y: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.25 }}
                className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.webp"
                  alt="Folha Verde"
                  animate={{
                    rotate: [30, 40, 30],
                    scale: [1, 1.07, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.2, delay: 0.3, ease: 'easeInOut' }}
                  className="w-11 h-11 sm:w-16 sm:h-16 object-contain drop-shadow-md origin-bottom-left"
                />
              </motion.div>

              {/* Leaf 3: Bottom-Left (Pointing Down-Left from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 20, y: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 }}
                className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.webp"
                  alt="Folha Verde"
                  animate={{
                    rotate: [-65, -55, -65],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.8, delay: 0.6, ease: 'easeInOut' }}
                  className="w-11 h-11 sm:w-16 sm:h-16 object-contain drop-shadow-md origin-top-right"
                />
              </motion.div>

              {/* Leaf 4: Bottom-Right (Pointing Down-Right from behind Earth) */}
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -20, y: -20 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
                className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-10 pointer-events-none"
              >
                <motion.img
                  src="/assets/elements/folha.webp"
                  alt="Folha Verde"
                  animate={{
                    rotate: [65, 75, 65],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 3.4, delay: 0.4, ease: 'easeInOut' }}
                  className="w-11 h-11 sm:w-16 sm:h-16 object-contain drop-shadow-md origin-top-left"
                />
              </motion.div>

              {/* Happy Earth Globe (IN FRONT OF LEAVES: z-20) */}
              <motion.img
                initial={{ scale: 0.3, rotate: -15, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0, 
                  opacity: 1,
                  y: [0, -6, 0]
                }}
                transition={{
                  scale: { type: 'spring', stiffness: 300, damping: 18, bounce: 0.6 },
                  rotate: { type: 'spring', stiffness: 240, damping: 20 },
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.4 }
                }}
                src="/assets/elements/earth-happy.webp"
                alt="Terra Feliz"
                className="w-36 h-36 sm:w-48 sm:h-48 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] z-20 select-none pointer-events-none"
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
                  y: [0, 5, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  scale: { type: 'spring', stiffness: 260, damping: 18, bounce: 0.5 },
                  opacity: { duration: 0.3 },
                  y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 4.2, ease: 'easeInOut' }
                }}
                src="/assets/elements/earth-sad.webp"
                alt="Terra Triste"
                className="w-32 h-32 sm:w-42 sm:h-42 object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.3)] z-20 select-none pointer-events-none"
              />

              {/* CO2 Cloud Left - No canto superior esquerdo do planeta */}
              <motion.img
                src="/assets/elements/co2-cloud.webp"
                alt="Nuvem de CO2"
                animate={{
                  y: [0, -7, 0],
                  x: [0, -3, 0],
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute top-0 -left-2 sm:top-1 sm:-left-3 w-[48px] h-[48px] sm:w-[62px] sm:h-[62px] object-contain z-30 drop-shadow-lg pointer-events-none"
              />

              {/* CO2 Cloud Right - No canto superior direito do planeta */}
              <motion.img
                src="/assets/elements/co2-cloud.webp"
                alt="Nuvem de CO2"
                animate={{
                  y: [0, -8, 0],
                  x: [0, 3, 0],
                  scale: [1.05, 0.95, 1.05],
                  opacity: [0.9, 1, 0.9]
                }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.4, ease: 'easeInOut' }}
                className="absolute top-1 -right-2 sm:top-2 sm:-right-3 w-[48px] h-[48px] sm:w-[62px] sm:h-[62px] object-contain z-30 drop-shadow-lg pointer-events-none"
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
          className="w-full bg-[#FAF5EC]/95 backdrop-blur-sm rounded-[18px] sm:rounded-[24px] p-3 sm:p-4 shadow-3d-card border border-white/60 text-center my-1.5 sm:my-2 z-10"
        >
          {/* Quadradinho da alternativa errada que o usuário marcou */}
          {!isCorrect && userOption && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-red-50/95 border-2 border-red-300 rounded-2xl p-2 sm:p-2.5 mb-2.5 text-left shadow-sm flex items-center space-x-2.5"
            >
              {/* Quadradinho com a imagem 3D e o badge X da alternativa */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-red-200 flex-shrink-0 flex items-center justify-center p-1 shadow-inner overflow-hidden">
                <img
                  src={userOption.image}
                  alt={userOption.text}
                  className="w-full h-full object-contain pointer-events-none"
                />
                <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-600 text-white font-black text-[9px] flex items-center justify-center shadow">
                  ✕
                </div>
              </div>

              {/* Informações da alternativa marcada */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <span className="bg-red-600 text-white font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Você marcou ({userOption.id})
                  </span>
                  <span className="text-red-600 font-bold text-[10px] sm:text-xs uppercase">
                    Incorreta
                  </span>
                </div>
                <p className="text-[#1A2E1A] font-bold text-xs sm:text-sm leading-tight break-words">
                  {userOption.text}
                </p>
              </div>
            </motion.div>
          )}

          {!isCorrect && (
            <p className="text-[#15803d] font-black text-xs sm:text-sm uppercase tracking-wider mb-1.5">
              ✓ A resposta correta é a alternativa {question?.correctOptionId}
            </p>
          )}
          <p className="text-[#1A2E1A] font-semibold text-sm sm:text-base md:text-lg leading-relaxed">
            {isCorrect ? question?.explanationCorrect : question?.explanationIncorrect}
          </p>
        </motion.div>

        {/* Action Button - Directly below the card! */}
        <div className="w-full mt-3 sm:mt-4 pb-4 flex justify-center max-w-lg mx-auto flex-shrink-0">
          <motion.button
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.3 }}
            whileHover={!isAdvancing ? { scale: 1.04 } : {}}
            whileTap={!isAdvancing ? { scale: 0.96 } : {}}
            onClick={handleNextClick}
            disabled={isAdvancing}
            className={`w-full py-3.5 sm:py-4 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider select-none uppercase flex items-center justify-center space-x-2 shadow-xl ${
              isAdvancing ? 'opacity-70 pointer-events-none' : ''
            }`}
          >
            <span>{isLastQuestion ? 'VER RESULTADO' : 'PRÓXIMA PERGUNTA'}</span>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
          </motion.button>
        </div>
        </div>
      </ZoomContent>
    </div>
  );
}
