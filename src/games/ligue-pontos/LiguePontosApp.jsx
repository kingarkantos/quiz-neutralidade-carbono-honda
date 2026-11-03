import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LpHomescreen from './screens/LpHomescreen';
import LpHowToPlayScreen from './screens/LpHowToPlayScreen';
import LpGameBoardScreen from './screens/LpGameBoardScreen';
import LpFinishScreen from './screens/LpFinishScreen';

export default function LiguePontosApp() {
  const [screen, setScreen] = useState('home'); // 'home' | 'how-to-play' | 'board' | 'finish'
  const [gameKey, setGameKey] = useState(0);

  const handleStart = () => {
    setScreen('how-to-play');
  };

  const handleStartGame = () => {
    setGameKey(prev => prev + 1);
    setScreen('board');
  };

  const handleFinish = () => {
    setScreen('finish');
  };

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setScreen('board');
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="lp-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <LpHomescreen onStart={handleStart} />
          </motion.div>
        )}

        {screen === 'how-to-play' && (
          <motion.div
            key="lp-how-to-play"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <LpHowToPlayScreen onStart={handleStartGame} />
          </motion.div>
        )}

        {screen === 'board' && (
          <motion.div
            key={`lp-board-${gameKey}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <LpGameBoardScreen onFinish={handleFinish} />
          </motion.div>
        )}

        {screen === 'finish' && (
          <motion.div
            key="lp-finish"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <LpFinishScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

