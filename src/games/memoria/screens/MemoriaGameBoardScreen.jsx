import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import GameTimer from '../../../components/GameTimer';
import { MEMORIA_ROUNDS } from '../data/memoriaData';
import MemoriaMatchModal from './MemoriaMatchModal';

// Fisher-Yates shuffle
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoriaGameBoardScreen({ roundNumber = 1, onFinish }) {
  const roundData = MEMORIA_ROUNDS[roundNumber] || MEMORIA_ROUNDS[1];

  // Build 10 cards (5 pairs) and shuffle them
  const initialCards = useMemo(() => {
    const pairs = [];
    roundData.cards.forEach((item) => {
      // Card A
      pairs.push({
        uniqueId: `${item.id}-a`,
        pairId: item.id,
        item
      });
      // Card B
      pairs.push({
        uniqueId: `${item.id}-b`,
        pairId: item.id,
        item
      });
    });
    return shuffle(pairs);
  }, [roundData]);

  const [cards, setCards] = useState(initialCards);
  const [flippedIds, setFlippedIds] = useState([]); // currently selected 1 or 2 card uniqueIds
  const [matchedPairIds, setMatchedPairIds] = useState(new Set()); // set of item.id that are solved
  const [activeModalCard, setActiveModalCard] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutos (120s)

  // Cronômetro regressivo: 2 minutos para o Jogo da Memória
  // Pausa durante a exibição do modal explicativo (activeModalCard)
  useEffect(() => {
    if (activeModalCard !== null || matchedPairIds.size === 5) return;

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
  }, [activeModalCard, matchedPairIds.size, timeLeft, onFinish]);

  // When cards are clicked
  const handleCardClick = (card) => {
    if (isProcessing) return;
    if (matchedPairIds.has(card.pairId)) return;
    if (flippedIds.includes(card.uniqueId)) return;

    if (flippedIds.length === 0) {
      setFlippedIds([card.uniqueId]);
    } else if (flippedIds.length === 1) {
      const firstCardId = flippedIds[0];
      const firstCard = cards.find(c => c.uniqueId === firstCardId);
      setFlippedIds([firstCardId, card.uniqueId]);

      // Check match
      if (firstCard.pairId === card.pairId) {
        // MATCH!
        setIsProcessing(true);
        setTimeout(() => {
          const newMatched = new Set(matchedPairIds);
          newMatched.add(card.pairId);
          setMatchedPairIds(newMatched);
          setFlippedIds([]);
          setIsProcessing(false);
          setActiveModalCard(card.item);
        }, 500);
      } else {
        // NO MATCH -> Flip back after short delay
        setIsProcessing(true);
        setTimeout(() => {
          setFlippedIds([]);
          setIsProcessing(false);
        }, 900);
      }
    }
  };

  const handleCloseModal = () => {
    const isCompleted = matchedPairIds.size === 5;
    setActiveModalCard(null);
    if (isCompleted) {
      onFinish();
    }
  };

  // Group 10 cards into 3 rows matching mockup: 3 cards, 4 cards, 3 cards
  const row1 = cards.slice(0, 3);
  const row2 = cards.slice(3, 7);
  const row3 = cards.slice(7, 10);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#ecdcc1]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/jogo3/FUNDOS/slice-1-1.png')` }}
      />

      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Header */}
      <Header className="pt-3 pb-1" />

      {/* Stepper */}
      <div className="relative z-10 w-full px-4 flex flex-col items-center select-none pt-1">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-2 bg-[#FAF5EC]/90 px-4 py-1.5 rounded-full shadow-sm border border-white">
            <span className="text-[#1A2E1A] font-extrabold text-xs uppercase tracking-wider">
              PARES ENCONTRADOS
            </span>
            <div className="flex items-center space-x-1.5">
              {[0, 1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    idx < matchedPairIds.size ? 'bg-[#2EB85C]' : 'bg-[#cfc3a7]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="bg-[#1C3B24] text-white text-[10px] sm:text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-sm">
              Rodada {roundNumber} de 2
            </span>
            <GameTimer secondsLeft={timeLeft} />
          </div>
        </div>
      </div>

      {/* Main Board: 3-4-3 Card Layout */}
      <div className="relative z-10 flex-1 min-h-0 px-2 xs:px-3 sm:px-4 py-1 max-w-lg mx-auto w-full flex flex-col justify-center items-center space-y-2.5 xs:space-y-3 sm:space-y-4 my-auto">
        {/* Row 1 (3 cards) */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-3.5 w-full">
          {row1.map((c) => (
            <MemoryCard
              key={c.uniqueId}
              card={c}
              isFlipped={flippedIds.includes(c.uniqueId) || matchedPairIds.has(c.pairId)}
              isMatched={matchedPairIds.has(c.pairId)}
              onClick={() => handleCardClick(c)}
            />
          ))}
        </div>

        {/* Row 2 (4 cards) */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-3.5 w-full">
          {row2.map((c) => (
            <MemoryCard
              key={c.uniqueId}
              card={c}
              isFlipped={flippedIds.includes(c.uniqueId) || matchedPairIds.has(c.pairId)}
              isMatched={matchedPairIds.has(c.pairId)}
              onClick={() => handleCardClick(c)}
            />
          ))}
        </div>

        {/* Row 3 (3 cards) */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-2.5 sm:gap-3.5 w-full">
          {row3.map((c) => (
            <MemoryCard
              key={c.uniqueId}
              card={c}
              isFlipped={flippedIds.includes(c.uniqueId) || matchedPairIds.has(c.pairId)}
              isMatched={matchedPairIds.has(c.pairId)}
              onClick={() => handleCardClick(c)}
            />
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full px-6 pb-4 pt-1 text-center select-none flex-shrink-0">
        <p className="text-[#4b5d4c] font-semibold text-[11px] sm:text-xs">
          Toque nas cartas para encontrar as fontes correspondentes.
        </p>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {activeModalCard && (
          <MemoriaMatchModal
            card={activeModalCard}
            onClose={handleCloseModal}
            isLast={matchedPairIds.size === 5}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual 3D Flip Card Component
function MemoryCard({ card, isFlipped, isMatched, onClick }) {
  return (
    <div 
      className="relative w-[78px] h-[112px] xs:w-[90px] xs:h-[128px] sm:w-[110px] sm:h-[154px] cursor-pointer select-none perspective-[1000px] flex-shrink-0"
      onClick={onClick}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="w-full h-full relative preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* CARD BACK (Embossed Leaf Image) */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-md border-2 border-white backface-hidden flex items-center justify-center bg-[#1C3B24]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src="/assets/jogo3/FUNDOS/cartao-verde-com-folha-em-relevo.png"
            alt="Carta Honda"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* CARD FRONT (Photo + Title) */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-lg border-2 p-1.5 xs:p-2 sm:p-2.5 flex flex-col justify-between items-center bg-[#FAF5EC] text-center backface-hidden ${
            isMatched 
              ? 'border-[#2EB85C] ring-2 ring-[#2EB85C]/40 bg-[#FAF5EC]' 
              : 'border-white'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Photo */}
          <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-[#E5DAC6] mb-1">
            <img
              src={card.item.image}
              alt={card.item.name}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </div>

          {/* Name - Sempre visível, quebra de linha sem corte */}
          <div className="w-full min-h-[22px] xs:min-h-[26px] sm:min-h-[30px] flex items-center justify-center px-0.5">
            <p className="text-[#1A2E1A] font-black text-[8px] xs:text-[9.5px] sm:text-[11px] leading-[1.08] text-center w-full break-words hyphens-auto">
              {card.item.name}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

