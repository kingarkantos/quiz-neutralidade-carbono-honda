import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getRandomQuizQuestions } from '../../data/quizQuestions';
import HomeScreen from '../../screens/HomeScreen';
import HowItWorksScreen from '../../screens/HowItWorksScreen';
import QuestionScreen from '../../screens/QuestionScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';
import ScoreScreen from '../../screens/ScoreScreen';
import FinalMessageScreen from '../../screens/FinalMessageScreen';

export default function QuizApp() {
  const [screen, setScreen] = useState('home'); // 'home' | 'how-it-works' | 'question' | 'feedback' | 'score' | 'final'
  const [questions, setQuestions] = useState(() => getRandomQuizQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lastSelectedOption, setLastSelectedOption] = useState(null);

  // Inactivity timeout for Kiosk/Totem (60 seconds)
  useEffect(() => {
    if (screen === 'home') return;

    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleRestart();
      }, 60000);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeout);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [screen]);

  // Start the flow
  const handleStart = () => {
    setScreen('how-it-works');
  };

  const handleStartQuestions = () => {
    setQuestions(getRandomQuizQuestions());
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScreen('question');
  };

  // Back button in question screen
  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setAnswers(prev => prev.slice(0, -1));
    } else {
      setScreen('how-it-works');
    }
  };

  // When user picks an option and presses CONTINUAR
  const handleAnswer = (option) => {
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = option.id === currentQ.correctOptionId;
    
    const newAnswer = {
      questionId: currentQ.id,
      selectedOption: option,
      isCorrect
    };

    setAnswers(prev => [...prev, newAnswer]);
    setLastSelectedOption(option);
    setScreen('feedback');
  };

  // Next from feedback
  const handleNextFromFeedback = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setScreen('question');
    } else {
      setScreen('score');
    }
  };

  // Continue from Score to Final Institutional Screen
  const handleContinueToFinal = () => {
    setScreen('final');
  };

  // Restart quiz completely
  const handleRestart = () => {
    setQuestions(getRandomQuizQuestions());
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setLastSelectedOption(null);
    setScreen('home');
  };

  // Calculate score
  const correctCount = answers.filter(a => a.isCorrect).length;

  return (
    <div className="w-full h-full min-h-0 flex flex-col">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <HomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {screen === 'how-it-works' && (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <HowItWorksScreen onStart={handleStartQuestions} />
          </motion.div>
        )}

        {screen === 'question' && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <QuestionScreen
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              answers={answers}
              onAnswer={handleAnswer}
              onBack={handleBackQuestion}
            />
          </motion.div>
        )}

        {screen === 'feedback' && (
          <motion.div
            key={`feedback-${currentQuestionIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <FeedbackScreen
              isCorrect={answers[answers.length - 1]?.isCorrect}
              question={questions[currentQuestionIndex]}
              selectedOption={lastSelectedOption}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              answers={answers}
              onNext={handleNextFromFeedback}
            />
          </motion.div>
        )}

        {screen === 'score' && (
          <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <ScoreScreen
              correctCount={correctCount}
              totalQuestions={questions.length}
              onContinue={handleContinueToFinal}
            />
          </motion.div>
        )}

        {screen === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full flex flex-col min-h-0"
          >
            <FinalMessageScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

