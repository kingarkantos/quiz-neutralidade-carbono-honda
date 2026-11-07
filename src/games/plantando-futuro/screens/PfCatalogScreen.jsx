import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, Sparkles, RefreshCw, X, ChevronRight } from 'lucide-react';
import { getMudas, resgatarMuda } from '../../../services/mudasService';
import CornerFoliage from '../../../components/CornerFoliage';
import PfHeaderBrand from '../components/PfHeaderBrand';
import ZoomContent from '../../../components/ZoomContent';

export default function PfCatalogScreen({ onBack, colaboradorInfo, onResgateSuccess }) {
  const [mudas, setMudas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMuda, setSelectedMuda] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchStock = async () => {
    setLoading(true);
    const data = await getMudas();
    setMudas(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStock();
    // Poll every 12 seconds so if other totens decrement, this screen updates in real time
    const interval = setInterval(fetchStock, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectMuda = (muda) => {
    if (muda.estoque <= 0) return;
    setErrorMessage('');
    setSelectedMuda(muda);
  };

  const handleConfirmOrder = async () => {
    if (!selectedMuda || submitting) return;
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await resgatarMuda(
        selectedMuda.id,
        colaboradorInfo?.nome || 'Colaborador Honda',
        colaboradorInfo?.signatureData || ''
      );

      if (res.success) {
        // Update local list
        setMudas(prev => prev.map(m => m.id === selectedMuda.id ? { ...m, estoque: res.novoEstoque, saidas: (m.saidas || 0) + 1 } : m));
        onResgateSuccess({
          muda: selectedMuda,
          voucherCode: res.voucherCode,
          novoEstoque: res.novoEstoque
        });
      } else {
        setErrorMessage(res.error || 'Erro ao confirmar pedido.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Erro de conexão.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate total emissions reduced (each plant removes 17.33 kgCO2e/ano)
  const totalSaidas = mudas.reduce((acc, m) => {
    const saidas = typeof m.saidas === 'number' ? m.saidas : Math.max(0, (m.totalInicial || 500) - (m.estoque || 500));
    return acc + saidas;
  }, 0);
  const totalReduzidoKg = totalSaidas * 17.33;
  const formattedTotalReduzido = totalReduzidoKg.toLocaleString('pt-BR', {
    minimumFractionDigits: totalReduzidoKg % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#e9decb] select-none">
      {/* Background with Nature Foliage Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-70"
        style={{ backgroundImage: `url('/assets/bg/slice-quiz.webp')` }}
      />
      <CornerFoliage corners={['top-left', 'top-right']} />

      {/* Scalable Content Layer (Zoom only applies to elements, never the background) */}
      <ZoomContent className="pt-0 px-0">
        {/* Top Header */}
        <div className="w-full flex flex-col bg-[#e9decb]/90 backdrop-blur-md border-b border-[#2EB85C]/20 shadow-xs">
        <div className="relative w-full flex items-center justify-center px-4 pt-3 pb-1 min-h-[44px]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="absolute left-4 top-3 flex items-center space-x-1.5 bg-[#FAF5EC]/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-[#2EB85C]/30 text-[#1C3B24] font-black text-xs hover:bg-white z-10"
          >
            <ArrowLeft className="w-4 h-4 text-[#2EB85C]" />
            <span>INÍCIO</span>
          </motion.button>

          <img 
            src="/assets/logos/honda.svg" 
            alt="Honda" 
            className="h-7 w-auto object-contain" 
          />
        </div>

        {/* Module Header Brand - Transparent, elegant serif & living animated tree */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2">
          <PfHeaderBrand compact={false} showSubtitle={true} treeSize={54} />

          <button
            onClick={fetchStock}
            disabled={loading}
            className="p-2 rounded-full bg-white/70 hover:bg-white text-[#1C3B24] transition-all shadow-xs"
            title="Atualizar estoque"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#2EB85C]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Catalog List (Exact Reference Layout from media_1793821012842_65b7afe3.jpg) */}
      <div className="relative z-20 flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3 sm:space-y-4 max-w-lg mx-auto w-full">
        {/* Calculadora de Carbono - Estimativa das emissões neutralizadas */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] border-2 border-white bg-gradient-to-r from-[#143D1A] via-[#21612A] to-[#143D1A] p-2.5 xs:p-3 sm:p-3.5 shadow-md flex items-center select-none"
        >
          {/* Left Decorative Leaves SVG */}
          <svg className="absolute -bottom-1 -left-1 w-12 h-12 text-[#2E8B3C]/45 pointer-events-none -z-0" viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,100 C20,70 50,60 80,75 C70,95 40,100 0,100 Z" opacity="0.7" />
            <path d="M0,100 C10,50 40,30 70,45 C60,75 30,90 0,100 Z" opacity="0.9" fill="#38A147" />
          </svg>

          {/* Right Decorative Leaves SVG */}
          <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-16 h-24 text-[#2E8B3C]/50 pointer-events-none -z-0" viewBox="0 0 100 140" fill="currentColor">
            <path d="M100,70 C70,50 50,60 40,80 C60,100 80,95 100,70 Z" opacity="0.8" fill="#3CA84C" />
            <path d="M100,50 C65,30 45,35 30,50 C50,75 80,70 100,50 Z" opacity="0.9" fill="#4AC25B" />
            <path d="M100,90 C75,80 60,95 50,115 C70,125 90,115 100,90 Z" opacity="0.7" fill="#2E8B3C" />
          </svg>

          {/* Left: Cloud + CO2 + Calculator Icon */}
          <div className="relative z-10 pl-1 sm:pl-2 flex-shrink-0 flex items-center justify-center">
            <img 
              src="/assets/plantando-futuro/icone-calculadora-co2.webp" 
              alt="Calculadora CO2" 
              className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 object-contain drop-shadow-sm"
            />
          </div>

          {/* Vertical Separator */}
          <div className="relative z-10 w-[1.5px] bg-white/40 h-11 xs:h-12 mx-2.5 xs:mx-3.5 sm:mx-4 flex-shrink-0" />

          {/* Right: Text and Pill Badge */}
          <div className="relative z-10 flex-1 flex flex-col justify-center text-left min-w-0 pr-1">
            <h4 className="text-white font-black text-xs xs:text-sm sm:text-base leading-tight tracking-tight">
              Calculadora de Carbono
            </h4>
            <p className="text-white/85 font-medium text-[9px] xs:text-[10.5px] sm:text-xs leading-tight mt-0.5">
              Estimativa das emissões neutralizadas
            </p>
            <div className="mt-1 sm:mt-1.5 inline-flex items-center self-start bg-[#C6E992] text-[#0E3316] font-black text-xs xs:text-sm sm:text-base px-3.5 xs:px-4 py-0.5 rounded-full shadow-inner tracking-tight">
              <span>{formattedTotalReduzido} kgCO₂e/ano</span>
            </div>
          </div>
        </motion.div>

        {mudas.map((muda, idx) => {
          const isAvailable = muda.estoque > 0;

          return (
            <motion.div
              key={muda.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => isAvailable && handleSelectMuda(muda)}
              className={`relative overflow-hidden rounded-[26px] border-2 transition-all duration-200 select-none ${
                isAvailable
                  ? 'bg-gradient-to-r from-white via-[#FAF5EC] to-white/90 border-white shadow-md hover:shadow-xl hover:scale-[1.01] cursor-pointer'
                  : 'bg-[#e5ded0]/70 border-[#c5baa7] opacity-60 cursor-not-allowed grayscale-[40%]'
              }`}
            >
              <div className="flex items-center justify-between p-2.5 sm:p-3">
                {/* 1. Left Column: Muda Seedling in pot + Detail fallen flowers/fruit */}
                <div className="w-20 xs:w-24 sm:w-28 flex-shrink-0 flex flex-col items-center justify-center relative">
                  <div className="relative w-16 h-20 xs:w-20 xs:h-24 sm:w-24 sm:h-28 flex items-center justify-center">
                    <img 
                      src={muda.imagemMuda} 
                      alt={`Muda de ${muda.nome}`} 
                      className="w-full h-full object-contain drop-shadow-md pointer-events-none"
                    />
                    {/* Floating Detail Petals / Fruit below muda */}
                    {muda.imagemDetalhe && (
                      <img 
                        src={muda.imagemDetalhe} 
                        alt="" 
                        className="absolute -bottom-2 -left-1 w-11 h-11 object-contain drop-shadow-sm pointer-events-none"
                      />
                    )}
                  </div>
                </div>

                {/* 2. Middle Column: Info & Specs (Exact typography & layout) */}
                <div className="flex-1 px-2.5 sm:px-3 text-left min-w-0">
                  {/* Name */}
                  <h3 className="text-[#1A2E1A] font-black text-sm xs:text-base sm:text-lg leading-none uppercase tracking-tight">
                    {muda.nome}
                  </h3>

                  {/* Scientific Name Pill - Single line always, reduced font size */}
                  <div className="inline-flex items-center my-1 bg-[#A9D39C] px-2.5 xs:px-3 py-0.5 rounded-full shadow-[0_2px_4px_rgba(25,60,20,0.14)] max-w-full">
                    <span className="text-[#153B18] font-bold text-[8px] xs:text-[9px] sm:text-[9.5px] tracking-tight font-sans whitespace-nowrap">
                      {muda.cientifico}
                    </span>
                  </div>

                  {/* Spec Sheet Table - Extracted directly from official voucher PDF */}
                  <div className="space-y-1 text-[9.5px] xs:text-[10px] sm:text-[11px] text-[#2c3b2d] leading-snug py-0.5">
                    <p><strong className="text-[#1A2E1A]">Origem:</strong> {muda.origem}</p>
                    <p><strong className="text-[#1A2E1A]">Porte:</strong> {muda.porte || muda.alturaAdulta}</p>
                    <p><strong className="text-[#1A2E1A]">Floração:</strong> {muda.floracao}</p>
                  </div>

                  {/* Live Stock Indicator */}
                  <div className="mt-1.5 flex items-center space-x-2">
                    {isAvailable ? (
                      <span className="inline-flex items-center space-x-1 bg-[#2EB85C]/15 text-[#1C3B24] font-black text-[9.5px] xs:text-[10px] px-2.5 py-0.5 rounded-full border border-[#2EB85C]/30">
                        <span>🌱</span>
                        <span>{muda.estoque} mudas disponíveis</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 bg-red-100 text-red-700 font-black text-[9.5px] xs:text-[10px] px-2.5 py-0.5 rounded-full border border-red-300">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        <span>MUDAS ESGOTADAS</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Right Column: Blooming Tree Artwork from official voucher */}
                <div className="w-24 xs:w-28 sm:w-32 h-28 xs:h-32 sm:h-36 flex-shrink-0 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center bg-[#E5D7BF]/35">
                  <img 
                    src={muda.imagemArvore} 
                    alt={`Árvore ${muda.nome}`} 
                    className="w-full h-full object-contain p-1.5 pointer-events-none drop-shadow-sm"
                  />
                  {/* Subtle fade overlay into background on the left */}
                  <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-[#FAF5EC]/60 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Status Ribbon if Sold Out */}
              {!isAvailable && (
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="bg-red-600 text-white font-black text-xs xs:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border-2 border-white rotate-[-6deg]">
                    INDISPONÍVEL • ESGOTADO
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
      </ZoomContent>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedMuda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-[#FAF5EC] rounded-[28px] p-5 shadow-2xl border-2 border-white flex flex-col items-center text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMuda(null)}
                disabled={submitting}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-black uppercase tracking-wider text-[#2EB85C] mt-1 mb-0.5">
                ESCOLHA DA MUDA
              </span>

              <h3 className="text-[#1A2E1A] font-black text-xl leading-tight font-serif uppercase tracking-tight">
                {selectedMuda.nome}
              </h3>
              <div className="inline-flex items-center my-1 bg-[#A9D39C] px-3.5 py-0.5 rounded-full shadow-[0_2px_4px_rgba(25,60,20,0.14)]">
                <span className="text-[#153B18] font-bold text-[11px] sm:text-xs tracking-normal font-sans whitespace-nowrap">
                  {selectedMuda.cientifico}
                </span>
              </div>

              {/* Preview image */}
              <div className="relative w-36 h-28 my-1 flex items-center justify-center bg-white rounded-2xl p-2 shadow-inner border border-[#2EB85C]/20">
                <img 
                  src={selectedMuda.imagemMuda} 
                  alt={selectedMuda.nome} 
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>

              <div className="my-2.5 px-3 py-2 bg-white/90 rounded-2xl border border-gray-200 text-xs text-[#2c3b2d] leading-relaxed">
                <p>
                  Confirme para escolher <strong>1 muda de {selectedMuda.nome}</strong>.
                </p>
                <p className="text-[11px] text-[#2EB85C] font-bold mt-1">
                  Estoque disponível: {selectedMuda.estoque} unidades
                </p>
              </div>

              {errorMessage && (
                <div className="w-full p-2 mb-2 bg-red-100 border border-red-300 rounded-xl text-red-700 text-xs font-bold">
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="w-full flex space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedMuda(null)}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-full bg-white border border-gray-300 text-gray-700 font-bold text-xs uppercase hover:bg-gray-50"
                >
                  VOLTAR
                </button>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-full btn-tactile-green anim-shimmer text-white font-black text-xs uppercase shadow-md flex items-center justify-center space-x-1"
                >
                  {submitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>CONFIRMAR</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

