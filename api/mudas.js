import crypto from 'crypto';
import https from 'https';

const SA = {
  project_id: 'honda-ambiental-zql0i3',
  client_email: 'firebase-adminsdk-eiqfb@honda-ambiental-zql0i3.iam.gserviceaccount.com',
  private_key: process.env.FIREBASE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxrvLahNR0wZup\n0TP5LbpYNiQiByBt/pczQNhszQL1BPVoSAu4btMrebRxeCV9GsUEk9Sn3c6chcKY\nGi3D1OZDYcbdRaNTQrSGF5lEA2QBVXkOtt0RjYos6qnRTrqkaMSU5lXADJRd26Sx\n0FXFSOhannHzvuHZkVRPNdMC/cv+q91VhiZ0KUkKJl3XRENcEMqoCRJnIbPZyNan\nmLtf1gD67m5vC2rgq5F3xt/3oLMY2ZvndrCawRMD/LPs1dd9PHkFE4sZF/floTwT\nbC8S+CSlripqo+Jjn96OTU0jfPuyoauCW9deAx01jcUKiv/chzmj2D6ynFqP98c3\n88J8w0KDAgMBAAECggEAO7AxDb4kXqpxP80yv+igGiTp43JwbvLg2QtWCMqfzS5i\nwCq/oS+9iXPDbYC2Wz3kZELC47dLwmHeuljE+e2pgoY0lz1e/cfBO/BugJ4A+L+9\nQHemcNCS077q2BCx+yvkqb5snOy85IC15TO+tFznDRX/4qlDVmKPJ2LF5VHbtst2\n1ero+VNsJN5ZKm4F9GIm3AHX8iMd9RuCcg7g5SLAJ0TXOjdHLnbnGtBOwG7Bajds\nBO7VdSepnjCvnOs9Em3Wd6aYWE0KBjING5BDS0qEWTzNlzs9Rs7Skw0dmbgs5HT/\nz98cx76bvKQ5V5kTzczxtguvP80hq1h8wAkzmXbVGQKBgQDdPcwM/OBS6C90g2id\ns3h44zrnEPvLOXtO2fgWNLf0EkYKkwOAmg4O43+aL0MdtXx+tPo+W+elsr69Z8pk\n35mxaaIpsWjY+fkGQ6m8BnYYqVgHBKOTEQ7N2lnIjKVMWKi6GpokiXUgQ5eUdWUF\nrGTTks2IXbghnbxf1GE4raEMSQKBgQDNmUYHQOU7mJJqISymeT/p1ZaXzefn++jz\ntj1P5KAvCYrU0Jyrci3id+mZ4XEOg2g0X7Q3XE7SZZ3rwbFzm6eAgEXfrTFbu68m\nENCbvbNEagvn8XW4Ktl4K/+OoFJ0Molog5/aXiP08SviD0Sxun6+YfUq6PXPdibe\nDd4XPZogawKBgEWwxaoBrhfvk6M8EaQ7eGN8EH3g16/4d2MrPf6gtKFpcC68iInl\n/S+rcfJ7mMSu+nxfPcSO5rVHTNYU76g+1wcPo0lG3SQb+dmDTuAvmNvD3Dq5t10I\nLoWhlk6aHyehdeTJpGyF8CMtp33YTO4wk8IhqCSggPP13/S/zbAw4V4hAoGAAToD\n3/E0LOnZHcb65Dde+T8r+dXhp1GqbyHMNdjQV9d/u4tPE/rHaU172E4vBX4lNgLI\nKXhkg/7VNV3feCgalLqvMAlxfPGetuRsyjEUi7jyPz0Cjcm7qGriyHAObeELTtNS\nNdRP9Jsnvt6Gc2UAcpRVCR+Ar+8thi+g/pSAgecCgYArR2/7YNxTg/2gaVQBqKy8\n2vQz+8DyhwWU3AKofzXZD+36W6LwIJvuiuB4qDHZKZ8omvpcMbVjpJnA8mGS70YH\niIeOfXfKzGQOnR2w2DaUKgxtc929gKsyqhKM2MQL5pj/ZLbi2aLgiBfN4g98z6i1\nEkhoB1jwJOQ8sl+LWowobw==\n-----END PRIVATE KEY-----\n'
};

let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 60) return cachedToken;

  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: SA.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  })).toString('base64url');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(header + '.' + payload);
  const jwt = header + '.' + payload + '.' + signer.sign(SA.private_key, 'base64url');
  const postData = 'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=' + jwt;

  return new Promise((resolve, reject) => {
    const req = https.request('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          const j = JSON.parse(d);
          if (j.access_token) {
            cachedToken = j.access_token;
            tokenExpiresAt = now + 3500;
            resolve(cachedToken);
          } else {
            reject(new Error(d));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function doRequest(url, method = 'GET', headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: d ? JSON.parse(d) : null });
        } catch (e) {
          resolve({ status: res.statusCode, raw: d });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

const DEFAULT_MUDAS = [
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

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = await getAccessToken();

    // GET /api/mudas
    if (req.method === 'GET') {
      const isDashboard = req.query?.type === 'dashboard';

      // 1. Fetch mudas
      const url = `https://firestore.googleapis.com/v1/projects/${SA.project_id}/databases/(default)/documents/plantando_futuro_mudas`;
      const fsRes = await doRequest(url, 'GET', { Authorization: `Bearer ${token}` });

      let mudas = [];
      if (fsRes.status === 200 && fsRes.data?.documents) {
        mudas = fsRes.data.documents.map(doc => {
          const f = doc.fields || {};
          const obj = {};
          for (const [k, v] of Object.entries(f)) {
            if (v.integerValue !== undefined) obj[k] = parseInt(v.integerValue, 10);
            else if (v.stringValue !== undefined) obj[k] = v.stringValue;
            else if (v.booleanValue !== undefined) obj[k] = v.booleanValue;
          }
          return obj;
        });
      } else {
        // Fallback default
        mudas = DEFAULT_MUDAS;
      }

      // Keep fixed ordering
      const order = ['ipe-amarelo', 'ipe-roxo', 'cupuacu', 'acai', 'graviola'];
      mudas.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

      if (isDashboard) {
        // Fetch recent orders
        const ordersUrl = `https://firestore.googleapis.com/v1/projects/${SA.project_id}/databases/(default)/documents/plantando_futuro_pedidos?pageSize=100`;
        const ordersRes = await doRequest(ordersUrl, 'GET', { Authorization: `Bearer ${token}` });
        let orders = [];
        if (ordersRes.status === 200 && ordersRes.data?.documents) {
          orders = ordersRes.data.documents.map(doc => {
            const f = doc.fields || {};
            const obj = { id: doc.name.split('/').pop() };
            for (const [k, v] of Object.entries(f)) {
              if (v.stringValue !== undefined) obj[k] = v.stringValue;
              else if (v.integerValue !== undefined) obj[k] = parseInt(v.integerValue, 10);
            }
            return obj;
          });
          orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        }

        const totalEstoque = mudas.reduce((acc, m) => acc + (m.estoque || 0), 0);
        const totalSaidas = mudas.reduce((acc, m) => acc + (m.saidas || 0), 0);
        const totalInicial = mudas.reduce((acc, m) => acc + (m.totalInicial || 500), 0);

        return res.status(200).json({
          success: true,
          mudas,
          orders,
          summary: {
            totalEstoque,
            totalSaidas,
            totalInicial,
            percentualDistribuido: totalInicial > 0 ? ((totalSaidas / totalInicial) * 100).toFixed(1) : 0,
            disponiveisCount: mudas.filter(m => m.estoque > 0).length,
            esgotadasCount: mudas.filter(m => m.estoque <= 0).length
          }
        });
      }

      return res.status(200).json({ success: true, mudas });
    }

    // POST /api/mudas
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { action = 'resgatar', mudaId, colaboradorNome = 'Participante', signatureData = '' } = body;

      // ACTION: RESGATAR
      if (action === 'resgatar') {
        if (!mudaId) {
          return res.status(400).json({ success: false, error: 'Muda ID é obrigatório.' });
        }

        // Fetch current document to verify estoque
        const checkUrl = `https://firestore.googleapis.com/v1/projects/${SA.project_id}/databases/(default)/documents/plantando_futuro_mudas/${mudaId}`;
        const checkRes = await doRequest(checkUrl, 'GET', { Authorization: `Bearer ${token}` });

        if (checkRes.status !== 200 || !checkRes.data?.fields) {
          return res.status(404).json({ success: false, error: 'Muda não encontrada.' });
        }

        const currentEstoque = parseInt(checkRes.data.fields.estoque?.integerValue || '0', 10);
        if (currentEstoque <= 0) {
          return res.status(400).json({ success: false, error: 'Esta espécie está esgotada!', esgotado: true });
        }

        const mudaNome = checkRes.data.fields.nome?.stringValue || mudaId;
        const now = new Date();
        const rand = Math.floor(1000 + Math.random() * 9000);
        const voucherCode = `PF-${now.getFullYear().toString().slice(-2)}${String(now.getMonth()+1).padStart(2,'0')}-${rand}`;
        const orderId = `voucher_${Date.now()}_${rand}`;

        // Atomic commit: decrement estoque, increment saidas, create voucher order
        const commitUrl = `https://firestore.googleapis.com/v1/projects/${SA.project_id}/databases/(default)/documents:commit`;
        const commitBody = {
          writes: [
            {
              transform: {
                document: `projects/${SA.project_id}/databases/(default)/documents/plantando_futuro_mudas/${mudaId}`,
                fieldTransforms: [
                  { fieldPath: 'estoque', increment: { integerValue: '-1' } },
                  { fieldPath: 'saidas', increment: { integerValue: '1' } }
                ]
              }
            },
            {
              update: {
                name: `projects/${SA.project_id}/databases/(default)/documents/plantando_futuro_pedidos/${orderId}`,
                fields: {
                  mudaId: { stringValue: mudaId },
                  mudaNome: { stringValue: mudaNome },
                  voucherCode: { stringValue: voucherCode },
                  colaboradorNome: { stringValue: colaboradorNome },
                  signatureData: { stringValue: signatureData ? signatureData.slice(0, 1000) : '' },
                  createdAt: { stringValue: now.toISOString() }
                }
              }
            }
          ]
        };

        const commitRes = await doRequest(commitUrl, 'POST', {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, JSON.stringify(commitBody));

        if (commitRes.status !== 200) {
          return res.status(500).json({ success: false, error: 'Falha ao registrar resgate no Firestore.', details: commitRes.data });
        }

        const novoEstoque = currentEstoque - 1;

        return res.status(200).json({
          success: true,
          voucherCode,
          orderId,
          mudaId,
          mudaNome,
          novoEstoque,
          esgotado: novoEstoque <= 0,
          timestamp: now.toISOString()
        });
      }

      // ACTION: RESET (admin testing)
      if (action === 'reset') {
        const targetMudas = mudaId ? [DEFAULT_MUDAS.find(m => m.id === mudaId)].filter(Boolean) : DEFAULT_MUDAS;

        for (const m of targetMudas) {
          const patchUrl = `https://firestore.googleapis.com/v1/projects/${SA.project_id}/databases/(default)/documents/plantando_futuro_mudas/${m.id}?updateMask.fieldPaths=estoque&updateMask.fieldPaths=saidas&updateMask.fieldPaths=totalInicial`;
          await doRequest(patchUrl, 'PATCH', {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }, JSON.stringify({
            fields: {
              estoque: { integerValue: '500' },
              totalInicial: { integerValue: '500' },
              saidas: { integerValue: '0' }
            }
          }));
        }

        return res.status(200).json({ success: true, message: 'Estoque reinicializado com sucesso.' });
      }

      return res.status(400).json({ success: false, error: 'Ação não reconhecida.' });
    }

    return res.status(405).json({ error: 'Método não permitido.' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

