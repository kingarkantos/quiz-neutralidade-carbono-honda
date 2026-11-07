import React from 'react';
import { useZoom } from '../context/ZoomContext';

/**
 * ZoomContent
 * Wraps screen content to apply zoom ONLY to inner interactive and text elements,
 * keeping the outer screen background image, corner foliage, and bottom controls
 * fixed at the exact same size.
 */
export default function ZoomContent({ children, className = '', style = {} }) {
  const { zoom } = useZoom();

  return (
    <div
      className={`relative z-10 w-full h-full flex flex-col justify-between overflow-y-auto no-scrollbar ${className}`}
      style={{
        zoom: zoom,
        ...style
      }}
    >
      {children}
    </div>
  );
}
