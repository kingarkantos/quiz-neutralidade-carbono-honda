import React, { createContext, useContext, useState, useEffect } from 'react';

const AnimationContext = createContext({
  animationsEnabled: true,
  toggleAnimations: () => {},
});

export function AnimationProvider({ children }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('quiz_animations_enabled');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('quiz_animations_enabled', String(animationsEnabled));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    if (animationsEnabled) {
      document.body.classList.remove('animations-paused');
      document.documentElement.classList.remove('animations-paused');
    } else {
      document.body.classList.add('animations-paused');
      document.documentElement.classList.add('animations-paused');
    }
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <AnimationContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}

