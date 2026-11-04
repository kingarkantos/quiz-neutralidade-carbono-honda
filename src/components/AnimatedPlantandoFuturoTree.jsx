import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedPlantandoFuturoTree
 * 
 * High-fidelity animated vector recreation of the official "Plantando o Futuro" Honda campaign tree.
 * Features:
 * - Hand-as-trunk motif (warm timber gradient).
 * - Multi-layered lush canopy leaves (dual-tone fresh spring green & forest green).
 * - Delicate leaf veins and grass horizon mound.
 * - Gentle living nature animations: trunk organic breeze sway, staggered leaf rustling,
 *   floating micro-leaf spores, and interactive tap/hover spring feedback.
 */
export default function AnimatedPlantandoFuturoTree({
  className = '',
  size = 56,
  interactive = true,
  animate = true
}) {
  // Leaf definitions positioned along the circular canopy
  // Angles around center (cx: 60, cy: 46), radius: inner ~26, outer ~38
  const outerLeaves = [
    { angle: -168, dist: 38, scale: 0.95, fill: '#62ab35', delay: 0.0 },
    { angle: -148, dist: 40, scale: 1.02, fill: '#73be3d', delay: 0.2 },
    { angle: -130, dist: 42, scale: 1.08, fill: '#7ecc43', delay: 0.4 },
    { angle: -112, dist: 43, scale: 1.05, fill: '#6ab539', delay: 0.1 },
    { angle: -96,  dist: 44, scale: 1.12, fill: '#79c740', delay: 0.3 },
    { angle: -82,  dist: 44, scale: 1.10, fill: '#6cb73b', delay: 0.5 },
    { angle: -66,  dist: 43, scale: 1.05, fill: '#75bf3d', delay: 0.2 },
    { angle: -48,  dist: 42, scale: 1.08, fill: '#7ecc43', delay: 0.4 },
    { angle: -30,  dist: 40, scale: 1.02, fill: '#6eb93c', delay: 0.1 },
    { angle: -12,  dist: 38, scale: 0.95, fill: '#62ab35', delay: 0.3 }
  ];

  const innerLeaves = [
    { angle: -155, dist: 26, scale: 0.88, fill: '#346d24', delay: 0.15 },
    { angle: -136, dist: 27, scale: 0.92, fill: '#3d7b2a', delay: 0.35 },
    { angle: -118, dist: 28, scale: 0.95, fill: '#2e6620', delay: 0.05 },
    { angle: -100, dist: 29, scale: 0.96, fill: '#3d7b2a', delay: 0.45 },
    { angle: -80,  dist: 29, scale: 0.96, fill: '#2e6620', delay: 0.25 },
    { angle: -62,  dist: 28, scale: 0.95, fill: '#3d7b2a', delay: 0.15 },
    { angle: -44,  dist: 27, scale: 0.92, fill: '#488c32', delay: 0.35 },
    { angle: -25,  dist: 26, scale: 0.88, fill: '#346d24', delay: 0.20 }
  ];

  const centerLeaves = [
    { angle: -122, dist: 16, scale: 0.78, fill: '#27581b', delay: 0.2 },
    { angle: -90,  dist: 17, scale: 0.82, fill: '#27581b', delay: 0.4 },
    { angle: -58,  dist: 16, scale: 0.78, fill: '#27581b', delay: 0.1 }
  ];

  const cx = 60;
  const cy = 46;

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size * 1.12 }}
      whileHover={interactive ? { scale: 1.06 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
    >
      <svg
        viewBox="0 0 120 135"
        className="w-full h-full overflow-visible"
        style={{ filter: 'drop-shadow(0 2px 5px rgba(27, 43, 23, 0.12))' }}
      >
        <defs>
          {/* Trunk Gradient: Warm natural timber */}
          <linearGradient id="treeHandTrunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#733f17" />
            <stop offset="50%" stopColor="#5c3111" />
            <stop offset="100%" stopColor="#48240a" />
          </linearGradient>

          {/* Trunk Highlight */}
          <linearGradient id="treeHandHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8c5123" />
            <stop offset="100%" stopColor="#5c3111" />
          </linearGradient>

          {/* Grass Base Gradient */}
          <linearGradient id="treeGrassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#487823" />
            <stop offset="50%" stopColor="#68a635" />
            <stop offset="100%" stopColor="#487823" />
          </linearGradient>

          {/* Reusable Leaf Template (centered at 0,0 with tip pointing UP) */}
          <g id="pfLeafShape">
            <path
              d="M 0 0 C -4 -4 -4.8 -9.5 0 -14 C 4.8 -9.5 4 -4 0 0 Z"
            />
            {/* Subtle center leaf vein */}
            <line
              x1="0"
              y1="-1.5"
              x2="0"
              y2="-11.5"
              stroke="#ffffff"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.32"
            />
          </g>
        </defs>

        {/* --- 1. Grass Ground Base Mound --- */}
        <path
          d="M 12 127 Q 60 121 108 127 C 85 128.5 35 128.5 12 127 Z"
          fill="url(#treeGrassGrad)"
        />
        <path
          d="M 18 127 Q 60 123 102 127"
          stroke="#3d681c"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* --- 2. Floating Spore / Pollen Particles --- */}
        {animate && (
          <>
            <motion.circle
              cx="45"
              cy="25"
              r="1.8"
              fill="#86db49"
              animate={{
                y: [-2, -18],
                x: [-1, -6],
                opacity: [0, 0.75, 0],
                scale: [0.6, 1.1, 0.4]
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.5
              }}
            />
            <motion.circle
              cx="75"
              cy="28"
              r="1.5"
              fill="#9ee866"
              animate={{
                y: [-2, -22],
                x: [1, 7],
                opacity: [0, 0.8, 0],
                scale: [0.7, 1.2, 0.3]
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 1.8
              }}
            />
          </>
        )}

        {/* --- 3. Canopy: Outer Leaf Crown (Fresh Lime / Spring Green) --- */}
        <g id="pfOuterLeaves">
          {outerLeaves.map((leaf, idx) => {
            const rad = (leaf.angle * Math.PI) / 180;
            const lx = cx + Math.cos(rad) * leaf.dist;
            const ly = cy + Math.sin(rad) * leaf.dist;
            // Angle perpendicular to radius so leaf tip points outward
            const rot = leaf.angle + 90;

            return (
              <motion.g
                key={`outer-${idx}`}
                transform={`translate(${lx.toFixed(2)}, ${ly.toFixed(2)}) rotate(${rot.toFixed(1)}) scale(${leaf.scale})`}
                animate={
                  animate
                    ? {
                        rotate: [rot - 2.5, rot + 3, rot - 2.5],
                        scale: [leaf.scale, leaf.scale * 1.05, leaf.scale]
                      }
                    : undefined
                }
                transition={
                  animate
                    ? {
                        duration: 3.2 + (idx % 3) * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: leaf.delay
                      }
                    : undefined
                }
              >
                <use href="#pfLeafShape" fill={leaf.fill} />
              </motion.g>
            );
          })}
        </g>

        {/* --- 4. Canopy: Inner Leaf Layer (Rich Forest / Emerald Green) --- */}
        <g id="pfInnerLeaves">
          {innerLeaves.map((leaf, idx) => {
            const rad = (leaf.angle * Math.PI) / 180;
            const lx = cx + Math.cos(rad) * leaf.dist;
            const ly = cy + Math.sin(rad) * leaf.dist;
            const rot = leaf.angle + 90;

            return (
              <motion.g
                key={`inner-${idx}`}
                transform={`translate(${lx.toFixed(2)}, ${ly.toFixed(2)}) rotate(${rot.toFixed(1)}) scale(${leaf.scale})`}
                animate={
                  animate
                    ? {
                        rotate: [rot + 3, rot - 2, rot + 3],
                        scale: [leaf.scale, leaf.scale * 1.04, leaf.scale]
                      }
                    : undefined
                }
                transition={
                  animate
                    ? {
                        duration: 2.8 + (idx % 3) * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: leaf.delay
                      }
                    : undefined
                }
              >
                <use href="#pfLeafShape" fill={leaf.fill} />
              </motion.g>
            );
          })}
        </g>

        {/* --- 5. Canopy: Deep Center Filler Leaves --- */}
        <g id="pfCenterLeaves">
          {centerLeaves.map((leaf, idx) => {
            const rad = (leaf.angle * Math.PI) / 180;
            const lx = cx + Math.cos(rad) * leaf.dist;
            const ly = cy + Math.sin(rad) * leaf.dist;
            const rot = leaf.angle + 90;

            return (
              <g
                key={`center-${idx}`}
                transform={`translate(${lx.toFixed(2)}, ${ly.toFixed(2)}) rotate(${rot.toFixed(1)}) scale(${leaf.scale})`}
              >
                <use href="#pfLeafShape" fill={leaf.fill} />
              </g>
            );
          })}
        </g>

        {/* --- 6. Hand Trunk (Sways gently from base root) --- */}
        <motion.g
          style={{ transformOrigin: '60px 125px' }}
          animate={
            animate
              ? {
                  rotate: [-0.9, 1.1, -0.9]
                }
              : undefined
          }
          transition={
            animate
              ? {
                  duration: 4.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              : undefined
          }
        >
          {/* Tree Trunk Silhouette Forming Human Forearm & Hand */}
          <path
            d="
              M 48 126
              C 50 110 50 94 48 80
              C 46 72 42 66 35 59
              C 30 54 31 49 36 47
              C 40 45 44 48 46 54
              C 47 55 48 56 49 50
              C 48 40 46 30 48 25
              C 50 21 53 21 55 25
              C 57 31 57 42 57 47
              C 58 42 58 31 59 19
              C 60 15 64 15 66 19
              C 68 26 68 39 68 47
              C 69 41 70 32 72 24
              C 74 20 77 20 79 24
              C 81 31 80 42 79 51
              C 80 47 82 39 85 34
              C 88 30 91 32 91 37
              C 91 43 87 53 82 63
              C 78 71 74 78 73 87
              C 71 99 72 113 74 126
              Z
            "
            fill="url(#treeHandTrunkGrad)"
          />

          {/* Palm Creases & Bark Grain Texture */}
          <path
            d="M 50 74 Q 60 78 70 72"
            stroke="#3a1c06"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M 53 62 Q 61 65 69 60"
            stroke="#3a1c06"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 52 92 C 51 102 52 112 51 122"
            stroke="url(#treeHandHighlight)"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

