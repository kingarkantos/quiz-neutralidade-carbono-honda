import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MemoriaHomeScreen from './screens/MemoriaHomeScreen';
import MemoriaRoundSelectScreen from './screens/MemoriaRoundSelectScreen';
import MemoriaGameBoardScreen from './screens/MemoriaGameBoardScreen';
import MemoriaFinishScreen from './screens/MemoriaFinishScreen';

export default function MemoriaApp() {
  const [screen, setScreen] = useState('home'); // 'home' | 'round-select' | 'board' | 'finish'
  const [selectedRound, setSelectedRound] = useState(1);

  const handleStart = () => {
    setScreen('round-select');
  };

  const handleSelectRound = (roundNum) => {
    setSelectedRound(roundNum);
    setScreen('board');
  };

  const handleFinishRound = () => {
    setScreen('finish');
  };

  const handlePlayNextRound = () => {
    setSelectedRound(2);
    setScreen('board');
  };

  const handleRestartRound = () => {
    setScreen('round-select');
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="memoria-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <MemoriaHomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {screen === 'round-select' && (
          <motion.div
            key="memoria-round-select"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <MemoriaRoundSelectScreen onSelectRound={handleSelectRound} />
          </motion.div>
        )}

        {screen === 'board' && (
          <motion.div
            key={`memoria-board-${selectedRound}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <MemoriaGameBoardScreen
              roundNumber={selectedRound}
              onFinish={handleFinishRound}
            />
          </motion.div>
        )}

        {screen === 'finish' && (
          <motion.div
            key="memoria-finish"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <MemoriaFinishScreen
              roundNumber={selectedRound}
              onPlayNextRound={handlePlayNextRound}
              onRestartRound={handleRestartRound}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
