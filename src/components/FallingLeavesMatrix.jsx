import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

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
  count = 18, 
  className = "absolute top-0 left-0 right-0 h-[52%] overflow-hidden pointer-events-none z-10" 
}) {
  // Generate deterministic particles so re-renders don't cause sudden jumps
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Columns spread horizontally
      const left = ((i * 5.8) + (i % 3) * 2.2 + 3) % 94;
      const duration = 4.8 + ((i * 1.3) % 4.2);
      const delay = -((i * 1.9) % duration); // Negative delay so they are already mid-flight!
      const size = 12 + ((i * 3.7) % 14); // 12px to 26px
      const opacity = 0.18 + ((i * 0.08) % 0.32); // 0.18 to 0.50
      const drift = 8 + ((i * 4) % 16);
      const rotStart = -40 + ((i * 25) % 80);
      const rotEnd = rotStart + 120 + ((i * 35) % 180);
      const color = i % 2 === 0 ? '#2EB85C' : '#57B836';

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
          initial={{ 
            y: '-10%', 
            x: 0, 
            rotate: l.rotStart,
            opacity: 0
          }}
          animate={{
            y: ['0%', '115%'],
            x: [0, l.drift, -l.drift, 0],
            rotate: [l.rotStart, l.rotEnd],
            opacity: [0, l.opacity, l.opacity, 0]
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: l.duration,
              delay: l.delay,
              ease: 'linear'
            },
            x: {
              repeat: Infinity,
              duration: l.duration * 0.7,
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
              times: [0, 0.15, 0.8, 1],
              ease: 'linear'
            }
          }}
          className="absolute top-0 pointer-events-none flex items-center justify-center"
          style={{
            left: l.left,
            width: l.size,
            height: l.size,
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
