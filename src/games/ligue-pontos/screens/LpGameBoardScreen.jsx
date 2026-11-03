import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import { LIGUE_PONTOS_ITEMS } from '../data/liguePontosData';
import LpSuccessModal from './LpSuccessModal';
import LpWrongModal from './LpWrongModal';
import { Check } from 'lucide-react';

export default function LpGameBoardScreen({ onFinish }) {
  // 5 items
  const actions = useMemo(() => LIGUE_PONTOS_ITEMS, []);
  
  // Shuffled benefits so they don't appear in the exact same order as actions
  const benefits = useMemo(() => {
    // Fixed deterministic shuffle for great puzzle flow: [3, 1, 5, 2, 4]
    const order = [2, 0, 4, 1, 3];
    return order.map(i => LIGUE_PONTOS_ITEMS[i]);
  }, []);

  const [selectedActionId, setSelectedActionId] = useState(null);
  const [selectedBenefitId, setSelectedBenefitId] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set()); // set of action ids matched
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showWrongModal, setShowWrongModal] = useState(false);

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
        {/* Stepper Dots */}
        <div className="flex items-center space-x-2 bg-[#FAF5EC]/90 px-4 py-1.5 rounded-full shadow-sm border border-white mb-1.5">
          <span className="text-[#1A2E1A] font-extrabold text-xs uppercase tracking-wider">
            Conexões: {matchedIds.size} de {actions.length}
          </span>
          <div className="flex items-center space-x-1.5">
            {actions.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i < matchedIds.size ? 'bg-[#2EB85C]' : 'bg-[#cfc3a7]'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-[#1A2E1A] font-bold text-xs sm:text-sm">
          Toque em uma ação e depois no benefício correspondente.
        </p>
      </div>

      {/* Main Board: 2 Columns */}
      <div className="relative z-10 flex-1 min-h-0 px-3 sm:px-4 py-1 max-w-xl mx-auto w-full flex items-center justify-between gap-3 sm:gap-4 my-auto">
        {/* Left Column: AÇÕES */}
        <div className="flex-1 flex flex-col space-y-2 sm:space-y-2.5 min-w-0">
          <div className="text-center font-black text-xs sm:text-sm text-[#1C3B24] uppercase tracking-wider pb-0.5">
            AÇÕES
          </div>
          {actions.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedActionId === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleSelectAction(item.id)}
                className={`relative flex items-center justify-between p-1.5 sm:p-2 rounded-[18px] transition-all duration-200 select-none cursor-pointer ${
                  isMatched
                    ? 'bg-[#2EB85C]/20 border-2 border-[#2EB85C] opacity-90'
                    : isSelected
                    ? 'bg-white border-2 border-[#2EB85C] shadow-lg ring-4 ring-[#2EB85C]/30'
                    : 'bg-[#faf5ec]/95 border border-white/80 shadow-md hover:bg-white'
                }`}
              >
                {/* Thumb */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#eadecc]/70 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.actionThumb}
                    alt={item.actionTitle}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                </div>

                {/* Title */}
                <div className="flex-1 px-2 text-left min-w-0">
                  <p className="text-[#1A2E1A] font-bold text-[11px] sm:text-xs leading-tight line-clamp-2">
                    {item.actionTitle}
                  </p>
                </div>

                {/* Connector Dot */}
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isMatched
                    ? 'bg-[#2EB85C] text-white shadow-sm'
                    : isSelected
                    ? 'bg-[#2EB85C] text-white animate-pulse'
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
            const isMatched = Array.from(matchedIds).some(
              aId => actions.find(a => a.id === aId)?.benefitId === b.benefitId
            );
            const isSelected = selectedBenefitId === b.benefitId;

            return (
              <motion.div
                key={b.benefitId}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleSelectBenefit(b.benefitId)}
                className={`relative flex items-center justify-between p-1.5 sm:p-2 rounded-[18px] transition-all duration-200 select-none cursor-pointer ${
                  isMatched
                    ? 'bg-[#2EB85C]/20 border-2 border-[#2EB85C] opacity-90'
                    : isSelected
                    ? 'bg-white border-2 border-[#2EB85C] shadow-lg ring-4 ring-[#2EB85C]/30'
                    : 'bg-[#faf5ec]/95 border border-white/80 shadow-md hover:bg-white'
                }`}
              >
                {/* Connector Dot */}
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isMatched
                    ? 'bg-[#2EB85C] text-white shadow-sm'
                    : isSelected
                    ? 'bg-[#2EB85C] text-white animate-pulse'
                    : 'bg-[#d8ccb8] border border-white'
                }`}>
                  {isMatched && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* Leaf Icon + Benefit Title */}
                <div className="flex-1 px-2 text-left min-w-0">
                  <div className="flex items-center space-x-1 mb-0.5">
                    <img 
                      src="/assets/elements/folha.png" 
                      alt="Folha" 
                      className="w-3 h-3 object-contain" 
                    />
                    <span className="text-[#2EB85C] font-black text-[9px] uppercase tracking-wider">
                      IMPACTO
                    </span>
                  </div>
                  <p className="text-[#1A2E1A] font-bold text-[11px] sm:text-xs leading-tight line-clamp-2">
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
