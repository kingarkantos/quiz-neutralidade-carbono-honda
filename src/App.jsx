import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HubScreen from './screens/HubScreen';
import QuizApp from './games/quiz/QuizApp';
import LiguePontosApp from './games/ligue-pontos/LiguePontosApp';
import MemoriaApp from './games/memoria/MemoriaApp';
import PlantandoFuturoApp from './games/plantando-futuro/PlantandoFuturoApp';
import PlantasDashboardScreen from './screens/PlantasDashboardScreen';
import FullscreenButton from './components/FullscreenButton';
import BottomControls from './components/BottomControls';
import ErrorBoundary from './components/ErrorBoundary';
import { AnimationProvider } from './context/AnimationContext';
import { ZoomProvider } from './context/ZoomContext';

export default function App() {
  return (
    <ErrorBoundary>
      <AnimationProvider>
        <ZoomProvider>
          <BrowserRouter>
            <Routes>
              {/* Dedicated Full-Width Responsive Dashboard Route for /plantas */}
              <Route path="/plantas" element={<PlantasDashboardScreen />} />

              {/* Full-Width Edge-to-Edge Responsive Games & Screens (No phone-frame borders) */}
              <Route
                path="/*"
                element={
                  <div className="w-full h-full min-h-[100dvh] max-h-[100dvh] bg-[#ecdcc1] overflow-hidden flex flex-col">
                    <main className="relative w-full h-full min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#ecdcc1] flex flex-col flex-1">
                      {/* Discreet Fullscreen Toggle in Top-Right Corner */}
                      <FullscreenButton />

                      {/* Discreet Zoom (+ / -) & Animation Controls in Bottom-Right Corner */}
                      <BottomControls />

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
      </ZoomProvider>
    </AnimationProvider>
  </ErrorBoundary>
  );
}
