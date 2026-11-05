import React from 'react';
import { motion } from 'framer-motion';

/**
 * PfHeaderBrand
 * 
 * Official "Plantando o Futuro" campaign brand lockup.
 * Features the official transparent handwriting & hand-tree logo,
 * alongside the editorial subtitle "Uma ação da Honda pelo meio ambiente".
 */
export default function PfHeaderBrand({
  compact = false,
  showSubtitle = true,
  treeSize,
  className = ''
}) {
  const defaultSize = compact ? 40 : 54;
  const currentHeight = treeSize || defaultSize;

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* 1. Official Transparent Logo */}
      <motion.img
        src="/assets/plantando-futuro/logo-plantando-futuro.png"
        alt="Plantando o futuro"
        style={{ height: `${currentHeight}px` }}
        className="w-auto object-contain flex-shrink-0 drop-shadow-xs"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* 2. Subtitle: Uma ação da Honda pelo meio ambiente */}
      {showSubtitle && (
        <>
          {/* Subtle vertical separator */}
          <div 
            className="w-[1.5px] bg-[#2E4A31]/25 rounded-full mx-2.5 sm:mx-3.5" 
            style={{ height: `${Math.round(currentHeight * 0.7)}px` }}
          />

          <div className="flex flex-col justify-center text-left">
            <p
              className={`text-[#2B3F2E] font-medium tracking-normal leading-[1.22] font-sans ${
                compact ? 'text-[9.5px] sm:text-[10px]' : 'text-[11px] sm:text-[12px]'
              }`}
            >
              Uma ação da<br />
              <strong className="font-bold text-[#162718]">Honda</strong> pelo meio<br />
              ambiente
            </p>
          </div>
        </>
      )}
    </div>
  );
}
