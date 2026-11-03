import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Stepper from '../components/Stepper';
import CornerFoliage from '../components/CornerFoliage';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  answers,
  onAnswer,
  onBack,
  timeLeft = null
}) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [evaluationState, setEvaluationState] = useState(null); // null | 'wrong' | 'correct'
  const timerRef = useRef(null);

  // Clean timer & reset selection when question changes or unmounts
  useEffect(() => {
    setSelectedOptionId(null);
    setEvaluationState(null);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [question?.id]);

  const handleContinue = () => {
    if (!selectedOptionId || evaluationState) return;
    const option = question.options.find(o => o.id === selectedOptionId);
    if (!option) return;

    const isCorrect = option.id === question.correctOptionId || option.isCorrect;

    if (!isCorrect) {
      setEvaluationState('wrong');
      // Espera 2 segundos com o card em vermelho antes de ir para FeedbackScreen
      timerRef.current = setTimeout(() => {
        onAnswer(option);
      }, 2000);
    } else {
      setEvaluationState('correct');
      timerRef.current = setTimeout(() => {
        onAnswer(option);
      }, 700);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image: Foliage */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      {/* Animated Foliage in Top Corners */}
      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Top Stepper Area */}
      <div className="relative z-10 pt-4 px-4">
        <Stepper 
          currentStep={questionIndex + 1} 
          totalSteps={totalQuestions} 
          answers={answers}
          timeLeft={timeLeft}
        />
      </div>

      {/* Main Question & Cards Area */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-3.5 sm:px-4 max-w-xl mx-auto w-full my-auto">
        {/* Question Heading */}
        <motion.h2
          key={question.id}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#1A2E1A] font-extrabold text-lg sm:text-2xl text-center leading-snug mb-3 sm:mb-5 px-2 select-none"
        >
          {question.question}
        </motion.h2>

        {/* 2x2 Option Grid with Stagger Animation */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 w-full">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const isThisWrong = isSelected && evaluationState === 'wrong';
            const isThisCorrect = isSelected && evaluationState === 'correct';

            return (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={
                  isThisWrong
                    ? {
                        opacity: 1,
                        scale: 1.02,
                        y: -4,
                        x: [-6, 6, -5, 5, -2, 2, 0]
                      }
                    : isThisCorrect
                    ? {
                        opacity: 1,
                        scale: [1, 1.04, 1.02],
                        y: -4,
                        x: 0
                      }
                    : {
                        opacity: 1,
                        scale: isSelected ? 1.02 : 1,
                        y: isSelected ? -4 : 0,
                        x: 0
                      }
                }
                transition={
                  isThisWrong
                    ? { x: { duration: 0.45, ease: 'easeInOut' } }
                    : isThisCorrect
                    ? { scale: { duration: 0.3 } }
                    : { 
                        type: 'spring', 
                        stiffness: 320, 
                        damping: 24, 
                        delay: evaluationState ? 0 : 0.05 + idx * 0.08 
                      }
                }
                whileHover={!evaluationState ? { scale: 1.02 } : {}}
                whileTap={!evaluationState ? { scale: 0.97 } : {}}
                onClick={() => {
                  if (!evaluationState) {
                    setSelectedOptionId(opt.id);
                  }
                }}
                className={`card-quiz rounded-[18px] sm:rounded-[22px] p-2.5 sm:p-3 flex flex-col justify-between select-none transition-all duration-200 h-[175px] xs:h-[195px] sm:h-[235px] ${
                  evaluationState ? 'cursor-default' : 'cursor-pointer'
                } ${
                  isThisWrong
                    ? 'wrong'
                    : isThisCorrect
                    ? 'correct'
                    : isSelected
                    ? 'selected'
                    : ''
                }`}
              >
                {/* Header of Card: Letter Badge + Text */}
                <div className="flex items-start space-x-1.5 sm:space-x-2">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 ${
                      isThisWrong
                        ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.5)] scale-105'
                        : isThisCorrect
                        ? 'bg-[#2EB85C] text-white shadow-[0_0_12px_rgba(46,184,92,0.5)] scale-105'
                        : isSelected
                        ? 'bg-[#2EB85C] text-white'
                        : 'bg-[#1C3B24] text-white'
                    }`}
                  >
                    {isThisWrong ? (
                      <X className="w-4 h-4 stroke-[3]" />
                    ) : isThisCorrect ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      opt.id
                    )}
                  </div>
                  <p
                    className={`font-semibold text-xs sm:text-sm leading-tight pt-0.5 line-clamp-3 transition-colors ${
                      isThisWrong ? 'text-red-900 font-bold' : 'text-[#1A2E1A]'
                    }`}
                  >
                    {opt.text}
                  </p>
                </div>

                {/* 3D Image inside Card */}
                <div
                  className={`relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl mt-1 sm:mt-2 transition-colors ${
                    isThisWrong ? 'bg-red-100/50' : isThisCorrect ? 'bg-green-100/50' : 'bg-[#f4ece1]/50'
                  }`}
                >
                  <img
                    src={opt.image}
                    alt={opt.text}
                    className="w-full h-full object-contain max-h-[105px] xs:max-h-[120px] sm:max-h-[140px] drop-shadow-sm pointer-events-none transition-transform duration-300"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="relative z-10 w-full px-5 sm:px-6 pb-5 sm:pb-8 pt-2 max-w-xl mx-auto flex items-center justify-between space-x-3 sm:space-x-4 flex-shrink-0">
        {/* Back Button */}
        <motion.button
          whileHover={!evaluationState ? { scale: 1.03 } : {}}
          whileTap={!evaluationState ? { scale: 0.96 } : {}}
          onClick={onBack}
          disabled={Boolean(evaluationState)}
          className={`flex-1 py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl btn-tactile-brown text-white font-bold text-sm sm:text-lg flex items-center justify-center space-x-1.5 uppercase select-none tracking-wide transition-opacity duration-200 ${
            evaluationState ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>VOLTAR</span>
        </motion.button>

        {/* Continue Button */}
        <motion.button
          whileHover={selectedOptionId && !evaluationState ? { scale: 1.03 } : {}}
          whileTap={selectedOptionId && !evaluationState ? { scale: 0.96 } : {}}
          onClick={handleContinue}
          disabled={!selectedOptionId || Boolean(evaluationState)}
          className={`flex-[1.4] py-3.5 sm:py-4 px-3 sm:px-4 rounded-2xl text-white font-black text-sm sm:text-lg flex items-center justify-center space-x-1.5 uppercase select-none tracking-wider transition-all duration-200 ${
            evaluationState === 'wrong'
              ? 'bg-red-600 shadow-[0_6px_0_#991b1b,0_12px_24px_rgba(220,38,38,0.4)] cursor-wait'
              : evaluationState === 'correct'
              ? 'bg-[#2EB85C] shadow-[0_6px_0_#1e7e34,0_12px_24px_rgba(46,184,92,0.4)] cursor-wait'
              : selectedOptionId 
              ? 'btn-tactile-green anim-shimmer cursor-pointer' 
              : 'bg-[#1C3B24]/40 cursor-not-allowed opacity-60'
          }`}
        >
          {evaluationState === 'wrong' ? (
            <>
              <X className="w-5 h-5 stroke-[3]" />
              <span>INCORRETO</span>
            </>
          ) : evaluationState === 'correct' ? (
            <>
              <Check className="w-5 h-5 stroke-[3]" />
              <span>CORRETO!</span>
            </>
          ) : (
            <>
              <span>CONTINUAR</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

