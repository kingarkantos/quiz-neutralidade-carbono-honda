import React from 'react';
import ZoomButtons from './ZoomButtons';
import AnimationToggleButton from './AnimationToggleButton';

export default function BottomControls({ className = '' }) {
  return (
    <div
      className={`fixed sm:absolute bottom-3 right-3 z-50 flex items-center space-x-1.5 sm:space-x-2 pointer-events-auto select-none ${className}`}
    >
      {/* Zoom In & Zoom Out Buttons */}
      <ZoomButtons />

      {/* Animation Pause / Play Button */}
      <AnimationToggleButton />
    </div>
  );
}
