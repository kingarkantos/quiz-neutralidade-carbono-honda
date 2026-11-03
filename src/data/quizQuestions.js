export const ALL_QUESTIONS = [
  {
    id: 1,
    question: "O que significa neutralidade de carbono?",
    options: [
      {
        id: "A",
        text: "Parar de fabricar produtos",
        image: "/assets/q1/a.png",
        isCorrect: false
      },
      {
        id: "B",
        text: "Equilibrar o CO₂ emitido com CO₂ removido da atmosfera.",
        image: "/assets/q1/b.png",
        isCorrect: true
      },
      {
        id: "C",
        text: "Utilizar somente materiais reciclados",
        image: "/assets/q1/c.png",
        isCorrect: false
      },
      {
        id: "D",
        text: "Eliminar o uso de eletricidade",
        image: "/assets/q1/d.png",
        isCorrect: false
      }
    ],
    correctOptionId: "B",
    explanationCorrect: "Neutralidade de carbono significa alcançar emissões líquidas de CO₂ iguais a zero. Para isso, é necessário reduzir ao máximo as emissões e equilibrar as que restarem com remoções de carbono.",
    explanationIncorrect: "Neutralidade de carbono não significa parar de fabricar produtos. O objetivo é reduzir as emissões e equilibrar as que restarem com remoções de carbono."
  },
  {
    id: 2,
    question: "Até que ano a Honda pretende alcançar a neutralidade de carbono em seus produtos e atividades corporativas?",
    options: [
      {
        id: "A",
        text: "2030",
        image: "/assets/q2/a.png",
        isCorrect: false
      },
      {
        id: "B",
        text: "2040",
        image: "/assets/q2/b.png",
        isCorrect: false
      },
      {
        id: "C",
        text: "2050",
        image: "/assets/q2/c.png",
        isCorrect: true
      },
      {
        id: "D",
        text: "2070",
        image: "/assets/q2/d.png",
        isCorrect: false
      }
    ],
    correctOptionId: "C",
    explanationCorrect: "A meta global da Honda é alcançar a neutralidade de carbono em todos os seus produtos e atividades corporativas até 2050, com a iniciativa Tripla Ação Para o Zero!",
    explanationIncorrect: "A resposta correta é 2050! O compromisso mundial da Honda é zerar o impacto ambiental de suas operações e produtos até 2050."
  },
  {
    id: 3,
    question: "Como uma fábrica pode contribuir para reduzir as emissões de CO₂?",
    options: [
      {
        id: "A",
        text: "Aumentando o desperdício de energia",
        image: "/assets/q3/a.png",
        isCorrect: false
      },
      {
        id: "B",
        text: "Mantendo equipamentos ligados sem necessidade.",
        image: "/assets/q3/b.png",
        isCorrect: false
      },
      {
        id: "C",
        text: "Consumindo mais combustíveis fósseis",
        image: "/assets/q3/c.png",
        isCorrect: false
      },
      {
        id: "D",
        text: "Melhorando a eficiência energética e utilizando energia renováveis",
        image: "/assets/q3/d.png",
        isCorrect: true
      }
    ],
    correctOptionId: "D",
    explanationCorrect: "Uma fábrica pode reduzir emissões de CO₂ melhorando a eficiência energética, modernizando equipamentos e utilizando fontes de energia renováveis, como energia solar e eólica.",
    explanationIncorrect: "A resposta correta é a alternativa D. Uma fábrica contribui modernizando equipamentos, evitando desperdícios e gerando energia limpa através de fontes renováveis."
  },
  {
    id: 4,
    question: "Na mobilidade urbana, qual iniciativa reduz diretamente as emissões de poluentes?",
    options: [
      {
        id: "A",
        text: "Mobilidade elétrica e tecnologias de alta eficiência",
        image: "/assets/q4/a.png",
        isCorrect: true
      },
      {
        id: "B",
        text: "Manter motores antigos e desregulados",
        image: "/assets/q4/b.png",
        isCorrect: false
      },
      {
        id: "C",
        text: "Priorizar consumo acelerado de combustível",
        image: "/assets/q4/c.png",
        isCorrect: false
      },
      {
        id: "D",
        text: "Desperdiçar energia e recursos operacionais",
        image: "/assets/q4/d.png",
        isCorrect: false
      }
    ],
    correctOptionId: "A",
    explanationCorrect: "A eletrificação de veículos, motocicletas elétricas e motores de última geração diminuem drasticamente a emissão de gases de efeito estufa nas cidades.",
    explanationIncorrect: "A resposta correta é a alternativa A. Investir em mobilidade elétrica e motores modernos é a forma mais eficaz de transformar o trânsito em algo mais limpo."
  },
  {
    id: 5,
    question: "No nosso dia a dia, qual atitude individual contribui para reduzir as emissões de CO₂?",
    options: [
      {
        id: "A",
        text: "Apagar as luzes e economizar energia elétrica",
        image: "/assets/q5/a.png",
        isCorrect: true
      },
      {
        id: "B",
        text: "Deixar luzes acesas em ambientes desocupados",
        image: "/assets/q3/a.png",
        isCorrect: false
      },
      {
        id: "C",
        text: "Consumir energia em excesso nos horários de pico",
        image: "/assets/q4/d.png",
        isCorrect: false
      },
      {
        id: "D",
        text: "Descartar resíduos recicláveis sem separação",
        image: "/assets/q1/c.png",
        isCorrect: false
      }
    ],
    correctOptionId: "A",
    explanationCorrect: "Pequenas atitudes diárias, como apagar luzes ao sair do ambiente e usar a energia com consciência, reduzem a demanda das usinas e diminuem as emissões de carbono.",
    explanationIncorrect: "A resposta correta é a alternativa A. Economizar energia no dia a dia é uma das atitudes mais acessíveis e poderosas para proteger o meio ambiente."
  }
];

/**
 * Embaralhamento Fisher-Yates robusto e uniforme
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Retorna 3 perguntas sorteadas aleatoriamente do banco de perguntas
 */
export function getRandomQuizQuestions() {
  const shuffled = shuffleArray(ALL_QUESTIONS);
  return shuffled.slice(0, 3);
}

