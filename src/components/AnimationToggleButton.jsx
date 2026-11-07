import React from 'react';
import { Play, Pause } from 'lucide-react';
import { useAnimation } from '../context/AnimationContext';

export default function AnimationToggleButton({ className = '' }) {
  const { animationsEnabled, toggleAnimations } = useAnimation();

  return (
    <button
      type="button"
      onClick={toggleAnimations}
      title={animationsEnabled ? 'Pausar todas as animações' : 'Ativar animações'}
      aria-label={animationsEnabled ? 'Pausar todas as animações' : 'Ativar animações'}
      className={`fixed sm:absolute bottom-3 right-3 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 focus:outline-none ${
        animationsEnabled
          ? 'bg-black/25 hover:bg-black/45 text-white/75 hover:text-white border-white/15'
          : 'bg-[#d97706]/85 hover:bg-[#b45309] text-white border-amber-300/40 ring-2 ring-amber-400/30'
      } ${className}`}
    >
      {animationsEnabled ? (
        <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
      ) : (
        <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4] ml-0.5" />
      )}
    </button>
  );
}
