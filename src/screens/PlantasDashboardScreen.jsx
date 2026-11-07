import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft, 
  RotateCcw,
  Clock,
  Ticket,
  User,
  ExternalLink,
  ChevronRight,
  Sliders,
  Check,
  Plus,
  Minus,
  Leaf,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData, resetEstoque, DEFAULT_MUDAS } from '../services/mudasService';

export default function PlantasDashboardScreen() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Custom Reset Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetValues, setResetValues] = useState({
    'acai': 500,
    'cupuacu': 500,
    'ipe-roxo': 500,
    'ipe-amarelo': 500
  });
  const [bulkValue, setBulkValue] = useState(500);
  const [zerarSaidas, setZerarSaidas] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const loadData = async () => {
    try {
      const res = await getDashboardData();
      if (res && res.success) {
        setData(res);
        // Pre-fill reset values based on current estoque or default
        if (res.mudas && Array.isArray(res.mudas)) {
          const initialMap = {};
          res.mudas.forEach(m => {
            initialMap[m.id] = m.estoque !== undefined ? m.estoque : 500;
          });
          setResetValues(prev => ({ ...prev, ...initialMap }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    let interval = null;
    if (autoRefresh) {
      interval = setInterval(loadData, 10000); // 10s live poll
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Open reset modal - can optionally target a specific muda or all
  const openResetModal = (targetMudaId = null) => {
    if (targetMudaId) {
      // Keep other mudas as they currently are in data
      const current = {};
      (data?.mudas || DEFAULT_MUDAS).forEach(m => {
        current[m.id] = m.estoque !== undefined ? m.estoque : 500;
      });
      setResetValues(current);
    }
    setIsResetModalOpen(true);
  };

  const handleBulkApply = (val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setBulkValue(num);
    const updated = {};
    (data?.mudas || DEFAULT_MUDAS).forEach(m => {
      updated[m.id] = num;
    });
    setResetValues(updated);
  };

  const handleSingleValueChange = (mudaId, val) => {
    const num = Math.max(0, parseInt(val, 10) || 0);
    setResetValues(prev => ({
      ...prev,
      [mudaId]: num
    }));
  };

  const handleStepValue = (mudaId, delta) => {
    setResetValues(prev => {
      const current = prev[mudaId] !== undefined ? prev[mudaId] : 500;
      const next = Math.max(0, current + delta);
      return { ...prev, [mudaId]: next };
    });
  };

  const handleConfirmReset = async () => {
    setResetting(true);
    try {
      const res = await resetEstoque({
        valores: resetValues,
        zerarSaidas
      });

      if (res && res.success) {
        setFeedbackMsg('✅ Estoque de todas as mudas redefinido com sucesso!');
      } else {
        setFeedbackMsg('⚠️ Estoque atualizado localmente.');
      }
      await loadData();
      setIsResetModalOpen(false);
      setTimeout(() => setFeedbackMsg(''), 5000);
    } catch (err) {
      setFeedbackMsg('❌ Erro ao resetar estoque: ' + err.message);
    } finally {
      setResetting(false);
    }
  };

  const mudas = data?.mudas || DEFAULT_MUDAS;
  const orders = data?.orders || [];
  const summary = data?.summary || {
    totalEstoque: mudas.reduce((acc, m) => acc + (m.estoque || 0), 0),
    totalSaidas: mudas.reduce((acc, m) => acc + (m.saidas || 0), 0),
    totalInicial: mudas.reduce((acc, m) => acc + (m.totalInicial || 500), 0),
    percentualDistribuido: 0,
    disponiveisCount: mudas.filter(m => (m.estoque || 0) > 0).length,
    esgotadasCount: mudas.filter(m => (m.estoque || 0) <= 0).length
  };

  const totalCO2Compensado = ((summary.totalSaidas || 0) * 17.33).toFixed(1);

  return (
    <div className="w-full min-h-screen bg-[#F4EDE0] text-[#1A2E1A] flex flex-col font-sans select-none pb-12">
      {/* Top Sticky Header */}
      <header className="w-full bg-[#1C3B24] text-white px-3 sm:px-6 py-2.5 sm:py-3.5 shadow-md sticky top-0 z-40 border-b border-[#2EB85C]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Hub back button & Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 active:scale-95 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0"
              title="Voltar ao Totem Hub"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">TOTEM HUB</span>
            </button>

            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2EB85C]/20 p-1 flex items-center justify-center flex-shrink-0">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-[#7FD03F]" />
              </div>
              <div className="min-w-0">
                <h1 className="font-serif font-black text-xs sm:text-base leading-tight truncate">
                  PLANTANDO O FUTURO
                </h1>
                <p className="text-[9px] sm:text-[10px] text-[#7FD03F] font-bold tracking-wide truncate">
                  Gestão & Acompanhamento de Mudas
                </p>
              </div>
            </div>
          </div>

          {/* Right: Actions & Logo */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ao vivo</span>
            </div>

            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center space-x-1 bg-[#2EB85C] hover:bg-[#259b4c] active:scale-95 text-white px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold shadow-sm transition-all"
              title="Recarregar dados agora"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">ATUALIZAR</span>
            </button>

            <img 
              src="/assets/logos/honda.svg" 
              alt="Honda" 
              className="h-5 sm:h-7 w-auto object-contain brightness-0 invert opacity-90 pl-1" 
            />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-5 space-y-4 sm:space-y-6">
        {/* Feedback Alert Toast */}
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#1C3B24] text-white border-2 border-[#2EB85C] px-4 py-2.5 rounded-2xl shadow-lg text-xs sm:text-sm font-bold flex items-center justify-between"
          >
            <span>{feedbackMsg}</span>
            <button 
              onClick={() => setFeedbackMsg('')} 
              className="text-white/80 hover:text-white text-base font-black px-1"
            >
              ×
            </button>
          </motion.div>
        )}

        {/* Action Header Card: Reset Button & Environmental Info */}
        <section className="bg-gradient-to-r from-[#1C3B24] to-[#254f31] text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border border-[#2EB85C]/30">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-[#7FD03F] text-[#1C3B24] text-[9.5px] sm:text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                Controle de Estoque
              </span>
              <span className="text-[11px] sm:text-xs text-white/80 font-medium">
                4 espécies amazônicas
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-black tracking-wide">
              Estoque Inicial e Contadores de Retirada
            </h2>
            <p className="text-[11px] sm:text-xs text-[#E8DCC4] leading-relaxed">
              Cada muda distribuída representa <span className="text-[#7FD03F] font-bold">-17,33 kgCO₂e/ano</span> em emissões reduzidas.
            </p>
          </div>

          <button
            onClick={() => openResetModal()}
            className="w-full sm:w-auto bg-[#2EB85C] hover:bg-[#259b4c] active:scale-95 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg flex items-center justify-center space-x-2 transition-all flex-shrink-0"
          >
            <Sliders className="w-4 h-4" />
            <span>DEFINIR / RESETAR ESTOQUE</span>
          </button>
        </section>

        {/* Hero KPI Summary Cards - Fully optimized 2x2 on mobile, 4-col on desktop */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {/* 1. Total Saídas */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#2EB85C]/15 text-[#2EB85C] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block truncate">
                Mudas Doadas
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.totalSaidas}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-0.5 truncate">
                {summary.totalSaidas === 1 ? '1 retirada' : 'retiradas feitas'}
              </span>
            </div>
          </div>

          {/* 2. Total Estoque Restante */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#7FD03F]/20 text-[#1C3B24] flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block truncate">
                Estoque Restante
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.totalEstoque}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-0.5 truncate">
                de {summary.totalInicial} mudas
              </span>
            </div>
          </div>

          {/* 3. CO2e Neutralizado */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-100 text-[#15803d] flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block truncate">
                CO₂e Reduzido
              </span>
              <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#15803d] leading-none">
                -{totalCO2Compensado}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-0.5 truncate">
                kgCO₂e/ano
              </span>
            </div>
          </div>

          {/* 4. Espécies Ativas */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-2.5 sm:space-x-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider block truncate">
                Espécies Ativas
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.disponiveisCount} <span className="text-xs sm:text-sm font-bold text-gray-400">/ 4</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400 block mt-0.5 truncate">
                {summary.esgotadasCount > 0 ? `${summary.esgotadasCount} esgotada(s)` : 'Todas disponíveis'}
              </span>
            </div>
          </div>
        </section>

        {/* Species Stock Grid - 1-col on mobile, 2-col on tablet, 4-col on desktop */}
        <section className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h2 className="text-sm sm:text-base font-black text-[#1A2E1A] uppercase tracking-wider flex items-center space-x-2">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-[#2EB85C]" />
              <span>Estoque Individual por Espécie</span>
            </h2>

            <button
              onClick={() => openResetModal()}
              className="text-[11px] sm:text-xs text-[#2EB85C] hover:text-[#1C3B24] font-bold flex items-center space-x-1 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ajustar valores de reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {mudas.map((m) => {
              const total = m.totalInicial || 500;
              const saidas = m.saidas || 0;
              const estoque = m.estoque !== undefined ? m.estoque : total - saidas;
              const percentual = total > 0 ? ((saidas / total) * 100).toFixed(1) : 0;
              const isEsgotado = estoque <= 0;
              const co2Muda = (saidas * 17.33).toFixed(1);

              return (
                <div 
                  key={m.id}
                  className={`bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-sm border transition-all duration-200 flex flex-col justify-between ${
                    isEsgotado ? 'border-red-300 bg-red-50/40' : 'border-[#2EB85C]/20 hover:border-[#2EB85C]/50 hover:shadow-md'
                  }`}
                >
                  {/* Top: Photo & Info */}
                  <div className="flex items-center space-x-3 mb-2.5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#F4EDE0] p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 shadow-inner">
                      <img 
                        src={m.imagemMuda} 
                        alt={m.nome} 
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[8.5px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider ${
                          isEsgotado 
                            ? 'bg-red-100 text-red-700 border border-red-300' 
                            : 'bg-[#2EB85C]/15 text-[#1C3B24] border border-[#2EB85C]/30'
                        }`}>
                          {isEsgotado ? 'ESGOTADA' : 'DISPONÍVEL'}
                        </span>

                        <button
                          onClick={() => openResetModal(m.id)}
                          className="text-[10px] text-gray-400 hover:text-[#2EB85C] font-bold underline transition-colors"
                          title={`Ajustar estoque de ${m.nome}`}
                        >
                          ajustar
                        </button>
                      </div>

                      <h3 className="font-black text-sm sm:text-base text-[#1A2E1A] mt-0.5 truncate uppercase">
                        {m.nome}
                      </h3>
                      <p className="text-gray-500 italic text-[10.5px] sm:text-[11px] truncate">
                        {m.cientifico}
                      </p>
                    </div>
                  </div>

                  {/* Counters Grid */}
                  <div className="grid grid-cols-2 gap-2 my-2 p-2 sm:p-2.5 bg-[#FAF5EC] rounded-xl sm:rounded-2xl border border-gray-100 text-center">
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-gray-500 uppercase block truncate">
                        Saídas (Doações)
                      </span>
                      <span className="text-base sm:text-lg font-black text-[#2EB85C] leading-none">
                        {saidas}
                      </span>
                      <span className="text-[8px] text-gray-400 block mt-0.5">
                        -{co2Muda} kgCO₂e
                      </span>
                    </div>
                    <div>
                      <span className="text-[8.5px] sm:text-[9px] font-bold text-gray-500 uppercase block truncate">
                        Estoque Restante
                      </span>
                      <span className={`text-base sm:text-lg font-black leading-none ${isEsgotado ? 'text-red-600' : 'text-[#1C3B24]'}`}>
                        {estoque}
                      </span>
                      <span className="text-[8px] text-gray-400 block mt-0.5">
                        de {total} inicial
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 mt-1">
                    <div className="flex justify-between text-[9.5px] sm:text-[10px] font-bold text-gray-500">
                      <span>{percentual}% distribuído</span>
                      <span>Total: {total}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                          isEsgotado ? 'bg-red-500' : 'bg-gradient-to-r from-[#2EB85C] to-[#7FD03F]'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, percentual))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live Orders & Vouchers Section (Optimized for Mobile with Card Feed + Desktop Table) */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-sm border border-[#2EB85C]/20 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-black text-[#1A2E1A] uppercase tracking-wider flex items-center space-x-2">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-[#2EB85C]" />
              <span>Últimos Vouchers Emitidos</span>
            </h2>

            <span className="text-[11px] sm:text-xs text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full">
              {orders.length} {orders.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs sm:text-sm">
              Nenhum voucher emitido ainda. Acompanhe as retiradas aqui em tempo real!
            </div>
          ) : (
            <>
              {/* MOBILE VIEW (< md): Touch-Friendly Cards Feed */}
              <div className="block md:hidden space-y-2.5">
                {orders.slice(0, 15).map((order, i) => (
                  <div 
                    key={order.id || i}
                    className="p-3 rounded-xl bg-[#FAF5EC]/70 border border-gray-100 flex flex-col space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono font-black text-[#1C3B24] bg-white px-2 py-0.5 rounded border border-gray-200 shadow-2xs">
                        {order.voucherCode || 'PF-0000'}
                      </span>
                      <span className="text-gray-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Hoje'}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-[#2EB85C] uppercase">
                        {order.mudaNome || order.mudaId}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 font-black text-[9px] uppercase px-2 py-0.5 rounded-full">
                        Retirado
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-600 flex items-center space-x-1 truncate">
                      <User className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{order.colaboradorNome || 'Colaborador Honda'}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW (>= md): Full Structured Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="py-2.5 px-3">Data / Hora</th>
                      <th className="py-2.5 px-3">Código Voucher</th>
                      <th className="py-2.5 px-3">Muda Escolhida</th>
                      <th className="py-2.5 px-3">Participante</th>
                      <th className="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order, i) => (
                      <tr key={order.id || i} className="hover:bg-[#FAF5EC]/60 transition-colors">
                        <td className="py-2.5 px-3 text-gray-600 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <span>{order.createdAt ? new Date(order.createdAt).toLocaleString('pt-BR') : 'Hoje'}</span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-[#1C3B24]">
                          {order.voucherCode || 'PF-0000'}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-[#2EB85C] uppercase">
                          {order.mudaNome || order.mudaId}
                        </td>
                        <td className="py-2.5 px-3 text-gray-700">
                          {order.colaboradorNome || 'Colaborador Honda'}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="bg-emerald-100 text-emerald-800 font-black text-[9.5px] uppercase px-2 py-0.5 rounded-full">
                            Retirado
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>

        {/* Footer Admin Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-500 pt-2 border-t border-gray-200 gap-2">
          <span>Honda Totens 50 Anos • Painel de Gestão de Mudas</span>
          <button 
            onClick={() => navigate('/plantando-o-futuro')}
            className="flex items-center space-x-1 text-[#2EB85C] hover:underline font-bold"
          >
            <span>Abrir Simulador Totem de Retirada</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {/* ============================================================ */}
      {/* CUSTOM RESET MODAL: ESCOLHA DO VALOR DE RESET PARA CADA MUDA */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isResetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full text-left shadow-2xl border border-gray-200 my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#1C3B24] text-[#7FD03F] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#1A2E1A] leading-tight">
                      Definir / Resetar Estoque
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500">
                      Escolha a quantidade de cada muda para redefinir o sistema
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsResetModalOpen(false)}
                  disabled={resetting}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Bulk Quick Apply Section */}
              <div className="my-3.5 p-3 sm:p-3.5 bg-[#FAF5EC] rounded-2xl border border-[#2EB85C]/20">
                <label className="block text-[11px] sm:text-xs font-bold text-[#1C3B24] mb-1.5">
                  ⚡ Preenchimento rápido (mesmo valor para todas):
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="0"
                    max="9999"
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    className="w-24 sm:w-28 px-3 py-1.5 rounded-xl border border-gray-300 font-bold text-sm text-[#1C3B24] bg-white focus:outline-none focus:border-[#2EB85C]"
                    placeholder="500"
                  />
                  <button
                    type="button"
                    onClick={() => handleBulkApply(bulkValue)}
                    className="flex-1 py-1.5 px-3 bg-[#1C3B24] hover:bg-[#254f31] text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
                  >
                    Aplicar a Todas
                  </button>
                </div>

                {/* Quick preset chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[500, 300, 200, 100, 50].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleBulkApply(preset)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                        Number(bulkValue) === preset 
                          ? 'bg-[#2EB85C] text-white border-[#2EB85C]' 
                          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {preset} cada
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Mudas Values Input List */}
              <div className="space-y-2.5 max-h-[38vh] overflow-y-auto pr-1">
                {mudas.map((m) => {
                  const currentValue = resetValues[m.id] !== undefined ? resetValues[m.id] : 500;

                  return (
                    <div 
                      key={m.id}
                      className="p-2.5 sm:p-3 rounded-2xl border border-gray-200 bg-white hover:border-[#2EB85C]/40 transition-colors flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-[#F4EDE0] p-1 flex-shrink-0 flex items-center justify-center border border-gray-200 overflow-hidden">
                          <img 
                            src={m.imagemMuda} 
                            alt={m.nome} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-black text-xs sm:text-sm text-[#1A2E1A] truncate uppercase">
                            {m.nome}
                          </h4>
                          <p className="text-[10px] text-gray-500 italic truncate">
                            {m.cientifico}
                          </p>
                          <span className="text-[9px] text-[#2EB85C] font-bold">
                            Atual: {m.estoque ?? 500} un.
                          </span>
                        </div>
                      </div>

                      {/* Stepper Input */}
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStepValue(m.id, -10)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-90 font-black text-xs text-gray-600 flex items-center justify-center transition-all"
                          title="-10"
                        >
                          -10
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStepValue(m.id, -1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-90 font-black text-xs text-gray-600 flex items-center justify-center transition-all"
                          title="-1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          max="9999"
                          value={currentValue}
                          onChange={(e) => handleSingleValueChange(m.id, e.target.value)}
                          className="w-16 sm:w-20 text-center py-1.5 px-1 rounded-lg border border-gray-300 font-black text-sm text-[#1C3B24] focus:outline-none focus:border-[#2EB85C]"
                        />
                        <button
                          type="button"
                          onClick={() => handleStepValue(m.id, +1)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-90 font-black text-xs text-gray-600 flex items-center justify-center transition-all"
                          title="+1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStepValue(m.id, +10)}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-90 font-black text-xs text-gray-600 flex items-center justify-center transition-all"
                          title="+10"
                        >
                          +10
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Zerar Saídas Checkbox */}
              <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center space-x-2 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={zerarSaidas}
                    onChange={(e) => setZerarSaidas(e.target.checked)}
                    className="w-4 h-4 rounded text-[#2EB85C] accent-[#2EB85C] cursor-pointer"
                  />
                  <span className="font-bold text-gray-700">
                    Zerar contagem de saídas / retiradas ao resetar
                  </span>
                </label>
              </div>

              {/* Total preview */}
              <div className="mt-2 p-2 bg-[#2EB85C]/10 rounded-xl text-center text-xs font-bold text-[#1C3B24]">
                Estoque Total Combinado: {Object.values(resetValues).reduce((a, b) => a + (Number(b) || 0), 0)} mudas
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-2 mt-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(false)}
                  disabled={resetting}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  disabled={resetting}
                  className="flex-1 py-2.5 rounded-xl bg-[#2EB85C] hover:bg-[#259b4c] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-1.5"
                >
                  {resetting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Redefinindo...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Confirmar Reset</span>
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
