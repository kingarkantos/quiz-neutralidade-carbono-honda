import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/mudas')) {
          try {
            const { default: handler } = await import('./api/mudas.js');
            const urlObj = new URL(req.url, 'http://localhost:3000');
            req.query = Object.fromEntries(urlObj.searchParams.entries());

            const resHelper = {
              setHeader(k, v) { res.setHeader(k, v); },
              status(code) { res.statusCode = code; return this; },
              json(data) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
              end(data) { res.end(data); }
            };

            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  req.body = body ? JSON.parse(body) : {};
                } catch {
                  req.body = body;
                }
                await handler(req, resHelper);
              });
              return;
            }

            await handler(req, resHelper);
            return;
          } catch (e) {
            console.error('Dev API Error:', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiDevPlugin()],
  server: {
    port: 3000,
    host: true
  }
});
