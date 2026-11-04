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
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData, resetEstoque } from '../services/mudasService';

export default function PlantasDashboardScreen() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [resetModalMuda, setResetModalMuda] = useState(null);
  const [resetting, setResetting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const loadData = async () => {
    try {
      const res = await getDashboardData();
      if (res && res.success) {
        setData(res);
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

  const handleReset = async (mudaId = null) => {
    setResetting(true);
    try {
      await resetEstoque(mudaId);
      setFeedbackMsg(mudaId ? `Estoque de ${mudaId} redefinido para 500.` : 'Todas as mudas foram redefinidas para 500.');
      await loadData();
      setTimeout(() => setFeedbackMsg(''), 4000);
    } catch (err) {
      setFeedbackMsg('Erro ao resetar: ' + err.message);
    } finally {
      setResetting(false);
      setResetModalMuda(null);
    }
  };

  const mudas = data?.mudas || [];
  const orders = data?.orders || [];
  const summary = data?.summary || {
    totalEstoque: 2500,
    totalSaidas: 0,
    totalInicial: 2500,
    percentualDistribuido: 0,
    disponiveisCount: 5,
    esgotadasCount: 0
  };

  return (
    <div className="w-full min-h-screen bg-[#F4EDE0] text-[#1A2E1A] flex flex-col font-sans select-none pb-12">
      {/* Top Navigation Bar */}
      <header className="w-full bg-[#1C3B24] text-white px-5 sm:px-8 py-3.5 shadow-md flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">TOTEM HUB</span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white/15 p-1 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-[#7FD03F]" />
            </div>
            <div>
              <h1 className="font-serif font-black text-sm sm:text-base leading-none">
                PLANTANDO O FUTURO
              </h1>
              <p className="text-[10px] text-[#7FD03F] font-bold tracking-wide">
                Painel de Acompanhamento das Saídas de Mudas
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <label className="hidden md:flex items-center space-x-1.5 text-xs text-white/80 cursor-pointer">
            <input 
              type="checkbox" 
              checked={autoRefresh} 
              onChange={(e) => setAutoRefresh(e.target.checked)} 
              className="rounded accent-[#2EB85C]"
            />
            <span>Auto-atualizar (10s)</span>
          </label>

          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center space-x-1.5 bg-[#2EB85C] hover:bg-[#259b4c] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>ATUALIZAR</span>
          </button>

          <img 
            src="/assets/logos/honda.svg" 
            alt="Honda" 
            className="h-7 w-auto object-contain brightness-0 invert" 
          />
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* Feedback Alert */}
        {feedbackMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#2EB85C] text-white px-4 py-2.5 rounded-2xl shadow-md text-xs sm:text-sm font-bold flex items-center justify-between"
          >
            <span>{feedbackMsg}</span>
            <button onClick={() => setFeedbackMsg('')}>×</button>
          </motion.div>
        )}

        {/* Hero KPI Summary Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. Total Saídas */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#2EB85C]/15 text-[#2EB85C] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Total Distribuído
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.totalSaidas}
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                mudas entregues
              </span>
            </div>
          </div>

          {/* 2. Total Estoque Restante */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#7FD03F]/20 text-[#1C3B24] flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Estoque Restante
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.totalEstoque}
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                de {summary.totalInicial} mudas
              </span>
            </div>
          </div>

          {/* 3. Percentual Distribuído */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Progresso Geral
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.percentualDistribuido}%
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                concluído
              </span>
            </div>
          </div>

          {/* 4. Espécies Disponíveis */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#2EB85C]/20 flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Espécies Ativas
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#1C3B24] leading-none">
                {summary.disponiveisCount} <span className="text-sm font-bold text-gray-400">/ 5</span>
              </span>
              <span className="text-[10px] text-gray-400 block mt-0.5">
                {summary.esgotadasCount > 0 ? `${summary.esgotadasCount} esgotada(s)` : 'Todas disponíveis'}
              </span>
            </div>
          </div>
        </section>

        {/* Species Stock Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-[#1A2E1A] uppercase tracking-wider flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-[#2EB85C]" />
              <span>Acompanhamento por Espécie (500 mudas cada)</span>
            </h2>

            <button
              onClick={() => setResetModalMuda('all')}
              className="text-xs text-gray-500 hover:text-red-700 font-bold flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Redefinir Todas para 500</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {mudas.map((m) => {
              const total = m.totalInicial || 500;
              const saidas = m.saidas || 0;
              const estoque = m.estoque !== undefined ? m.estoque : total - saidas;
              const percentual = total > 0 ? ((saidas / total) * 100).toFixed(1) : 0;
              const isEsgotado = estoque <= 0;

              return (
                <div 
                  key={m.id}
                  className={`bg-white rounded-3xl p-4 shadow-sm border transition-all duration-200 flex flex-col justify-between ${
                    isEsgotado ? 'border-red-300 bg-red-50/40' : 'border-[#2EB85C]/20 hover:border-[#2EB85C]/50'
                  }`}
                >
                  {/* Top: Photo & Info */}
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-[#F4EDE0] p-1 flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 shadow-inner">
                      <img 
                        src={m.imagemMuda} 
                        alt={m.nome} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          isEsgotado 
                            ? 'bg-red-100 text-red-700 border border-red-300' 
                            : 'bg-[#2EB85C]/15 text-[#1C3B24] border border-[#2EB85C]/30'
                        }`}>
                          {isEsgotado ? 'ESGOTADA' : 'DISPONÍVEL'}
                        </span>

                        <button
                          onClick={() => setResetModalMuda(m.id)}
                          className="text-[10px] text-gray-400 hover:text-gray-700 underline"
                          title="Redefinir estoque desta espécie"
                        >
                          resetar
                        </button>
                      </div>

                      <h3 className="font-black text-sm sm:text-base text-[#1A2E1A] mt-1 truncate uppercase">
                        {m.nome}
                      </h3>
                      <p className="text-gray-500 italic text-[11px] truncate">
                        {m.cientifico}
                      </p>
                    </div>
                  </div>

                  {/* Counters */}
                  <div className="grid grid-cols-2 gap-2 my-2 p-2 bg-[#FAF5EC] rounded-2xl border border-gray-100 text-center">
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase block">Saídas (Retiradas)</span>
                      <span className="text-lg font-black text-[#2EB85C] leading-none">{saidas}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase block">Estoque Restante</span>
                      <span className={`text-lg font-black leading-none ${isEsgotado ? 'text-red-600' : 'text-[#1C3B24]'}`}>
                        {estoque}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                      <span>{percentual}% distribuído</span>
                      <span>Meta: {total} mudas</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
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

        {/* Live Orders & Vouchers Table */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#2EB85C]/20 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black text-[#1A2E1A] uppercase tracking-wider flex items-center space-x-2">
              <Ticket className="w-5 h-5 text-[#2EB85C]" />
              <span>Últimos Vouchers Gerados em Tempo Real</span>
            </h2>

            <span className="text-xs text-gray-500 font-bold">
              {orders.length} registros recentes
            </span>
          </div>

          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-xs">
                Nenhum voucher emitido ainda. Acompanhe as retiradas aqui em tempo real!
              </div>
            ) : (
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
            )}
          </div>
        </section>

        {/* Footer Admin Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200 gap-2">
          <span>Honda Totens 50 Anos • Módulo Plantando o Futuro</span>
          <button 
            onClick={() => navigate('/plantando-o-futuro')}
            className="flex items-center space-x-1 text-[#2EB85C] hover:underline font-bold"
          >
            <span>Abrir Simulador Totem de Retirada</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {resetModalMuda && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-gray-200"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#1A2E1A] mb-1">
                Confirmar Redefinição?
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {resetModalMuda === 'all'
                  ? 'Você está prestes a redefinir o estoque de TODAS as 5 espécies para 500 unidades e zerar as saídas registradas.'
                  : `Deseja redefinir o estoque da espécie "${resetModalMuda}" para 500 unidades?`}
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => setResetModalMuda(null)}
                  disabled={resetting}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleReset(resetModalMuda === 'all' ? null : resetModalMuda)}
                  disabled={resetting}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md"
                >
                  {resetting ? 'Redefinindo...' : 'Confirmar Reset'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

