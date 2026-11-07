// Client service for Plantando o Futuro Mudas & Dashboard

export const DEFAULT_MUDAS = [
  {
    id: 'acai',
    nome: 'AÇAÍ',
    cientifico: 'Euterpe oleracea',
    origem: 'Amazônia',
    porte: '15–20 m (até 25 m)',
    floracao: 'setembro a dezembro',
    imagemMuda: '/assets/plantando-futuro/mudas/acai/muda-acai.webp?v=4',
    imagemDetalhe: '/assets/plantando-futuro/mudas/acai/detalhe-acai.webp?v=4',
    imagemArvore: '/assets/plantando-futuro/mudas/acai/arvore.webp?v=4',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'cupuacu',
    nome: 'CUPUAÇU',
    cientifico: 'Theobroma grandiflorum',
    origem: 'Amazônia',
    porte: '8–15 m',
    floracao: 'setembro a dezembro',
    imagemMuda: '/assets/plantando-futuro/mudas/cupuacu/muda.webp?v=4',
    imagemDetalhe: '/assets/plantando-futuro/mudas/cupuacu/detalhe.webp?v=4',
    imagemArvore: '/assets/plantando-futuro/mudas/cupuacu/arvore.webp?v=4',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'ipe-roxo',
    nome: 'IPÊ ROXO',
    cientifico: 'Handroanthus impetiginosus',
    origem: 'Amazônia',
    porte: '8–20 m (até 30 m)',
    floracao: 'julho a setembro',
    imagemMuda: '/assets/plantando-futuro/mudas/ipe-roxo/muda.webp?v=4',
    imagemDetalhe: '/assets/plantando-futuro/mudas/ipe-roxo/detalhe.webp?v=4',
    imagemArvore: '/assets/plantando-futuro/mudas/ipe-roxo/arvore.webp?v=4',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  },
  {
    id: 'ipe-amarelo',
    nome: 'IPÊ AMARELO',
    cientifico: 'Handroanthus chrysotrichus',
    origem: 'Amazônia',
    porte: '8–20 m (até 30 m)',
    floracao: 'julho a setembro',
    imagemMuda: '/assets/plantando-futuro/mudas/ipe-amarelo/muda.webp?v=4',
    imagemDetalhe: '/assets/plantando-futuro/mudas/ipe-amarelo/detalhe.webp?v=4',
    imagemArvore: '/assets/plantando-futuro/mudas/ipe-amarelo/arvore.webp?v=4',
    totalInicial: 500,
    estoque: 500,
    saidas: 0
  }
];

const LOCAL_STORAGE_KEY = 'plantando_futuro_mudas_cache';

function sanitizeMudas(list) {
  if (!Array.isArray(list)) return DEFAULT_MUDAS;
  const defaultsMap = new Map(DEFAULT_MUDAS.map(m => [m.id, m]));
  const order = ['acai', 'cupuacu', 'ipe-roxo', 'ipe-amarelo'];
  return list
    .filter(m => m.id !== 'graviola')
    .map(m => {
      const def = defaultsMap.get(m.id);
      if (!def) return m;
      return {
        ...def,
        ...m,
        nome: def.nome,
        cientifico: def.cientifico,
        origem: def.origem,
        porte: def.porte,
        floracao: def.floracao,
        imagemMuda: def.imagemMuda,
        imagemDetalhe: def.imagemDetalhe,
        imagemArvore: def.imagemArvore
      };
    })
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
}

export async function getMudas() {
  try {
    const res = await fetch(`/api/mudas?t=${Date.now()}`);
    if (!res.ok) throw new Error('Falha ao carregar mudas');
    const json = await res.json();
    if (json.success && json.mudas) {
      const sanitized = sanitizeMudas(json.mudas);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
      return sanitized;
    }
  } catch (err) {
    console.warn('Usando cache local para mudas:', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      return sanitizeMudas(JSON.parse(cached));
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

