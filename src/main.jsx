import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './cart.jsx';
import { Layout } from './components.jsx';
import Home from './pages/Home.jsx';
import Cards from './pages/Cards.jsx';
import Card from './pages/Card.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';
import Legal from './pages/Legal.jsx';
import './fonts.css';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="karten" element={<Cards />} />
            <Route path="karte/:id" element={<Card />} />
            <Route path="warenkorb" element={<Cart />} />
            <Route path="ueber-mich" element={<About />} />
            <Route path="datenschutz" element={<Legal title="Datenschutz" />} />
            <Route path="impressum" element={<Legal title="Impressum" />} />
            <Route path="*" element={<Cards notFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
