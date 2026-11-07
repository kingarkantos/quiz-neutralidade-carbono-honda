import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Check, Sparkles, User, PenTool } from 'lucide-react';
import CornerFoliage from '../../../components/CornerFoliage';

export default function PfSignatureScreen({ onBack, onConfirm }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [colaboradorNome, setColaboradorNome] = useState('');

  // Setup Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Scale for high-DPI displays
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.strokeStyle = '#1C3B24';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (!isDrawing) return;
    e?.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSignature(false);
  };

  const handleProceed = () => {
    const canvas = canvasRef.current;
    const signatureData = hasSignature && canvas ? canvas.toDataURL('image/png') : '';
    onConfirm({
      nome: colaboradorNome.trim() || 'Colaborador Honda',
      signatureData
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb] select-none">
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />
      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Top Header */}
      <div className="relative z-30 w-full flex items-center justify-center px-4 pt-3 pb-1 min-h-[44px]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute left-4 top-3 flex items-center space-x-1.5 bg-[#FAF5EC]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-[#2EB85C]/30 text-[#1C3B24] font-bold text-xs hover:bg-white z-10"
        >
          <ArrowLeft className="w-4 h-4 text-[#2EB85C]" />
          <span>VOLTAR</span>
        </motion.button>

        <img 
          src="/assets/logos/honda.svg" 
          alt="Honda" 
          className="h-7 w-auto object-contain" 
        />
      </div>

      {/* Content Form */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 xs:px-6 py-2 max-w-md mx-auto w-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2"
        >
          <div className="inline-flex items-center space-x-1.5 bg-[#2EB85C]/15 text-[#1C3B24] px-3 py-1 rounded-full text-xs font-black uppercase mb-1">
            <PenTool className="w-3.5 h-3.5 text-[#2EB85C]" />
            <span>Assinatura Digital</span>
          </div>
          <h2 className="text-[#1A2E1A] font-black text-xl xs:text-2xl uppercase tracking-tight">
            SEU COMPROMISSO VERDE
          </h2>
          <p className="text-[#3a4f3b] text-xs font-medium max-w-xs mx-auto">
            Ao assinar, você se compromete a cultivar a muda de árvore nativa e apoiar a sustentabilidade.
          </p>
        </motion.div>

        {/* Input: Nome / Matrícula */}
        <div className="w-full mb-3">
          <label className="block text-left text-xs font-bold text-[#1C3B24] uppercase tracking-wider mb-1 flex items-center space-x-1">
            <User className="w-3.5 h-3.5 text-[#2EB85C]" />
            <span>Nome ou Identificação (opcional):</span>
          </label>
          <input
            type="text"
            value={colaboradorNome}
            onChange={(e) => setColaboradorNome(e.target.value)}
            placeholder="Ex: Carlos Silva ou Visitante"
            className="w-full px-4 py-2.5 rounded-2xl bg-white/95 border-2 border-[#2EB85C]/30 text-[#1A2E1A] font-bold text-sm focus:outline-none focus:border-[#2EB85C] shadow-inner"
          />
        </div>

        {/* Signature Pad Area */}
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[11px] font-bold text-[#1C3B24] uppercase tracking-wider">
              Assine com o dedo ou caneta abaixo:
            </span>
            <button
              onClick={clearCanvas}
              className="inline-flex items-center space-x-1 text-xs text-[#d97706] hover:text-[#b45309] font-bold py-0.5 px-2 rounded-md hover:bg-white/50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>

          <div className="relative w-full h-44 xs:h-52 bg-white rounded-[24px] border-2 border-dashed border-[#2EB85C]/50 shadow-md overflow-hidden touch-none flex items-center justify-center">
            {/* Guide line */}
            <div className="absolute left-6 right-6 bottom-10 border-b border-[#2EB85C]/25 pointer-events-none" />
            
            {!hasSignature && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#2EB85C]/40 pointer-events-none">
                <PenTool className="w-8 h-8 mb-1 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Desenhe sua assinatura aqui
                </span>
              </div>
            )}

            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-30 px-6 sm:px-8 pb-6 sm:pb-8 pt-2 w-full max-w-md mx-auto">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleProceed}
          className="w-full py-4 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <span>ESCOLHER MINHA MUDA</span>
          <Check className="w-5 h-5 stroke-[3]" />
        </motion.button>
      </div>
    </div>
  );
}

