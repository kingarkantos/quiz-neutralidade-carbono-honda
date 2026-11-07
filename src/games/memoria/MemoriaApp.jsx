import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MemoriaHomeScreen from './screens/MemoriaHomeScreen';
import MemoriaGameBoardScreen from './screens/MemoriaGameBoardScreen';
import MemoriaFinishScreen from './screens/MemoriaFinishScreen';

export default function MemoriaApp() {
  const [screen, setScreen] = useState('home'); // 'home' | 'board' | 'finish'
  const [gameKey, setGameKey] = useState(0);
  const [finishData, setFinishData] = useState({ isTimeUp: false, pairsFound: 5 });

  const handleStart = () => {
    setGameKey(prev => prev + 1);
    setScreen('board');
  };

  const handleFinishRound = (data = { isTimeUp: false, pairsFound: 5 }) => {
    setFinishData(data);
    setScreen('finish');
  };

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setScreen('home');
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

        {screen === 'board' && (
          <motion.div
            key={`memoria-board-${gameKey}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <MemoriaGameBoardScreen
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
              onRestart={handleRestart}
              isTimeUp={finishData?.isTimeUp}
              pairsFound={finishData?.pairsFound}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
