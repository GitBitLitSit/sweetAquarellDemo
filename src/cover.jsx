import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Cover from './pages/Cover.jsx';
import './fonts.css';
import './styles.css';
import './cover.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cover />
  </StrictMode>,
);
