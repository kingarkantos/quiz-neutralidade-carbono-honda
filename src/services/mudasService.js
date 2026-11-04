// Client service for Plantando o Futuro Mudas & Dashboard

export const DEFAULT_MUDAS = [
  {
    id: 'ipe-amarelo',
    nome: 'IPÊ-AMARELO',
    cientifico: 'Handroanthus albus',
    origem: 'Nativa do Brasil',
    tipo: 'Florestal',
    clima: 'Tropical',
    crescimento: 'Médio a lento',
    alturaAdulta: '20 a 30 m',
    floracao: 'Julho a setembro',
    caracteristica: 'Flores amarelas',
    imagemMuda: '/assets/plantando-futuro/mudas/ipe-amarelo/muda.png',
    imagemDetalhe: '/assets/plantando-futuro/mudas/ipe-amarelo/detalhe.png',
    imagemArvore: '/assets/plantando-futuro/mudas/ipe-amarelo/arvore.png',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'ipe-roxo',
    nome: 'IPÊ-ROXO',
    cientifico: 'Handroanthus impetiginosus',
    origem: 'Nativa do Brasil',
    tipo: 'Florestal',
    clima: 'Tropical',
    crescimento: 'Médio a lento',
    alturaAdulta: '20 a 30 m',
    floracao: 'Julho a setembro',
    caracteristica: 'Flores roxas',
    imagemMuda: '/assets/plantando-futuro/mudas/ipe-roxo/muda.png',
    imagemDetalhe: '/assets/plantando-futuro/mudas/ipe-roxo/detalhe.png',
    imagemArvore: '/assets/plantando-futuro/mudas/ipe-roxo/arvore.png',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'cupuacu',
    nome: 'CUPUAÇU',
    cientifico: 'Theobroma grandiflorum',
    origem: 'Amazônia',
    tipo: 'Frutífera',
    clima: 'Quente e úmido',
    crescimento: 'Médio',
    alturaAdulta: '10 a 15 m',
    floracao: 'Dezembro a fevereiro',
    caracteristica: 'Fruto com polpa cremosa e aromática',
    imagemMuda: '/assets/plantando-futuro/mudas/cupuacu/muda.png',
    imagemDetalhe: '/assets/plantando-futuro/mudas/cupuacu/detalhe.png',
    imagemArvore: '/assets/plantando-futuro/mudas/cupuacu/arvore.png',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'acai',
    nome: 'AÇAÍ',
    cientifico: 'Euterpe oleracea',
    origem: 'Amazônia',
    tipo: 'Frutífera',
    clima: 'Quente e úmido',
    crescimento: 'Rápido',
    alturaAdulta: '15 a 25 m',
    floracao: 'Setembro a dezembro',
    caracteristica: 'Frutos roxos em cachos ricos em antioxidantes',
    imagemMuda: '/assets/plantando-futuro/mudas/acai/muda.png',
    imagemDetalhe: '/assets/plantando-futuro/mudas/acai/detalhe.png',
    imagemArvore: '/assets/plantando-futuro/mudas/acai/arvore.png',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'graviola',
    nome: 'GRAVIOLA',
    cientifico: 'Annona muricata',
    origem: 'América Tropical / Brasil',
    tipo: 'Frutífera',
    clima: 'Quente e úmido',
    crescimento: 'Médio',
    alturaAdulta: '4 a 8 m',
    floracao: 'Quase todo o ano',
    caracteristica: 'Polpa branca aveludada, sabor agridoce',
    imagemMuda: '/assets/plantando-futuro/mudas/graviola/muda.png',
    imagemDetalhe: '/assets/plantando-futuro/mudas/graviola/detalhe.png',
    imagemArvore: '/assets/plantando-futuro/mudas/graviola/arvore.png',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  }
];

const LOCAL_STORAGE_KEY = 'plantando_futuro_mudas_cache';

export async function getMudas() {
  try {
    const res = await fetch('/api/mudas');
    if (!res.ok) throw new Error('Falha ao carregar mudas');
    const json = await res.json();
    if (json.success && json.mudas) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.mudas));
      return json.mudas;
    }
  } catch (err) {
    console.warn('Usando cache local para mudas:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {}
  }

  return DEFAULT_MUDAS;
}

export async function resgatarMuda(mudaId, colaboradorNome = '', signatureData = '') {
  try {
    const res = await fetch('/api/mudas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'resgatar',
        mudaId,
        colaboradorNome,
        signatureData
      })
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Não foi possível confirmar o pedido.');
    }
    return json;
  } catch (err) {
    console.error('Erro no resgate:', err);
    // Offline local decrement fallback
    const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || JSON.stringify(DEFAULT_MUDAS));
    const target = cached.find(m => m.id === mudaId);
    if (target && target.estoque > 0) {
      target.estoque -= 1;
      target.saidas = (target.saidas || 0) + 1;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cached));
      const rand = Math.floor(1000 + Math.random() * 9000);
      return {
        success: true,
        voucherCode: `PF-OFF-${rand}`,
        mudaId,
        mudaNome: target.nome,
        novoEstoque: target.estoque,
        esgotado: target.estoque <= 0,
        offline: true
      };
    }
    throw err;
  }
}

export async function getDashboardData() {
  try {
    const res = await fetch('/api/mudas?type=dashboard');
    if (!res.ok) throw new Error('Falha ao obter dashboard');
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn('Dashboard offline fallback:', err);
    const mudas = await getMudas();
    const totalEstoque = mudas.reduce((acc, m) => acc + (m.estoque || 0), 0);
    const totalSaidas = mudas.reduce((acc, m) => acc + (m.saidas || 0), 0);
    const totalInicial = mudas.reduce((acc, m) => acc + (m.totalInicial || 500), 0);
    return {
      success: true,
      mudas,
      orders: [],
      summary: {
        totalEstoque,
        totalSaidas,
        totalInicial,
        percentualDistribuido: totalInicial > 0 ? ((totalSaidas / totalInicial) * 100).toFixed(1) : 0,
        disponiveisCount: mudas.filter(m => m.estoque > 0).length,
        esgotadasCount: mudas.filter(m => m.estoque <= 0).length
      }
    };
  }
}

export async function resetEstoque(mudaId = null) {
  const res = await fetch('/api/mudas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'reset', mudaId })
  });
  return await res.json();
}

