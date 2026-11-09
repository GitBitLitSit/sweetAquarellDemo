import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `npm run cover-sheet` serves the coming-soon page at / instead of the shop (dev server only).
const coverAtRoot = {
  name: 'cover-at-root',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/' || req.url === '/index.html') req.url = '/cover.html';
      next();
    });
  },
};

// BASE_PATH is set by the GitHub Pages workflow, e.g. '/sweetAquarellDemo/'.
export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), mode === 'cover' && coverAtRoot],
  // `npm run build:cover` ships only the coming-soon page plus its legal pages.
  build: mode === 'cover' ? { rollupOptions: { input: ['cover.html', 'danke.html', 'datenschutz.html', 'impressum.html'] } } : {},
}));
