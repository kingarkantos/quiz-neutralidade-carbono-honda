import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CornerFoliage from '../components/CornerFoliage';
import FallingLeavesMatrix from '../components/FallingLeavesMatrix';
import { ChevronRight, HelpCircle, GitFork, Sparkles } from 'lucide-react';

export default function HubScreen() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'quiz',
      route: '/quiz',
      badge: 'JOGO 1 • CONSCIENTIZAÇÃO',
      title: 'Quiz Neutralidade de Carbono',
      desc: 'Descubra atitudes individuais e coletivas rumo ao zero de emissões.',
      image: '/assets/logos/quiz-logo.png',
      btnText: 'JOGAR QUIZ',
      btnColor: 'btn-tactile-green',
      icon: HelpCircle,
      accentGlow: 'rgba(46, 184, 92, 0.35)'
    },
    {
      id: 'ligue-pontos',
      route: '/ligue-os-pontos',
      badge: 'JOGO 2 • LIGUE OS PONTOS',
      title: 'Circulação de Recursos',
      desc: 'Conecte as ações da fábrica aos seus benefícios sustentáveis.',
      image: '/assets/jogo2/ELEMENTOS/TELA INICIAL/ciclo-sustentavel-entre-maquina-e-natureza-1.png',
      btnText: 'LIGAR PONTOS',
      btnColor: 'btn-tactile-green',
      icon: GitFork,
      accentGlow: 'rgba(60, 212, 38, 0.35)'
    },
    {
      id: 'memoria',
      route: '/jogo-da-memoria',
      badge: 'JOGO 3 • JOGO DA MEMÓRIA',
      title: 'Energia Limpa',
      desc: 'Encontre os pares de fontes de energia renováveis e de transição.',
      image: '/assets/jogo3/TELA INICIAL/turbinas-eolicas-nas-colinas-verdes-1.png',
      btnText: 'JOGAR MEMÓRIA',
      btnColor: 'btn-tactile-green',
      icon: Sparkles,
      accentGlow: 'rgba(127, 208, 63, 0.4)'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb]">
      {/* Background Image: Foliage / Nature texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-80"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      {/* Falling Vector Leaves (Matrix effect flowing in the background) */}
      <FallingLeavesMatrix count={24} className="absolute inset-0 overflow-hidden pointer-events-none z-10" />

      {/* Foliage corner accents */}
      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Header */}
      <div className="relative z-30 w-full flex flex-col items-center">
        <Header className="pt-3 pb-1" showMenuButton={false} />

        {/* Portal Headline */}
        <div className="w-full flex flex-col items-center text-center px-4 pt-1 max-w-lg mx-auto select-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            className="inline-flex items-center space-x-2 bg-[#1C3B24] text-[#FAF5EC] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-md mb-1.5"
          >
            <span>ESCOLHA UMA ATIVIDADE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[#1A2E1A] font-black text-xl sm:text-2xl tracking-tight uppercase leading-none drop-shadow-sm"
          >
            EXPERIÊNCIAS SUSTENTÁVEIS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#3b4c3c] font-semibold text-xs sm:text-sm mt-0.5"
          >
            Toque em um jogo para iniciar a experiência interativa.
          </motion.p>
        </div>
      </div>

      {/* Main List of 3 Games */}
      <div className="relative z-30 flex-1 min-h-0 flex flex-col justify-center px-4 sm:px-6 py-2 max-w-lg mx-auto w-full space-y-3 sm:space-y-3.5 my-auto">
        {games.map((g, idx) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, x: -35, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              delay: 0.15 + idx * 0.12
            }}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(g.route)}
            className="group relative bg-[#FAF5EC]/95 backdrop-blur-md rounded-[24px] p-3.5 sm:p-4 shadow-3d-card border border-white/80 cursor-pointer flex items-center justify-between transition-all duration-200 overflow-hidden"
          >
            {/* Subtle glow accent on hover */}
            <div 
              className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity"
              style={{ backgroundColor: g.accentGlow }}
            />

            {/* Left Thumbnail Illustration */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#EBE0CC]/60 flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden shadow-inner border border-white/60">
              <img
                src={g.image}
                alt={g.title}
                className="w-full h-full object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-300 pointer-events-none"
              />
            </div>

            {/* Middle Info */}
            <div className="flex-1 px-3 sm:px-4 text-left min-w-0">
              <span className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#2EB85C] bg-[#2EB85C]/12 px-2.5 py-0.5 rounded-full mb-1">
                {g.badge}
              </span>
              <h2 className="text-[#1A2E1A] font-extrabold text-base sm:text-lg leading-tight truncate">
                {g.title}
              </h2>
              <p className="text-[#4b5d4c] font-medium text-xs leading-snug line-clamp-2 mt-0.5">
                {g.desc}
              </p>
            </div>

            {/* Right Action Button Arrow */}
            <div className="flex-shrink-0 pl-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full btn-tactile-green flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="relative z-30 w-full px-6 pb-4 pt-1 text-center select-none flex-shrink-0">
        <p className="text-[#1A2E1A]/60 font-semibold text-[11px] sm:text-xs">
          Honda • Tripla Ação Para o Zero • 50 Anos no Brasil
        </p>
      </div>
    </div>
  );
}

