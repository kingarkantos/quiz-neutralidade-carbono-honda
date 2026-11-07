import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useZoom } from '../context/ZoomContext';

export default function ZoomButtons({ className = '' }) {
  const { zoom, zoomIn, zoomOut, minZoom, maxZoom } = useZoom();

  const isMin = zoom <= minZoom;
  const isMax = zoom >= maxZoom;

  return (
    <div className={`flex items-center space-x-1.5 sm:space-x-2 ${className}`}>
      {/* Zoom Out Button */}
      <button
        type="button"
        onClick={zoomOut}
        disabled={isMin}
        title={`Diminuir tamanho da tela (${Math.round(zoom * 100)}%)`}
        aria-label="Diminuir tamanho da tela"
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 focus:outline-none bg-black/25 hover:bg-black/45 text-white/75 hover:text-white border-white/15 ${
          isMin ? 'opacity-35 cursor-not-allowed hover:bg-black/25' : ''
        }`}
      >
        <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
      </button>

      {/* Zoom In Button */}
      <button
        type="button"
        onClick={zoomIn}
        disabled={isMax}
        title={`Aumentar tamanho da tela (${Math.round(zoom * 100)}%)`}
        aria-label="Aumentar tamanho da tela"
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200 shadow-md active:scale-90 focus:outline-none bg-black/25 hover:bg-black/45 text-white/75 hover:text-white border-white/15 ${
          isMax ? 'opacity-35 cursor-not-allowed hover:bg-black/25' : ''
        }`}
      >
        <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
      </button>
    </div>
  );
}
