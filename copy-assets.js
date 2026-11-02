import fs from 'fs';
import path from 'path';

const copyAsset = (srcRel, destRel) => {
  const src = path.resolve('assets/QUIZ NEUTRALIDADE DE CARBONO-20261102T213047Z-1-001/QUIZ NEUTRALIDADE DE CARBONO', srcRel);
  const dest = path.resolve('public/assets', destRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${srcRel} -> ${destRel}`);
  } else {
    console.error(`NOT FOUND: ${src}`);
  }
};

copyAsset('ELEMENTOS/FUNDOS/Slice 1.png', 'bg/slice1.png');
copyAsset('ELEMENTOS/FUNDOS/Slice 2.png', 'bg/slice2.png');

copyAsset('ELEMENTOS/LOGOS e ICONES/Logotipo Honda restaurado em fundo transparente.png', 'logos/honda.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Logo Tripla Ação para o Zero.png', 'logos/tripla-acao.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Logotipo QUIZ de neutralidade de carbono-1 (1).png', 'logos/quiz-logo.png');

copyAsset('ELEMENTOS/LOGOS e ICONES/Folha verde isolada em fundo transparente-2.png', 'elements/folha.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Folhagem tropical em destaque.png', 'elements/folhagem.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Nuvem 3D de CO² isolada-4.png', 'elements/co2-cloud.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Planeta Terra sorridente com fundo transparente-1.png', 'elements/earth-happy.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Planeta cinzento triste em fundo transparente-3.png', 'elements/earth-sad.png');
copyAsset('ELEMENTOS/LOGOS e ICONES/Um futuro com menos emissões.png', 'elements/futuro-menos-emissoes.png');

// Perguntas
copyAsset('PERGUNTAS 01/Parada de produção na esteira-2.png', 'q1/a.png');
copyAsset('PERGUNTAS 01/Equilíbrio entre CO² emitido e removido-1.png', 'q1/b.png');
copyAsset('PERGUNTAS 01/Sucata reciclada em nova engrenagem-3.png', 'q1/c.png');
copyAsset('PERGUNTAS 01/Máquina industrial sem eletricidade-4.png', 'q1/d.png');

copyAsset('PERGUNTA 02/Fábrica Honda e calendário 2030-1.png', 'q2/a.png');
copyAsset('PERGUNTA 02/Fábrica Honda com calendário 2040-4.png', 'q2/b.png');
copyAsset('PERGUNTA 02/Fábrica Honda e calendário 2050-2.png', 'q2/c.png');
copyAsset('PERGUNTA 02/Fábrica Honda e calendário 2070-3.png', 'q2/d.png');

copyAsset('PERGUNTA 03/Desperdício de energia na iluminação-1.png', 'q3/a.png');
copyAsset('PERGUNTA 03/Máquinas ligadas, esteira vazia-2.png', 'q3/b.png');
copyAsset('PERGUNTA 03/Tambores de petróleo junto à caldeira-3.png', 'q3/c.png');
copyAsset('PERGUNTA 03/Motor eficiente com energia solar e eólica-4.png', 'q3/d.png');

copyAsset('PERGUNTA 04/Mobilidade elétrica e tecnologia eficiente-1.png', 'q4/a.png');
copyAsset('PERGUNTA 04/Motor antigo e ineficiente-2.png', 'q4/b.png');
copyAsset('PERGUNTA 04/Consumo de combustível em alta-3.png', 'q4/c.png');
copyAsset('PERGUNTA 04/Desperdício de energia em oficina vazia-4.png', 'q4/d.png');

copyAsset('PERGUNTA 05/Apagar a luz, poupar energia-1.png', 'q5/a.png');

console.log('Finished copying assets!');

