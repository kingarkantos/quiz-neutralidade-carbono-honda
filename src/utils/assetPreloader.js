// Pré-carregador silencioso de assets críticos para Android e Totens
// Executa em segundo plano sem bloquear a interface

const CRITICAL_IMAGES = [
  // Fundos principais
  '/assets/bg/slice-quiz.webp',
  '/assets/bg/slice-hub.webp',
  '/assets/jogo3/FUNDOS/slice-1-1.webp',

  // Folhagens e Logos
  '/assets/elements/folha.webp',
  '/assets/elements/folha-l.webp',
  '/assets/elements/folha-r.webp',
  '/assets/logos/honda.svg',
  '/assets/logos/tripla-acao.png',
  '/assets/logos/plantando-o-futuro.png',

  // Jogo 1 - Planetas de Feedback
  '/assets/elements/terra-feliz.webp',
  '/assets/elements/terra-triste.webp',

  // Jogo 2 - Ligue os Pontos
  '/assets/jogo2/ELEMENTOS/TELA INICIAL/ciclo-sustentavel-entre-maquina-e-natureza-1.webp',
  '/assets/jogo2/ELEMENTOS/ACOES/reaproveitamento-de-agua.webp',
  '/assets/jogo2/ELEMENTOS/ACOES/coleta-seletiva.webp',
  '/assets/jogo2/ELEMENTOS/ACOES/reutilizacao-de-embalagens.webp',
  '/assets/jogo2/ELEMENTOS/ACOES/logistica-reversa.webp',

  // Jogo 3 - Memória
  '/assets/jogo3/CARDS/energia-solar.webp',
  '/assets/jogo3/CARDS/energia-eolica.webp',
  '/assets/jogo3/CARDS/biomassa.webp',
  '/assets/jogo3/CARDS/petroleo.webp',
  '/assets/jogo3/CARDS/carvao-mineral.webp',

  // Módulo 4 - Plantando o Futuro (Mudas e Árvores)
  '/assets/plantando-futuro/mudas/acai/muda-acai.webp?v=4',
  '/assets/plantando-futuro/mudas/cupuacu/muda.webp?v=4',
  '/assets/plantando-futuro/mudas/ipe-roxo/muda.webp?v=4',
  '/assets/plantando-futuro/mudas/ipe-amarelo/muda.webp?v=4'
];

let hasPreloaded = false;

export function preloadCriticalAssets() {
  if (hasPreloaded || typeof window === 'undefined') return;
  hasPreloaded = true;

  // Usa requestIdleCallback se disponível ou setTimeout para não competir com a renderização inicial
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1000));

  schedule(() => {
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  });
}

