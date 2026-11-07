import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

// SVG Path for a clean botanical leaf
const LeafSvg = ({ className = "", style = {} }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
  </svg>
);

export default function FallingLeavesMatrix({ 
  count = 20, 
  className = "absolute top-0 left-0 right-0 h-[55%] overflow-hidden pointer-events-none z-10" 
}) {
  const { animationsEnabled } = useAnimation();

  // If animations are paused on this device, don't render active falling particles
  if (!animationsEnabled) return null;

  // Generate deterministic particles so re-renders don't cause sudden jumps
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Columns spread horizontally
      const left = ((i * 5.4) + (i % 4) * 2.1 + 2) % 96;
      const duration = 4.8 + ((i * 0.8) % 3.6); // 4.8s to 8.4s (queda suave e fluida)
      const delay = -((i * 1.5) % duration); // Negative delay so they are already mid-flight down the screen
      const size = 12 + ((i * 3.2) % 16); // 12px to 28px
      const opacity = 0.25 + ((i * 0.09) % 0.45); // 0.25 to 0.70
      const drift = 8 + ((i * 4) % 18);
      const rotStart = -40 + ((i * 25) % 80);
      const rotEnd = rotStart + 140 + ((i * 35) % 220);
      const color = i % 3 === 0 ? '#2EB85C' : i % 3 === 1 ? '#7FD03F' : '#1C3B24';

      return {
        id: i,
        left: `${left}%`,
        duration,
        delay,
        size,
        opacity,
        drift,
        rotStart,
        rotEnd,
        color
      };
    });
  }, [count]);

  return (
    <div 
      className={className}
      style={{
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
      }}
    >
      {leaves.map((l) => (
        <motion.div
          key={l.id}
          animate={{
            top: ['-10%', '110%'],
            x: [0, l.drift, -l.drift, 0],
            rotate: [l.rotStart, l.rotEnd],
            opacity: [0, l.opacity, l.opacity, 0]
          }}
          transition={{
            top: {
              repeat: Infinity,
              duration: l.duration,
              delay: l.delay,
              ease: 'linear'
            },
            x: {
              repeat: Infinity,
              duration: l.duration * 0.65,
              delay: l.delay,
              ease: 'easeInOut'
            },
            rotate: {
              repeat: Infinity,
              duration: l.duration * 0.85,
              delay: l.delay,
              ease: 'easeInOut'
            },
            opacity: {
              repeat: Infinity,
              duration: l.duration,
              delay: l.delay,
              times: [0, 0.1, 0.9, 1],
              ease: 'linear'
            }
          }}
          className="absolute pointer-events-none flex items-center justify-center"
          style={{
            left: l.left,
            width: `${l.size}px`,
            height: `${l.size}px`,
            color: l.color,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))'
          }}
        >
          <LeafSvg className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}

