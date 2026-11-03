export const MEMORIA_ROUNDS = {
  1: {
    roundNumber: 1,
    title: "Fontes Renováveis",
    subtitle: "5 PARES DE CARTAS",
    thumb: "/assets/jogo3/TELA INICIAL/turbinas-eolicas-nas-colinas-verdes-1.png",
    cards: [
      {
        id: "solar",
        name: "Energia Solar",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/fazenda-solar-em-colinas-verdes-9.png",
        whatIs: "Energia obtida da radiação do sol, que pode ser convertida diretamente em eletricidade por painéis fotovoltaicos.",
        didYouKnow: "Durante a geração não há emissão direta de CO2 e é uma fonte limpa, silenciosa e renovável, com enorme potencial de expansão."
      },
      {
        id: "eolica",
        name: "Energia Eólica",
        type: "Renovável",
        image: "/assets/jogo3/TELA INICIAL/turbinas-eolicas-nas-colinas-verdes-1.png",
        whatIs: "Energia produzida pela força dos ventos, que movimentam pás de turbinas gigantescas conectadas a geradores de eletricidade.",
        didYouKnow: "Os aerogeradores produzem eletricidade limpa sem queimar nenhum combustível fóssil e ocupam pouco espaço no solo."
      },
      {
        id: "hidreletrica",
        name: "Energia Hidrelétrica",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/represa-hidreletrica-entre-colinas-verdes-2.png",
        whatIs: "Energia produzida pela força da água em movimento, que aciona turbinas hidráulicas para gerar eletricidade em larga escala.",
        didYouKnow: "É uma das principais fontes de matriz elétrica do Brasil, aproveitando o grande volume de bacias hidrográficas naturais."
      },
      {
        id: "biomassa",
        name: "Biomassa",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/usina-de-biomassa-sustentavel-5.png",
        whatIs: "Energia gerada a partir da queima controlada de matéria orgânica, como bagaço de cana, casca de arroz e resíduos agrícolas.",
        didYouKnow: "Reaproveita resíduos que seriam descartados, participando de um ciclo fechado onde as plantas reabsorvem o carbono ao crescer."
      },
      {
        id: "geotermica",
        name: "Energia Geotérmica",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/usina-geotermica-entre-colinas-vulcanicas-6.png",
        whatIs: "Energia gerada aproveitando o calor contínuo e o vapor d'água das profundezas da crosta terrestre.",
        didYouKnow: "Gera eletricidade de forma constante e confiável 24 horas por dia, com emissões de gases de efeito estufa extremamente baixas."
      }
    ]
  },
  2: {
    roundNumber: 2,
    title: "Fontes e Transição",
    subtitle: "PARES DE CARTAS",
    thumb: "/assets/jogo3/TELA INICIAL/usina-industrial-ao-por-do-sol-2.png",
    cards: [
      {
        id: "petroleo",
        name: "Petróleo",
        type: "Não renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/cavalete-de-bombeamento-no-deserto-4.png",
        whatIs: "Líquido fóssil escuro rico em hidrocarbonetos, extraído de reservatórios profundos para produzir gasolina, diesel e derivados plásticos."
      }
    ]
  }
};

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Retorna 5 pares mistos balanceados: opções de fontes renováveis e de transição
 */
export function getMixedMemoriaCards() {
  const renowables = shuffle([...MEMORIA_ROUNDS[1].cards]);
  const transition = shuffle([...MEMORIA_ROUNDS[2].cards]);
  
  // Utiliza as 5 fontes renováveis ou 4 renováveis + 1 de transição se houver
  const countTransition = transition.length > 0 && Math.random() > 0.6 ? 1 : 0;
  const countRenovavel = 5 - countTransition;

  const selected = [
    ...renowables.slice(0, countRenovavel),
    ...transition.slice(0, countTransition)
  ];

  return shuffle(selected);
}

