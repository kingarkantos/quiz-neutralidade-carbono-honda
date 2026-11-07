export const MEMORIA_ROUNDS = {
  1: {
    roundNumber: 1,
    title: "Fontes Renováveis",
    subtitle: "5 PARES DE CARTAS",
    thumb: "/assets/jogo3/TELA INICIAL/turbinas-eolicas-nas-colinas-verdes-1.webp",
    cards: [
      {
        id: "solar",
        name: "Energia Solar",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/fazenda-solar-em-colinas-verdes-9.webp",
        whatIs: "Energia obtida da radiação do sol, que pode ser convertida diretamente em eletricidade por painéis solares fotovoltaicos."
      },
      {
        id: "eolica",
        name: "Energia Eólica",
        type: "Renovável",
        image: "/assets/jogo3/TELA INICIAL/turbinas-eolicas-nas-colinas-verdes-1.webp",
        whatIs: "Energia produzida pela força dos ventos, que movimentam pás de turbinas gigantescas conectadas a geradores de eletricidade."
      },
      {
        id: "hidreletrica",
        name: "Energia Hidroelétrica",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/represa-hidreletrica-entre-colinas-verdes-2.webp",
        whatIs: "Energia produzida pela força da água em movimento, que aciona turbinas hidráulicas para gerar eletricidade em usinas e reservatórios."
      },
      {
        id: "biomassa",
        name: "Biomassa (bagaço de cana)",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/usina-de-biomassa-sustentavel-5.webp",
        whatIs: "Energia gerada a partir da queima controlada de matéria orgânica vegetal, como bagaço de cana-de-açúcar e resíduos agrícolas."
      },
      {
        id: "geotermica",
        name: "Energia Geotérmica (vapor)",
        type: "Renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/usina-geotermica-entre-colinas-vulcanicas-6.webp",
        whatIs: "Energia gerada aproveitando o calor natural contínuo e o vapor d'água das profundezas da crosta terrestre para mover turbinas."
      }
    ]
  },
  2: {
    roundNumber: 2,
    title: "Fontes Não Renováveis",
    subtitle: "TERMOELÉTRICA",
    thumb: "/assets/jogo3/TELA INICIAL/usina-industrial-ao-por-do-sol-2.webp",
    cards: [
      {
        id: "termoeletrica",
        name: "Termoelétrica (gasolina e diesel)",
        type: "Não renovável",
        image: "/assets/jogo3/TELA INICIAL/usina-industrial-ao-por-do-sol-2.webp",
        whatIs: "Usinas que produzem eletricidade pela queima de combustíveis fósseis derivados do petróleo (gasolina e diesel), gerando emissões de poluentes e CO₂."
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
 * Retorna 5 pares: 1 Não Renovável (Termoelétrica) + 4 Renováveis sorteadas entre as 5 disponíveis
 */
export function getMixedMemoriaCards() {
  const renowables = shuffle([...MEMORIA_ROUNDS[1].cards]);
  const nonRenewable = [...MEMORIA_ROUNDS[2].cards];

  const selected = [
    ...renowables.slice(0, 4),
    ...nonRenewable
  ];

  return shuffle(selected);
}

