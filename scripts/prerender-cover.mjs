// Renders the coming-soon page to static HTML after `vite build --mode cover`,
// so phones see text and the card fan before the JavaScript has loaded.
import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'vite';

const vite = await createServer({ mode: 'cover', server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
try {
  const { renderToString } = await import('react-dom/server');
  const { createElement, StrictMode } = await import('react');
  const { default: Cover } = await vite.ssrLoadModule('/src/pages/Cover.jsx');
  const html = renderToString(createElement(StrictMode, null, createElement(Cover)));
  const file = 'dist/index.html';
  const page = readFileSync(file, 'utf8');
  if (!page.includes('<div id="root"></div>')) throw new Error('root element not found in dist/index.html');
  writeFileSync(file, page.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`));
  console.log(`prerendered cover page (${(html.length / 1024).toFixed(1)} kB of HTML)`);
} finally {
  await vite.close();
}
