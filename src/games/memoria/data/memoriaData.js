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
    subtitle: "5 PARES DE CARTAS",
    thumb: "/assets/jogo3/TELA INICIAL/usina-industrial-ao-por-do-sol-2.png",
    cards: [
      {
        id: "carvao",
        name: "Carvão Mineral",
        type: "Não renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/carvao-e-caminhao-em-mina-aberta-7.png",
        whatIs: "Combustível fóssil formado ao longo de milhões de anos a partir de florestas soterradas, utilizado em usinas termelétricas.",
        didYouKnow: "É a fonte de energia que mais emite CO2 por unidade de eletricidade gerada, sendo o principal alvo de substituição na transição energética global."
      },
      {
        id: "gas",
        name: "Gás Natural",
        type: "Não renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA RENOVÁVEL/usina-de-gas-natural-com-turbinas-3.png",
        whatIs: "Mistura de hidrocarbonetos gasosos encontrada no subsolo, frequentemente associada ao petróleo.",
        didYouKnow: "Sua queima libera cerca de 50% menos CO2 que o carvão, atuando como combustível de transição enquanto a matriz renovável se consolida."
      },
      {
        id: "petroleo",
        name: "Petróleo",
        type: "Não renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/cavalete-de-bombeamento-no-deserto-4.png",
        whatIs: "Líquido fóssil escuro rico em hidrocarbonetos, extraído de reservatórios profundos para produzir gasolina, diesel e derivados plásticos.",
        didYouKnow: "A queima de combustíveis derivados do petróleo é uma das maiores responsáveis pelo aquecimento global e poluição atmosférica das cidades."
      },
      {
        id: "nuclear",
        name: "Energia Nuclear",
        type: "Não renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/usina-nuclear-com-torres-de-resfriamento-8.png",
        whatIs: "Energia liberada pela fissão controlada de núcleos de urânio em reatores nucleares de alta precisão.",
        didYouKnow: "Não emite gases de efeito estufa durante sua geração diária, mas necessita de descarte e isolamento seguro de resíduos radioativos."
      },
      {
        id: "xisto",
        name: "Xisto Betuminoso",
        type: "Não renovável",
        image: "/assets/jogo3/IMAGENS ENERGIA NÃO RENOVÁVEL/estratos-de-xisto-betuminoso-10.png",
        whatIs: "Rocha sedimentar impregnada com matéria orgânica sólida chamada querogênio, que pode ser processada para produzir óleo e gás.",
        didYouKnow: "Sua extração e refino requerem consumo intensivo de água e energia térmica, gerando grande impacto ecológico local."
      }
    ]
  }
};
