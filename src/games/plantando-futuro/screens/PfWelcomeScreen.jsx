import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import PfHeaderBrand from '../components/PfHeaderBrand';

export default function PfWelcomeScreen({ onStart }) {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      icon: '/assets/plantando-futuro/icones/tablet-assinatura.png',
      text: 'Assine digitalmente.'
    },
    {
      id: 2,
      icon: '/assets/plantando-futuro/icones/cupom-voucher.png',
      text: 'Retire seu voucher'
    },
    {
      id: 3,
      icon: '/assets/plantando-futuro/icones/muda-kraft.png',
      text: 'Ganhe uma muda de árvore'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb] select-none">
      {/* Background with Nature Foliage Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      {/* Decorative Tree Trunk Hand Watermark in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] -z-0">
        <img 
          src="/assets/plantando-futuro/icones/muda-kraft.png" 
          alt="" 
          className="w-96 h-96 object-contain"
        />
      </div>

      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Top Header */}
      <div className="relative z-30 w-full flex flex-col">
        <div className="w-full flex items-center justify-between px-4 pt-3 pb-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-1.5 bg-[#FAF5EC]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-[#2EB85C]/30 text-[#1C3B24] font-bold text-xs hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-[#2EB85C]" />
            <span>INÍCIO</span>
          </motion.button>

          <img 
            src="/assets/logos/honda.svg" 
            alt="Honda" 
            className="h-8 w-auto object-contain" 
          />
        </div>

        {/* Official Module Hero Banner: Tree Hand + "Plantando o futuro" */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center text-center px-4 pt-2 sm:pt-4"
        >
          {/* Logo Brand Lockup - Transparent, elegant serif & living animated tree */}
          <PfHeaderBrand showSubtitle={true} treeSize={64} />
        </motion.div>
      </div>

      {/* Center Section: Commitment Steps */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-2 max-w-md mx-auto w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h2 className="text-[#1A2E1A] font-black text-lg xs:text-xl sm:text-2xl uppercase tracking-tight leading-tight max-w-xs mx-auto drop-shadow-sm">
            ASSINE SEU COMPROMISSO COM O MEIO AMBIENTE.
          </h2>
        </motion.div>

        {/* 3 Steps Cards (exact design reference) */}
        <div className="w-full flex flex-col space-y-2.5 sm:space-y-3.5">
          {steps.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + idx * 0.12 }}
              className="w-full flex items-center bg-[#FAF5EC]/95 backdrop-blur-sm rounded-[22px] p-2.5 sm:p-3 shadow-md border-2 border-white/80 transition-all duration-200"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#E8E1D3]/80 p-1.5 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
                <img 
                  src={s.icon} 
                  alt={s.text} 
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>

              {/* Text */}
              <div className="flex-1 pl-3.5 sm:pl-4 text-left">
                <p className="text-[#1A2E1A] font-extrabold text-sm sm:text-base leading-snug">
                  {s.text}
                </p>
              </div>

              {/* Step indicator */}
              <div className="w-6 h-6 rounded-full bg-[#2EB85C]/15 flex items-center justify-center text-[#2EB85C] font-black text-xs mr-1">
                {s.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="relative z-30 px-6 sm:px-8 pb-6 sm:pb-8 pt-2 w-full max-w-md mx-auto"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full py-4 sm:py-4.5 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <span>ASSINAR AGORA</span>
          <Sparkles className="w-5 h-5 text-white/90" />
        </motion.button>
      </motion.div>
    </div>
  );
}

