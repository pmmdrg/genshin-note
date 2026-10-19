import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// Vite dev plugin to simulate Vercel Serverless Functions locally during `npm run dev`
function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev-middleware',
    configureServer(server) {
      // Load .env.local if available in local development
      const envPath = path.resolve(process.cwd(), '.env.local');
      if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
        try {
          process.loadEnvFile(envPath);
        } catch {
          // ignore
        }
      }

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const endpoint = url.pathname.replace('/api/', '').split('?')[0];

        try {
          // Read request body if POST
          let body = {};
          if (req.method === 'POST') {
            const buffers: Buffer[] = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const dataStr = Buffer.concat(buffers).toString();
            if (dataStr) {
              try {
                body = JSON.parse(dataStr);
              } catch {
                // ignore
              }
            }
          }

          const handlerPath = path.resolve(process.cwd(), `api/${endpoint}.ts`);
          if (fs.existsSync(handlerPath)) {
            // Load and execute TypeScript serverless handler via Vite SSR pipeline
            const mod = await server.ssrLoadModule(`/api/${endpoint}.ts`);
            const handler = mod.default;

            const vercelReq = Object.assign(req, {
              query: Object.fromEntries(url.searchParams),
              body,
            });

            const vercelRes = Object.assign(res, {
              status(code: number) {
                res.statusCode = code;
                return vercelRes;
              },
              json(jsonData: any) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(jsonData));
                return vercelRes;
              },
            });

            await handler(vercelReq, vercelRes);
            return;
          }
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ retcode: -1, message: err.message || 'Lỗi server cục bộ' }));
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vercelApiDevPlugin(),
  ],
});
