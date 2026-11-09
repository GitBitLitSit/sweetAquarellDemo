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

// Coming-soon build: put the (small) CSS straight into each HTML page, so the first paint
// does not wait for a separate stylesheet request.
const inlineCss = {
  name: 'inline-css',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const css = Object.values(bundle).filter(f => f.fileName.endsWith('.css'));
    for (const page of Object.values(bundle).filter(f => f.fileName.endsWith('.html'))) {
      for (const sheet of css) {
        const tag = new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${sheet.fileName}"[^>]*>`);
        if (tag.test(page.source)) page.source = page.source.replace(tag, () => `<style>${sheet.source}</style>`);
      }
    }
    css.forEach(sheet => delete bundle[sheet.fileName]);
  },
};

// BASE_PATH is set by the GitHub Pages workflow, e.g. '/sweetAquarellDemo/'.
export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), mode === 'cover' && coverAtRoot, mode === 'cover' && inlineCss],
  // `npm run build:cover` ships only the coming-soon page plus its legal pages.
  build: mode === 'cover' ? { rollupOptions: { input: ['cover.html', 'danke.html', '404.html', 'datenschutz.html', 'impressum.html'] } } : {},
}));
