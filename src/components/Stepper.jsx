import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function Stepper({ currentStep, totalSteps = 3, answers = [] }) {
  return (
    <div className="w-full flex flex-col items-center justify-center my-3 z-10">
      {/* Circles and lines */}
      <div className="relative flex items-center justify-center w-64 max-w-full">
        {/* Background connecting line */}
        <div className="absolute top-1/2 left-6 right-6 h-1 bg-[#d5c7b0] -translate-y-1/2 z-0 rounded-full" />
        
        {/* Step circles */}
        <div className="flex items-center justify-between w-full z-10 px-4">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNum = index + 1;
            const answer = answers[index];
            const isCompleted = answer !== undefined;
            const isCurrent = stepNum === currentStep;

            let bgColor = 'bg-[#b6aa97] text-white';
            let content = <span className="font-bold text-lg">{stepNum}</span>;

            if (isCompleted) {
              if (answer.isCorrect) {
                bgColor = 'bg-[#1C3B24] text-white ring-4 ring-[#1C3B24]/20';
                content = <Check className="w-5 h-5 stroke-[3.5]" />;
              } else {
                bgColor = 'bg-[#b91c1c] text-white ring-4 ring-[#b91c1c]/20';
                content = <X className="w-5 h-5 stroke-[3.5]" />;
              }
            } else if (isCurrent) {
              bgColor = 'bg-[#1C3B24] text-white ring-4 ring-[#1C3B24]/25 shadow-md';
              content = <span className="font-extrabold text-xl">{stepNum}</span>;
            }

            return (
              <motion.div
                key={stepNum}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isCurrent ? 1.15 : 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-sans shadow-sm select-none transition-all duration-300 ${bgColor}`}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Badge "Pergunta X de Y" */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-3 bg-[#1C3B24] text-white text-sm font-semibold tracking-wide px-5 py-1.5 rounded-full shadow-md"
      >
        Pergunta {currentStep} de {totalSteps}
      </motion.div>
    </div>
  );
}

