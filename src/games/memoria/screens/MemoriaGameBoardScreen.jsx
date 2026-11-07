import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/Header';
import CornerFoliage from '../../../components/CornerFoliage';
import ZoomContent from '../../../components/ZoomContent';
import GameTimer from '../../../components/GameTimer';
import { getMixedMemoriaCards } from '../data/memoriaData';
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

export default function MemoriaGameBoardScreen({ onFinish }) {
  // Build 10 cards (5 pairs) mixed between Renováveis and Transição
  const initialCards = useMemo(() => {
    const mixedCards = getMixedMemoriaCards();
    const pairs = [];
    mixedCards.forEach((item) => {
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
  }, []);

  const [cards, setCards] = useState(initialCards);
  const [flippedIds, setFlippedIds] = useState([]); // currently selected 1 or 2 card uniqueIds
  const [matchedPairIds, setMatchedPairIds] = useState(new Set()); // set of item.id that are solved
  const [activeModalCard, setActiveModalCard] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90); // 1:30s (90 segundos)

  // Cronômetro regressivo: 1:30s (90s) para o Jogo da Memória
  // Pausa durante a exibição do modal explicativo (activeModalCard)
  useEffect(() => {
    if (activeModalCard !== null || matchedPairIds.size === 5) return;

    if (timeLeft <= 0) {
      onFinish({ isTimeUp: true, pairsFound: matchedPairIds.size });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinish({ isTimeUp: true, pairsFound: matchedPairIds.size });
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
      onFinish({ isTimeUp: false, pairsFound: 5 });
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
        style={{ backgroundImage: `url('/assets/jogo3/FUNDOS/slice-1-1.webp')` }}
      />

      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-2 px-3 sm:px-4">
        {/* Header */}
        <Header className="pt-2 pb-1" />

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
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${idx < matchedPairIds.size ? 'bg-[#2EB85C]' : 'bg-[#cfc3a7]'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <span className="bg-[#1C3B24] text-white text-[10px] sm:text-xs font-black uppercase px-3.5 py-1 rounded-full shadow-sm">
              Renováveis & Não Renováveis
            </span>
            <GameTimer secondsLeft={timeLeft} />
          </div>
        </div>
      </div>

      {/* Main Board: 3-4-3 Card Layout - Moved higher */}
      <div className="relative z-10 flex-1 min-h-0 px-2 xs:px-3 sm:px-4 py-1 max-w-lg mx-auto w-full flex flex-col justify-start items-center space-y-2.5 xs:space-y-3 sm:space-y-4 pt-2 xs:pt-4">
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
        <div className="w-full px-6 pb-8 sm:pb-10 pt-2 text-center select-none flex-shrink-0">
          <p className="text-[#4b5d4c] font-semibold text-[11px] sm:text-xs">
            Toque nas cartas para encontrar as fontes correspondentes.
          </p>
        </div>
      </ZoomContent>

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

// Formata o nome do card para quebra de linhas sem corte de palavras
function formatCardLines(name) {
  if (name.includes("Hidroelétrica") || name.includes("Hidrelétrica")) {
    return ["Energia", "Hidroelétrica"];
  }
  if (name.includes("Geotérmica")) {
    return ["Energia", "Geotérmica", "(vapor)"];
  }
  if (name.includes("Termoelétrica")) {
    return ["Termoelétrica", "(gasolina e", "diesel)"];
  }
  if (name.includes("Biomassa")) {
    return ["Biomassa", "(bagaço de", "cana)"];
  }
  if (name.includes("Solar")) {
    return ["Energia", "Solar"];
  }
  if (name.includes("Eólica")) {
    return ["Energia", "Eólica"];
  }
  return name.split(" ");
}

// Individual 3D Flip Card Component
function MemoryCard({ card, isFlipped, isMatched, onClick }) {
  const cardLines = formatCardLines(card.item.name);

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
            src="/assets/jogo3/FUNDOS/cartao-verde-com-folha-em-relevo.webp"
            alt="Carta Honda"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* CARD FRONT (Photo + Title) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-lg border-2 p-1 xs:p-1.5 sm:p-2 flex flex-col justify-between items-center bg-[#FAF5EC] text-center backface-hidden ${isMatched
              ? 'border-[#2EB85C] ring-2 ring-[#2EB85C]/40 bg-[#FAF5EC]'
              : 'border-white'
            }`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Photo */}
          <div className="w-full flex-1 min-h-0 rounded-xl overflow-hidden bg-[#E5DAC6] mb-1 relative">
            <img
              src={card.item.image}
              alt={card.item.name}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            {/* Tag Renovável / Não Renovável discreta no card */}
            <span
              className={`absolute top-1 right-1 text-[6.5px] xs:text-[7.5px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shadow-sm text-white ${
                card.item.type === 'Renovável' ? 'bg-[#2EB85C]' : 'bg-[#d97706]'
              }`}
            >
              {card.item.type}
            </span>
          </div>

          {/* Name - Palavras inteiras em cada linha, sem hífen ou cortes */}
          <div className="w-full min-h-[26px] xs:min-h-[30px] sm:min-h-[34px] flex flex-col items-center justify-center px-0.5 py-0.5">
            {cardLines.map((line, idx) => (
              <span
                key={idx}
                className="text-[#1A2E1A] font-black text-[6.8px] xs:text-[7.8px] sm:text-[9.5px] leading-[1.12] text-center w-full whitespace-nowrap overflow-hidden text-ellipsis hyphens-none select-none tracking-tight"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

