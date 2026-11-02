import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Stepper from '../components/Stepper';
import CornerFoliage from '../components/CornerFoliage';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  answers,
  onAnswer,
  onBack
}) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleContinue = () => {
    if (!selectedOptionId) return;
    const option = question.options.find(o => o.id === selectedOptionId);
    onAnswer(option);
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
        />
      </div>

      {/* Main Question & Cards Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 max-w-xl mx-auto w-full my-2">
        {/* Question Heading */}
        <motion.h2
          key={question.id}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#1A2E1A] font-extrabold text-xl sm:text-2xl text-center leading-snug mb-5 px-3 select-none"
        >
          {question.question}
        </motion.h2>

        {/* 2x2 Option Grid with Stagger Animation */}
        <div className="grid grid-cols-2 gap-3.5 w-full">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;

            return (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 320, 
                  damping: 24, 
                  delay: 0.05 + idx * 0.08 
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedOptionId(opt.id)}
                className={`card-quiz rounded-[22px] p-3 flex flex-col justify-between cursor-pointer select-none transition-all duration-200 h-[220px] sm:h-[240px] ${
                  isSelected ? 'selected' : ''
                }`}
              >
                {/* Header of Card: Letter Badge + Text */}
                <div className="flex items-start space-x-2">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm transition-colors ${
                    isSelected ? 'bg-[#2EB85C] text-white' : 'bg-[#1C3B24] text-white'
                  }`}>
                    {opt.id}
                  </div>
                  <p className="text-[#1A2E1A] font-semibold text-xs sm:text-sm leading-tight pt-1 line-clamp-3">
                    {opt.text}
                  </p>
                </div>

                {/* 3D Image inside Card */}
                <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl mt-2 bg-[#f4ece1]/50">
                  <img
                    src={opt.image}
                    alt={opt.text}
                    className="w-full h-full object-contain max-h-[140px] drop-shadow-sm pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="relative z-10 w-full px-6 pb-8 pt-3 max-w-xl mx-auto flex items-center justify-between space-x-4">
        {/* Back Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onBack}
          className="flex-1 py-4 px-4 rounded-2xl btn-tactile-brown text-white font-bold text-base sm:text-lg flex items-center justify-center space-x-1.5 uppercase select-none tracking-wide"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>VOLTAR</span>
        </motion.button>

        {/* Continue Button */}
        <motion.button
          whileHover={selectedOptionId ? { scale: 1.03 } : {}}
          whileTap={selectedOptionId ? { scale: 0.96 } : {}}
          onClick={handleContinue}
          disabled={!selectedOptionId}
          className={`flex-[1.4] py-4 px-4 rounded-2xl text-white font-black text-base sm:text-lg flex items-center justify-center space-x-1.5 uppercase select-none tracking-wider transition-all duration-200 ${
            selectedOptionId 
              ? 'btn-tactile-green anim-shimmer cursor-pointer' 
              : 'bg-[#1C3B24]/40 cursor-not-allowed opacity-60'
          }`}
        >
          <span>CONTINUAR</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

