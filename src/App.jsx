import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HubScreen from './screens/HubScreen';
import QuizApp from './games/quiz/QuizApp';
import LiguePontosApp from './games/ligue-pontos/LiguePontosApp';
import MemoriaApp from './games/memoria/MemoriaApp';

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-full min-h-[100dvh] max-h-[100dvh] flex items-center justify-center bg-[#111812] overflow-hidden">
        {/* 
          Totem Display Container (9:16 portrait kiosk layout)
          Fills screen vertically on desktop, fits full screen on kiosk totens and mobile devices
        */}
        <main className="relative w-full h-full max-w-[540px] max-h-[100dvh] sm:max-h-[960px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-[#ecdcc1] flex flex-col">
          <Routes>
            {/* Main Portal / Hub Screen with access to all 3 games */}
            <Route path="/" element={<HubScreen />} />

            {/* Game 1: Quiz Neutralidade de Carbono */}
            <Route path="/quiz/*" element={<QuizApp />} />

            {/* Game 2: Circulação de Recursos - Ligue os Pontos */}
            <Route path="/ligue-os-pontos/*" element={<LiguePontosApp />} />

            {/* Game 3: Energia Limpa - Jogo da Memória */}
            <Route path="/jogo-da-memoria/*" element={<MemoriaApp />} />

            {/* Fallback to Hub */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
