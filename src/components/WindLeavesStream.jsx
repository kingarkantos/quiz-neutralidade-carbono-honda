import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

// SVG Leaf Variation 1 (Broad green leaf)
const LeafSvg1 = ({ className = "", style = {} }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
  </svg>
);

// SVG Leaf Variation 2 (Curved slender leaf)
const LeafSvg2 = ({ className = "", style = {} }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M21 3c-8.5.5-16 6-17.5 14-.3 1.5.3 3 1.5 3.7 1.2.7 2.8.4 3.7-.8 2-2.5 4.5-5 8.5-6.5 4-1.5 7-5.5 8-10.4.1-.5-.2-1-.7-1z" />
  </svg>
);

// Wind streak SVG line (subtle wind gust)
const WindGustLine = ({ width = 120, strokeWidth = 2, opacity = 0.25 }) => (
  <svg width={width} height="20" viewBox={`0 0 ${width} 20`} fill="none" className="pointer-events-none">
    <path 
      d={`M0 10 Q ${width * 0.35} 2, ${width * 0.7} 10 T ${width} 8`} 
      stroke="white" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeOpacity={opacity}
    />
  </svg>
);

export default function WindLeavesStream({ 
  className = "absolute inset-0 pointer-events-none overflow-hidden z-20",
  leafCount = 18
}) {
  const { animationsEnabled } = useAnimation();

  // If animations are paused on this device, don't render active wind particles
  if (!animationsEnabled) return null;

  // Deterministic leaves so re-renders don't cause sudden jumps
  const particles = useMemo(() => {
    return Array.from({ length: leafCount }, (_, i) => {
      // Y positions distributed across the middle/lower landscape (48% to 76% of screen)
      const topPercent = 48 + ((i * 4.9) % 27);
      const duration = 4.2 + ((i * 0.9) % 2.8); // 4.2s to 7.0s (brisa suave contínua)
      const delay = -((i * 1.5) % duration); // Negative delay so leaves are already mid-flight
      const size = 15 + ((i * 3.3) % 18); // 15px to 33px
      const opacity = 0.4 + ((i * 0.11) % 0.55); // 0.40 to 0.95
      const waveAmplitude = 12 + ((i * 5) % 20); // vertical undulating wave
      const rotSpeed = 260 + ((i * 70) % 280); // degrees rotated over the flight
      const color = i % 3 === 0 ? '#2EB85C' : i % 3 === 1 ? '#7FD03F' : '#1C3B24';
      const isImage = i % 3 === 0; // 1 in 3 is the photo-realistic folha.png
      const isType2 = i % 2 === 1;

      return {
        id: i,
        top: `${topPercent}%`,
        duration,
        delay,
        size,
        opacity,
        waveAmplitude,
        rotSpeed,
        color,
        isImage,
        isType2
      };
    });
  }, [leafCount]);

  // Wind gusts passing across
  const gusts = useMemo(() => [
    { id: 1, top: '50%', duration: 4.2, delay: -1.0, width: 140, opacity: 0.35 },
    { id: 2, top: '61%', duration: 4.8, delay: -2.8, width: 190, opacity: 0.28 },
    { id: 3, top: '71%', duration: 4.4, delay: -1.8, width: 150, opacity: 0.32 },
  ], []);

  return (
    <div className={className}>
      {/* Gentle wind lines blowing across */}
      {gusts.map((g) => (
        <motion.div
          key={`gust-${g.id}`}
          animate={{
            left: ['-35%', '115%'],
            opacity: [0, g.opacity, g.opacity * 0.8, 0]
          }}
          transition={{
            left: {
              repeat: Infinity,
              duration: g.duration,
              delay: g.delay,
              ease: 'linear'
            },
            opacity: {
              repeat: Infinity,
              duration: g.duration,
              delay: g.delay,
              times: [0, 0.15, 0.85, 1],
              ease: 'linear'
            }
          }}
          className="absolute pointer-events-none"
          style={{ top: g.top }}
        >
          <WindGustLine width={g.width} opacity={g.opacity} />
        </motion.div>
      ))}

      {/* Floating Leaves Drifting Completely Across Screen from Left (-15%) to Right (115%) */}
      {particles.map((p) => (
        <motion.div
          key={`leaf-${p.id}`}
          animate={{
            left: ['-15%', '115%'],
            y: [0, -p.waveAmplitude, p.waveAmplitude * 0.8, -p.waveAmplitude * 0.5, 0],
            rotate: [0, p.rotSpeed * 0.4, p.rotSpeed * 0.8, p.rotSpeed],
            opacity: [0, p.opacity, p.opacity, 0]
          }}
          transition={{
            left: {
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: 'linear'
            },
            y: {
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: 'easeInOut'
            },
            rotate: {
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: 'easeInOut'
            },
            opacity: {
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              times: [0, 0.1, 0.9, 1],
              ease: 'linear'
            }
          }}
          className="absolute pointer-events-none flex items-center justify-center filter drop-shadow-sm"
          style={{
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`
          }}
        >
          {p.isImage ? (
            <img 
              src="/assets/elements/folha.webp" 
              alt="" 
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          ) : p.isType2 ? (
            <LeafSvg2 
              className="w-full h-full pointer-events-none select-none" 
              style={{ color: p.color }} 
            />
          ) : (
            <LeafSvg1 
              className="w-full h-full pointer-events-none select-none" 
              style={{ color: p.color }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

