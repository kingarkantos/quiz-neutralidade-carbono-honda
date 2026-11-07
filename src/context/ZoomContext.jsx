import React, { createContext, useContext, useState, useEffect } from 'react';

const ZoomContext = createContext({
  zoom: 1,
  zoomIn: () => {},
  zoomOut: () => {},
  resetZoom: () => {},
});

const MIN_ZOOM = 0.70;
const MAX_ZOOM = 1.35;
const ZOOM_STEP = 0.08;

export function ZoomProvider({ children }) {
  const [zoom, setZoom] = useState(() => {
    try {
      const saved = localStorage.getItem('quiz_screen_zoom');
      if (saved) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= MIN_ZOOM && val <= MAX_ZOOM) {
          return val;
        }
      }
      return 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('quiz_screen_zoom', zoom.toFixed(2));
    } catch (e) {
      console.warn('LocalStorage zoom error:', e);
    }

    // Set CSS custom property so elements can scale relative to --app-zoom
    document.documentElement.style.setProperty('--app-zoom', zoom.toString());

    // Explicitly remove root/body zoom so the page background NEVER changes size
    document.documentElement.style.removeProperty('zoom');
    if (document.body.style.transform) {
      document.body.style.transform = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  }, [zoom]);

  const zoomIn = () => {
    setZoom((prev) => Math.min(MAX_ZOOM, Math.round((prev + ZOOM_STEP) * 100) / 100));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(MIN_ZOOM, Math.round((prev - ZOOM_STEP) * 100) / 100));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <ZoomContext.Provider value={{ zoom, zoomIn, zoomOut, resetZoom, minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM }}>
      {children}
    </ZoomContext.Provider>
  );
}

export function useZoom() {
  return useContext(ZoomContext);
}

