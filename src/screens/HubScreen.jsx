import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CornerFoliage from '../components/CornerFoliage';
import FallingLeavesMatrix from '../components/FallingLeavesMatrix';
import ZoomContent from '../components/ZoomContent';
import { ChevronRight, HelpCircle, GitFork, Sparkles, Sprout, BarChart3 } from 'lucide-react';
import { preloadCriticalAssets } from '../utils/assetPreloader';

export default function HubScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    preloadCriticalAssets();
  }, []);

  const games = [
    {
      id: 'quiz',
      route: '/quiz',
      badge: 'JOGO 1 • CONSCIENTIZAÇÃO',
      title: 'Quiz Neutralidade de Carbono',
      desc: 'Descubra atitudes individuais e coletivas rumo ao zero de emissões.',
      image: '/assets/logos/quiz-logo.webp',
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
      image: '/assets/jogo2/ELEMENTOS/TELA INICIAL/ciclo-sustentavel-entre-maquina-e-natureza-1.webp',
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
      image: '/assets/jogo3/TELA INICIAL/turbinas-eolicas-nas-colinas-verdes-1.webp',
      btnText: 'JOGAR MEMÓRIA',
      btnColor: 'btn-tactile-green',
      icon: Sparkles,
      accentGlow: 'rgba(127, 208, 63, 0.4)'
    },
    {
      id: 'plantando-futuro',
      route: '/plantando-o-futuro',
      badge: 'AÇÃO SOCIAL • MEIO AMBIENTE',
      title: 'Plantando o Futuro',
      desc: 'Conheça as espécies nativas e escolha a sua muda de árvore.',
      image: '/assets/plantando-futuro/icones/muda-kraft.webp',
      btnText: 'ESCOLHER MUDA',
      btnColor: 'btn-tactile-green',
      icon: Sprout,
      accentGlow: 'rgba(34, 197, 94, 0.45)'
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb]">
      {/* Background Image: Foliage / Nature texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-80"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />

      {/* Falling Vector Leaves (Matrix effect flowing in the background) */}
      <FallingLeavesMatrix count={24} className="absolute inset-0 overflow-hidden pointer-events-none z-10" />

      {/* Foliage corner accents */}
      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-2 px-4">
        {/* Header */}
        <div className="w-full flex flex-col items-center">
          <Header className="pt-2 sm:pt-3 pb-0" showMenuButton={false} />

        {/* Portal Headline */}
        <div className="w-full flex flex-col items-center text-center px-4 pt-1 max-w-lg mx-auto select-none">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[#1A2E1A] font-black text-lg sm:text-xl tracking-tight uppercase leading-none drop-shadow-sm"
          >
            EXPERIÊNCIAS SUSTENTÁVEIS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-[#3b4c3c] font-semibold text-[11px] sm:text-xs mt-0.5"
          >
            Toque em uma opção para iniciar a experiência.
          </motion.p>
        </div>
      </div>

      {/* Main List of 4 Modules */}
      <div className="relative z-30 flex-1 min-h-0 flex flex-col justify-center px-3.5 sm:px-6 py-1.5 max-w-lg mx-auto w-full space-y-2 sm:space-y-2.5 my-auto overflow-y-auto">
        {games.map((g, idx) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              delay: 0.1 + idx * 0.08
            }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(g.route)}
            className="group relative bg-[#FAF5EC]/95 backdrop-blur-md rounded-[22px] p-2.5 sm:p-3 shadow-md border border-white/80 cursor-pointer flex items-center justify-between transition-all duration-200 overflow-hidden"
          >
            {/* Subtle glow accent on hover */}
            <div 
              className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-35 group-hover:opacity-70 transition-opacity"
              style={{ backgroundColor: g.accentGlow }}
            />

            {/* Left Thumbnail Illustration */}
            <div 
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#EBE0CC]/60 flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden shadow-inner border border-white/60"
              style={{ width: '68px', height: '68px', minWidth: '68px', minHeight: '68px', maxWidth: '68px', maxHeight: '68px' }}
            >
              <img
                src={g.image}
                alt={g.title}
                className="w-full h-full max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-108 transition-transform duration-300 pointer-events-none"
                style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Middle Info */}
            <div className="flex-1 px-3 sm:px-3.5 text-left min-w-0">
              <span className="inline-block text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#2EB85C] bg-[#2EB85C]/12 px-2 py-0.5 rounded-full mb-0.5">
                {g.badge}
              </span>
              <h2 className="text-[#1A2E1A] font-extrabold text-sm sm:text-base leading-tight truncate">
                {g.title}
              </h2>
              <p className="text-[#4b5d4c] font-medium text-[11px] leading-snug line-clamp-2 mt-0.5">
                {g.desc}
              </p>
            </div>

            {/* Right Action Button Arrow */}
            <div className="flex-shrink-0 pl-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full btn-tactile-green flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

        {/* Footer Info & Link to /plantas Dashboard */}
        <div className="w-full px-5 pb-6 sm:pb-8 pt-1 text-center select-none flex-shrink-0 flex items-center justify-between max-w-lg mx-auto text-[10.5px] sm:text-xs text-[#1A2E1A]/70">
          <span>Honda • 50 Anos no Brasil</span>
          <button 
            onClick={() => navigate('/plantas')}
            className="flex items-center space-x-1 font-bold text-[#2EB85C] hover:underline"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Painel /plantas</span>
          </button>
        </div>
      </ZoomContent>
    </div>
  );
}
