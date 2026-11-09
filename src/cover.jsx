import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Cover from './pages/Cover.jsx';
import './fonts.css';
import './styles.css';
import './cover.css';

const root = document.getElementById('root');
const app = <StrictMode><Cover /></StrictMode>;
// The production build ships the page pre-rendered (scripts/prerender-cover.mjs); the dev server does not.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
