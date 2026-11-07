import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function FullscreenButton({ className = '' }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if fullscreen is supported in this browser
    const supported = !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
    setIsSupported(supported);

    const handleFullscreenChange = () => {
      const activeFs = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(activeFs);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async (e) => {
    e.stopPropagation();
    try {
      const doc = document;
      const docEl = document.documentElement;

      const isFs = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isFs) {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen({ navigationUI: 'hide' });
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          await docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
          await docEl.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Erro ao alternar tela cheia:', err);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      title={isFullscreen ? 'Sair da tela cheia' : 'Maximizar tela cheia'}
      aria-label={isFullscreen ? 'Sair da tela cheia' : 'Maximizar tela cheia'}
      className={`absolute top-3 right-3 z-50 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/45 active:scale-90 text-white/75 hover:text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-white/40 ${className}`}
    >
      {isFullscreen ? (
        <Minimize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
      ) : (
        <Maximize2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
      )}
    </button>
  );
}

