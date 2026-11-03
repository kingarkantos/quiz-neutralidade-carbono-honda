import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import GameTimer from '../../../components/GameTimer';
import { LIGUE_PONTOS_ITEMS } from '../data/liguePontosData';
import LpSuccessModal from './LpSuccessModal';
import LpWrongModal from './LpWrongModal';
import { Check } from 'lucide-react';

// Cores únicas e distintas para cada par/conexão (sem vermelho)
const PAIR_COLORS = {
  1: {
    border: 'border-[#2EB85C]',
    bgMatched: 'bg-[#2EB85C]/15',
    bgDot: 'bg-[#2EB85C]',
    text: 'text-[#2EB85C]',
    ring: 'ring-[#2EB85C]/35',
  },
  2: {
    border: 'border-[#0284c7]',
    bgMatched: 'bg-[#0284c7]/15',
    bgDot: 'bg-[#0284c7]',
    text: 'text-[#0284c7]',
    ring: 'ring-[#0284c7]/35',
  },
  3: {
    border: 'border-[#d97706]',
    bgMatched: 'bg-[#d97706]/15',
    bgDot: 'bg-[#d97706]',
    text: 'text-[#d97706]',
    ring: 'ring-[#d97706]/35',
  },
  4: {
    border: 'border-[#7c3aed]',
    bgMatched: 'bg-[#7c3aed]/15',
    bgDot: 'bg-[#7c3aed]',
    text: 'text-[#7c3aed]',
    ring: 'ring-[#7c3aed]/35',
  },
  5: {
    border: 'border-[#0d9488]',
    bgMatched: 'bg-[#0d9488]/15',
    bgDot: 'bg-[#0d9488]',
    text: 'text-[#0d9488]',
    ring: 'ring-[#0d9488]/35',
  },
};

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Retorna ações e benefícios embaralhados aleatoriamente a cada partida
// Garantindo que nenhum benefício fique alinhado horizontalmente na mesma linha da sua ação
function getShuffledBoard() {
  const actions = shuffle(LIGUE_PONTOS_ITEMS);
  let benefits = shuffle(LIGUE_PONTOS_ITEMS);

  let attempts = 0;
  while (attempts < 20 && actions.some((act, idx) => act.benefitId === benefits[idx]?.benefitId)) {
    benefits = shuffle(LIGUE_PONTOS_ITEMS);
    attempts++;
  }

  if (actions.some((act, idx) => act.benefitId === benefits[idx]?.benefitId)) {
    benefits = [...benefits.slice(1), benefits[0]];
  }

  return { actions, benefits };
}

export default function LpGameBoardScreen({ onFinish }) {
  // Ações e Benefícios sempre aleatórios a cada nova partida
  const { actions, benefits } = useMemo(() => getShuffledBoard(), []);

  const [selectedActionId, setSelectedActionId] = useState(null);
  const [selectedBenefitId, setSelectedBenefitId] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set()); // set of action ids matched
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minuto (60s)

  // Cronômetro regressivo: 1 minuto para o Ligue os Pontos
  // Pausa durante modais explicativos ou modal de erro
  useEffect(() => {
    if (activeModalItem !== null || showWrongModal || matchedIds.size === actions.length) return;

    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeModalItem, showWrongModal, matchedIds.size, actions.length, timeLeft, onFinish]);

  // Active focused item for the 3D highlight spotlight preview
  const activeItem = actions.find(a => a.id === selectedActionId) || 
    (selectedBenefitId ? actions.find(a => a.benefitId === selectedBenefitId) : null);

  // Handle action click
  const handleSelectAction = (id) => {
    if (matchedIds.has(id)) return;
    setSelectedActionId(id);

    // If a benefit is already selected, check match
    if (selectedBenefitId) {
      checkMatch(id, selectedBenefitId);
    }
  };

  // Handle benefit click
  const handleSelectBenefit = (bId) => {
    // Check if this benefit's action is already matched
    const isAlreadyMatched = Array.from(matchedIds).some(
      aId => actions.find(a => a.id === aId)?.benefitId === bId
    );
    if (isAlreadyMatched) return;

    setSelectedBenefitId(bId);

    // If an action is already selected, check match
    if (selectedActionId) {
      checkMatch(selectedActionId, bId);
    }
  };

  // Check matching logic
  const checkMatch = (aId, bId) => {
    const act = actions.find(a => a.id === aId);
    if (act && act.benefitId === bId) {
      // MATCH!
      const newMatched = new Set(matchedIds);
      newMatched.add(aId);
      setMatchedIds(newMatched);
      setSelectedActionId(null);
      setSelectedBenefitId(null);
      setActiveModalItem(act);
    } else {
      // WRONG!
      setShowWrongModal(true);
      setSelectedActionId(null);
      setSelectedBenefitId(null);
    }
  };

  const handleCloseSuccess = () => {
    const isCompleted = matchedIds.size === actions.length;
    setActiveModalItem(null);
    if (isCompleted) {
      onFinish();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />

      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Top Header */}
      <Header className="pt-3 pb-1" />

      {/* Stepper & Instructions */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center text-center select-none pt-1">
        {/* Stepper Dots & Timer */}
        <div className="flex items-center justify-center space-x-2 mb-1.5">
          <div className="flex items-center space-x-2 bg-[#FAF5EC]/90 px-3.5 py-1.5 rounded-full shadow-sm border border-white">
            <span className="text-[#1A2E1A] font-extrabold text-xs uppercase tracking-wider">
              Conexões: {matchedIds.size} de {actions.length}
            </span>
            <div className="flex items-center space-x-1.5">
              {actions.map((act, i) => {
                const isActMatched = matchedIds.has(act.id);
                const actColor = PAIR_COLORS[act.id] || PAIR_COLORS[1];
                return (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      isActMatched ? actColor.bgDot : 'bg-[#cfc3a7]'
                    }`}
                  />
                );
              })}
            </div>
          </div>
          <GameTimer secondsLeft={timeLeft} />
        </div>

        <p className="text-[#1A2E1A] font-bold text-xs sm:text-sm">
          Toque em uma ação e depois no benefício correspondente.
        </p>
      </div>

      {/* Spotlight 3D Preview - Perfectly centered in the entire upper space */}
      <div className="relative z-10 flex-1 min-h-[140px] xs:min-h-[160px] sm:min-h-[190px] w-full px-4 flex flex-col items-center justify-center my-auto select-none">
        <AnimatePresence mode="wait">
          {activeItem ? (
            <motion.div
              key={activeItem.id}
              initial={{ scale: 0.7, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 340, damping: 22 }}
              className="relative flex flex-col items-center justify-center select-none"
            >
              {/* Radial Eco Aura */}
              <motion.div
                animate={{ scale: [0.95, 1.25, 0.95], opacity: [0.35, 0.7, 0.35] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 rounded-full bg-[#3cd426]/35 blur-2xl -z-10 pointer-events-none"
              />

              {/* 3D Highlighted Illustration - Much larger, perfectly centered, no distortion */}
              <motion.img
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: 'easeInOut' }}
                src={activeItem.actionThumb}
                alt={activeItem.actionTitle}
                className="h-24 xs:h-30 sm:h-38 max-h-[35vh] w-auto object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.32)] pointer-events-none"
              />

              {/* Active Item Title Pill */}
              <motion.span 
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-white/95 backdrop-blur-sm text-[#1C3B24] font-black text-xs sm:text-sm uppercase px-4 py-1 rounded-full shadow-md border border-[#2EB85C]/35"
              >
                {activeItem.actionTitle}
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center select-none py-2"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-[#2EB85C]/45 flex items-center justify-center bg-[#FAF5EC]/70 mb-1.5 shadow-sm">
                <img
                  src="/assets/jogo2/ELEMENTOS/TELA INICIAL/ciclo-sustentavel-entre-maquina-e-natureza-1.png"
                  alt=""
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain opacity-75 pointer-events-none"
                />
              </div>
              <span className="text-[#3b4f3c] font-bold text-[11px] sm:text-xs">
                Toque em uma opção para destacar
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Board: 2 Columns - Anchored comfortably at the lower zone */}
      <div className="relative z-10 flex-shrink-0 px-3 sm:px-4 pt-1 pb-2 sm:pb-3 max-w-xl mx-auto w-full flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Column: AÇÕES */}
        <div className="flex-1 flex flex-col space-y-2 sm:space-y-2.5 min-w-0">
          <div className="text-center font-black text-xs sm:text-sm text-[#1C3B24] uppercase tracking-wider pb-0.5">
            AÇÕES
          </div>
          {actions.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedActionId === item.id;
            const pairColor = PAIR_COLORS[item.id] || PAIR_COLORS[1];

            return (
              <motion.div
                key={item.id}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleSelectAction(item.id)}
                className={`relative flex items-center justify-between p-2 sm:p-2.5 rounded-[18px] transition-all duration-200 select-none cursor-pointer ${
                  isMatched
                    ? `${pairColor.bgMatched} border-2 ${pairColor.border} opacity-95 shadow-sm`
                    : isSelected
                    ? `bg-white border-2 ${pairColor.border} shadow-lg ring-4 ${pairColor.ring}`
                    : 'bg-[#faf5ec]/95 border border-white/80 shadow-md hover:bg-white'
                }`}
              >
                {/* Thumb */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[#eadecc]/70 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.actionThumb}
                    alt={item.actionTitle}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                </div>

                {/* Title */}
                <div className="flex-1 px-2.5 text-left min-w-0">
                  <p className="text-[#1A2E1A] font-bold text-xs sm:text-sm leading-tight break-words">
                    {item.actionTitle}
                  </p>
                </div>

                {/* Connector Dot */}
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isMatched
                    ? `${pairColor.bgDot} text-white shadow-sm`
                    : isSelected
                    ? `${pairColor.bgDot} text-white animate-pulse`
                    : 'bg-[#d8ccb8] border border-white'
                }`}>
                  {isMatched && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: BENEFÍCIOS */}
        <div className="flex-1 flex flex-col space-y-2 sm:space-y-2.5 min-w-0">
          <div className="text-center font-black text-xs sm:text-sm text-[#1C3B24] uppercase tracking-wider pb-0.5">
            BENEFÍCIOS
          </div>
          {benefits.map((b) => {
            const matchingAction = actions.find(a => a.benefitId === b.benefitId);
            const isMatched = matchingAction ? matchedIds.has(matchingAction.id) : false;
            const isSelected = selectedBenefitId === b.benefitId;
            const pairColor = matchingAction ? (PAIR_COLORS[matchingAction.id] || PAIR_COLORS[1]) : PAIR_COLORS[1];

            return (
              <motion.div
                key={b.benefitId}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleSelectBenefit(b.benefitId)}
                className={`relative flex items-center justify-between p-2 sm:p-2.5 rounded-[18px] transition-all duration-200 select-none cursor-pointer ${
                  isMatched
                    ? `${pairColor.bgMatched} border-2 ${pairColor.border} opacity-95 shadow-sm`
                    : isSelected
                    ? `bg-white border-2 ${pairColor.border} shadow-lg ring-4 ${pairColor.ring}`
                    : 'bg-[#faf5ec]/95 border border-white/80 shadow-md hover:bg-white'
                }`}
              >
                {/* Connector Dot */}
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isMatched
                    ? `${pairColor.bgDot} text-white shadow-sm`
                    : isSelected
                    ? `${pairColor.bgDot} text-white animate-pulse`
                    : 'bg-[#d8ccb8] border border-white'
                }`}>
                  {isMatched && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Leaf Icon + Benefit Title */}
                <div className="flex-1 px-2.5 text-left min-w-0">
                  <div className="flex items-center space-x-1 mb-0.5">
                    <img 
                      src="/assets/elements/folha.png" 
                      alt="Folha" 
                      className="w-3 h-3 object-contain" 
                    />
                    <span className={`font-black text-[9px] uppercase tracking-wider ${isMatched ? pairColor.text : 'text-[#2EB85C]'}`}>
                      IMPACTO
                    </span>
                  </div>
                  <p className="text-[#1A2E1A] font-bold text-xs sm:text-sm leading-tight break-words">
                    {b.benefitTitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer status / helper */}
      <div className="relative z-10 w-full px-6 pb-4 pt-1 flex justify-center text-center select-none flex-shrink-0">
        <p className="text-[#4b5d4c] font-medium text-[11px] sm:text-xs">
          {matchedIds.size === actions.length 
            ? "Todas as conexões completas! Toque para finalizar."
            : "Toque em um item de cada lado para formar o par sustentável."}
        </p>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModalItem && (
          <LpSuccessModal
            item={activeModalItem}
            onClose={handleCloseSuccess}
            isLast={matchedIds.size === actions.length}
          />
        )}

        {showWrongModal && (
          <LpWrongModal onClose={() => setShowWrongModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

