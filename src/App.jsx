import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HubScreen from './screens/HubScreen';
import QuizApp from './games/quiz/QuizApp';
import LiguePontosApp from './games/ligue-pontos/LiguePontosApp';
import MemoriaApp from './games/memoria/MemoriaApp';
import PlantandoFuturoApp from './games/plantando-futuro/PlantandoFuturoApp';
import PlantasDashboardScreen from './screens/PlantasDashboardScreen';
import FullscreenButton from './components/FullscreenButton';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dedicated Full-Width Responsive Dashboard Route for /plantas */}
        <Route path="/plantas" element={<PlantasDashboardScreen />} />

        {/* Totem Kiosk Portrait Games & Screens */}
        <Route
          path="/*"
          element={
            <div className="w-full h-full min-h-[100dvh] max-h-[100dvh] flex items-center justify-center bg-[#111812] overflow-hidden">
              {/* 
                Totem Display Container (9:16 portrait kiosk layout)
                Fills screen vertically on desktop, fits full screen on kiosk totens and mobile devices
              */}
              <main className="relative w-full h-full max-w-[540px] max-h-[100dvh] sm:max-h-[960px] sm:rounded-[36px] overflow-hidden shadow-2xl bg-[#ecdcc1] flex flex-col">
                {/* Discreet Fullscreen Toggle in Top-Right Corner */}
                <FullscreenButton />

                <Routes>
                  {/* Main Portal / Hub Screen */}
                  <Route path="/" element={<HubScreen />} />

                  {/* Game 1: Quiz Neutralidade de Carbono */}
                  <Route path="/quiz/*" element={<QuizApp />} />

                  {/* Game 2: Circulação de Recursos - Ligue os Pontos */}
                  <Route path="/ligue-os-pontos/*" element={<LiguePontosApp />} />

                  {/* Game 3: Energia Limpa - Jogo da Memória */}
                  <Route path="/jogo-da-memoria/*" element={<MemoriaApp />} />

                  {/* Module 4: Plantando o Futuro */}
                  <Route path="/plantando-o-futuro/*" element={<PlantandoFuturoApp />} />
                  <Route path="/plantando-futuro/*" element={<PlantandoFuturoApp />} />

                  {/* Fallback to Hub */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
