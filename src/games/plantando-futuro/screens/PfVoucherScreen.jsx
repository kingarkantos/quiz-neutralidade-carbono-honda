import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Home, Ticket, Calendar, User, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import CornerFoliage from '../../../components/CornerFoliage';

export default function PfVoucherScreen({ resgateData, colaboradorInfo, onFinish }) {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#2EB85C', '#7FD03F', '#1C3B24', '#FAF5EC'],
      disableForReducedMotion: true
    });
  }, []);

  const { muda, voucherCode } = resgateData || {};
  const dataHora = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb] select-none">
      {/* Background with Nature Foliage Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.png')` }}
      />
      <CornerFoliage corners={['top-left', 'top-right', 'bottom-left', 'bottom-right']} />

      {/* Top Header */}
      <div className="relative z-30 w-full flex items-center justify-between px-5 pt-3 pb-1">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-white/80 p-1 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M42 95 L58 95 L56 60 C58 55 62 48 64 35 C64 30 60 28 58 32 C56 25 51 22 49 28 C47 20 42 18 40 25 C38 22 34 22 33 28 C32 38 35 48 37 55 L42 95 Z" fill="#784b24" />
              <circle cx="50" cy="30" r="28" fill="#2EB85C" fillOpacity="0.88" />
              <circle cx="36" cy="22" r="16" fill="#7FD03F" fillOpacity="0.95" />
              <circle cx="64" cy="22" r="16" fill="#7FD03F" fillOpacity="0.95" />
            </svg>
          </div>
          <span className="font-serif font-black text-sm text-[#1A2E1A]">Plantando o futuro</span>
        </div>

        <img 
          src="/assets/logos/honda.svg" 
          alt="Honda" 
          className="h-7 w-auto object-contain" 
        />
      </div>

      {/* Main Voucher Container */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-2 max-w-md mx-auto w-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="w-full bg-[#FAF5EC] rounded-[28px] p-4 sm:p-5 shadow-2xl border-2 border-white flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Top Success Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#2EB85C] text-white px-3.5 py-1 rounded-full text-xs font-black uppercase shadow-md mb-2">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>VOUCHER GERADO!</span>
          </div>

          <h2 className="text-[#1A2E1A] font-black text-xl sm:text-2xl uppercase tracking-tight leading-none mb-0.5">
            COMPROMISSO ASSINADO
          </h2>
          <p className="text-[#3b4d3c] text-xs font-medium mb-3">
            Obrigado por ajudar a Honda a construir um futuro sustentável!
          </p>

          {/* Ticket Card with Perforated Edge Effect */}
          <div className="w-full bg-white rounded-2xl p-3.5 border-2 border-dashed border-[#2EB85C]/40 shadow-inner relative flex flex-col items-center">
            {/* Cutout notches on sides */}
            <div className="absolute -left-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-[#FAF5EC] border-r-2 border-dashed border-[#2EB85C]/40" />
            <div className="absolute -right-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-[#FAF5EC] border-l-2 border-dashed border-[#2EB85C]/40" />

            <div className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-widest text-[#2EB85C] mb-1">
              <Ticket className="w-3.5 h-3.5" />
              <span>CÓDIGO DE RETIRADA</span>
            </div>

            {/* Voucher Code Hero */}
            <div className="bg-[#1C3B24] text-[#FAF5EC] px-5 py-2 rounded-xl font-mono font-black text-xl sm:text-2xl tracking-wider shadow-md mb-3 border border-white/30">
              {voucherCode || 'PF-50ANOS-001'}
            </div>

            {/* Plant Details */}
            <div className="flex items-center space-x-3 w-full bg-[#FAF5EC]/70 rounded-xl p-2 mb-2 border border-[#2EB85C]/20 text-left">
              <div className="w-14 h-14 rounded-lg bg-white p-1 flex-shrink-0 flex items-center justify-center shadow-xs">
                <img 
                  src={muda?.imagemMuda} 
                  alt={muda?.nome} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-[#2EB85C] uppercase tracking-wider block">
                  Muda Selecionada:
                </span>
                <p className="text-[#1A2E1A] font-black text-sm truncate uppercase">
                  {muda?.nome || 'Muda Nativa'}
                </p>
                <p className="text-gray-500 italic text-[10px] truncate">
                  {muda?.cientifico}
                </p>
              </div>
            </div>

            {/* Colaborador & Date Metadata */}
            <div className="w-full grid grid-cols-2 gap-2 text-left text-[10px] text-[#2c3d2e] pt-1 border-t border-gray-100">
              <div className="flex items-center space-x-1 truncate">
                <User className="w-3 h-3 text-[#2EB85C] flex-shrink-0" />
                <span className="truncate">{colaboradorInfo?.nome || 'Colaborador Honda'}</span>
              </div>
              <div className="flex items-center space-x-1 justify-end truncate">
                <Clock className="w-3 h-3 text-[#2EB85C] flex-shrink-0" />
                <span>{dataHora}</span>
              </div>
            </div>

            {/* Digital Signature thumbnail preview if available */}
            {colaboradorInfo?.signatureData && (
              <div className="w-full pt-2 flex flex-col items-center">
                <span className="text-[8.5px] uppercase font-bold text-gray-400">Assinatura Digital Registrada:</span>
                <img 
                  src={colaboradorInfo.signatureData} 
                  alt="Assinatura" 
                  className="h-7 max-w-[140px] object-contain opacity-85" 
                />
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-3 px-2 text-[#3b4d3c] text-xs leading-relaxed">
            <p>
              Apresente o código deste voucher no <strong>Estande de Meio Ambiente</strong> para retirar sua muda de árvore nativa.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Finish Button */}
      <div className="relative z-30 px-6 sm:px-8 pb-6 sm:pb-8 pt-2 w-full max-w-md mx-auto">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onFinish();
            navigate('/');
          }}
          className="w-full py-4 rounded-full btn-tactile-green anim-shimmer text-white font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center space-x-2 shadow-xl"
        >
          <Home className="w-5 h-5" />
          <span>CONCLUIR E VOLTAR</span>
        </motion.button>
      </div>
    </div>
  );
}

