import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useCart } from './cart.jsx';
import { EMAIL, PHONE, eur, img } from './data.js';

// Brush-stroke ornaments taken from the design file.
export const Squiggle = ({ w = 120, color = '#B9A89C' }) => (
  <svg className="squiggle" width={w} height="8" viewBox="0 0 120 8" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" aria-hidden="true">
    <path d="M1 5c20-3 40 3 60-1s40-2 58 1" />
  </svg>
);

export const Heart = ({ filled, size = 18 }) => (
  <svg width={size} height={size * 0.9} viewBox="0 0 18 16" fill={filled ? '#D9A5A0' : 'none'} stroke="#D9A5A0" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 14.5C5 11.5 1.5 8.8 1.5 5.4 1.5 3.2 3.2 1.6 5.2 1.6c1.6 0 2.9 1 3.8 2.3.9-1.3 2.2-2.3 3.8-2.3 2 0 3.7 1.6 3.7 3.8 0 3.4-3.5 6.1-7.5 9.1z" />
  </svg>
);

// Logo: a brush painting the outline of a heart; the stroke is still open where the brush is.
export const Logo = ({ size = 40 }) => (
  <svg className="logo" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <path className="logo-wash" d="M18 34C10 28 4 23 4 16.5 4 12.5 7 10 10.5 10c3 0 6 2 7.5 4.5C19.5 12 22.5 10 25.5 10c3.5 0 6.5 2.5 6.5 6.5 0 6.5-6 11.5-14 17.5z" fill="#D9A5A0" fillOpacity=".35" />
    <path className="logo-line" pathLength="100" d="M18 34C10 28 4 23 4 16.5 4 12.5 7 10 10.5 10c3 0 6 2 7.5 4.5C19.5 12 22.5 10 25.5 10c3.5 0 6.5 2.5 6.5 6.5 0 2-.8 3.8-2 5.4"
      fill="none" stroke="#8E2A3B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <g className="logo-brush">
      <path d="M34.2 18.3 39 13.5" stroke="#4A3F3A" strokeWidth="2" strokeLinecap="round" />
      <path d="M32.4 20.1 34.2 18.3" stroke="#B9A89C" strokeWidth="2.8" />
      <path d="M29.2 23.4c.9-1.4 1.6-2.6 2.2-4.2l2 1.8c-1.3.9-2.6 1.7-4.2 2.4z" fill="#4A3F3A" />
    </g>
  </svg>
);

export const Stroke = () => (
  <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="#9BAE93" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true" className="stroke">
    <path d="M1 6c4-2 8 2 12-1 2.5-1.5 5-1 8 0" />
  </svg>
);

export function CardTile({ card, small }) {
  return (
    <Link to={`/karte/${card.id}`} className={small ? 'tile tile-small' : 'tile'}>
      <img src={img(card.id)} alt={card.name} loading="lazy" />
      <div className="tile-name">{card.name}</div>
      <div className="tile-price">{eur(card.price)}</div>
    </Link>
  );
}

export function Qty({ value, onDec, onInc, label, small }) {
  return (
    <div className={small ? 'qty qty-small' : 'qty'} role="group" aria-label={label}>
      <button type="button" onClick={onDec} disabled={value <= 1} aria-label="Weniger">−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={onInc} aria-label="Mehr">+</button>
    </div>
  );
}

const nav = [
  ['/', 'Start'],
  ['/karten', 'Karten'],
  ['/ueber-mich', 'Über mich'],
];

function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <button type="button" className="icon-btn menu-btn" aria-label="Menü" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(o => !o)}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M4 8.5c5-.6 10-.4 16-.2" /><path d="M4 15.5c4 .5 9 .3 13-.2" /></svg>
      </button>
      <Link to="/" className="brand">
        <Logo size={34} />
        <span className="brand-text">
          <span className="brand-name">sweetaquarell</span>
          <span className="brand-sub">Aquarellkarten</span>
        </span>
      </Link>
      <nav id="nav" className={open ? 'nav open' : 'nav'} aria-label="Hauptnavigation">
        {nav.map(([to, label]) => <NavLink key={to} to={to} end>{label}</NavLink>)}
      </nav>
      <Link to="/warenkorb" className="icon-btn cart-btn" aria-label={`Warenkorb, ${count} Karten`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 8.5h13l-.8 11.2a1 1 0 0 1-1 .8H7.3a1 1 0 0 1-1-.8z" /><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" /></svg>
        {count > 0 && <span key={count} className="badge" data-testid="cart-count">{count}</span>}
      </Link>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <Link to="/" className="footer-brand">
          <Logo size={56} />
          <span className="brand-name">sweetaquarell</span>
        </Link>
        <div>
          <div className="label">Kontakt</div>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
          <a href={`tel:${PHONE.replace(/ /g, '')}`}>{PHONE}</a>
        </div>
        <div>
          <div className="label">Versand</div>
          Versand in 2 bis 4 Tagen<br />2,50 € · ab 25 € gratis
        </div>
      </div>
      <nav className="footer-legal" aria-label="Rechtliches">
        <Link to="/datenschutz">Datenschutz</Link>
        <Link to="/impressum">Impressum</Link>
      </nav>
    </footer>
  );
}

export function Layout() {
  const { pathname, hash } = useLocation();
  // Child effects run first, so the hash target must be scrolled to here, not in the page.
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    target ? target.scrollIntoView() : window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
