import React from 'react';
import { motion } from 'framer-motion';
import AnimatedPlantandoFuturoTree from '../../../components/AnimatedPlantandoFuturoTree';

/**
 * PfHeaderBrand
 * 
 * Official "Plantando o Futuro" campaign brand lockup.
 * Transparent background (no white container), featuring:
 * - Animated living tree (hand trunk + rustling canopy leaves + spore particles)
 * - Elegant serif typography for "Plantando o futuro" (Playfair Display)
 * - Editorial sans-serif typography for "Uma ação da Honda pelo meio ambiente"
 */
export default function PfHeaderBrand({
  compact = false,
  showSubtitle = true,
  treeSize,
  className = ''
}) {
  const defaultSize = compact ? 38 : 58;
  const currentSize = treeSize || defaultSize;

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* 1. Animated Campaign Tree */}
      <div className="flex-shrink-0">
        <AnimatedPlantandoFuturoTree size={currentSize} interactive={true} animate={true} />
      </div>

      {/* 2. Main Title: Plantando o futuro */}
      <div className="flex flex-col justify-center text-left pl-2.5 sm:pl-3.5">
        <h1
          className={`font-serif font-black text-[#142315] tracking-tight leading-[0.92] ${
            compact ? 'text-lg sm:text-xl' : 'text-2xl sm:text-[28px]'
          }`}
        >
          Plantando<br />
          <span className="text-[#142315]">o futuro</span>
        </h1>
      </div>

      {/* 3. Subtitle: Uma ação da Honda pelo meio ambiente */}
      {showSubtitle && (
        <>
          {/* Subtle elegant vertical separator */}
          <div className="h-8 sm:h-10 w-[1.5px] bg-[#2E4A31]/25 rounded-full mx-2.5 sm:mx-3.5" />

          <div className="flex flex-col justify-center text-left">
            <p
              className={`text-[#2B3F2E] font-medium tracking-normal leading-[1.24] font-sans ${
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
