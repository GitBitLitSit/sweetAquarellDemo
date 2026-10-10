import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CardTile, Qty, Stroke } from '../components.jsx';
import { cards, byId, DEFAULT_DESC, eur, img } from '../data.js';
import { useCart } from '../cart.jsx';

const captions = ['Vorderseite', 'Detail der Pinselstriche'];

export default function Card() {
  const { id } = useParams();
  const card = byId(id);
  if (!card) {
    return (
      <section className="wrap page-head">
        <h1>Karte nicht gefunden</h1>
        <p>Diese Karte gibt es leider nicht (mehr).</p>
        <Link to="/karten" className="btn">Alle Karten</Link>
      </section>
    );
  }
  // key resets quantity and slide when navigating between cards
  return <Detail key={card.id} card={card} />;
}

function Detail({ card }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [slide, setSlide] = useState(0);
  const [added, setAdded] = useState(false);
  const related = cards.filter(c => c.cat === card.cat && c.id !== card.id).slice(0, 3);

  const changeQty = d => { setQty(q => Math.max(1, q + d)); setAdded(false); };
  const onScroll = e => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth));

  return (
    <>
      <div className="wrap back-row">
        <Link to={`/karten?anlass=${encodeURIComponent(card.cat)}`} className="back">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 5.5 8.2 12l6.3 6.5" /></svg>
          {card.cat}
        </Link>
      </div>

      <section className="wrap detail">
        <div className="gallery">
          <div className="slides" onScroll={onScroll} tabIndex={0} aria-label="Bildergalerie">
            <div className="slide"><img src={img(card.id)} alt={`${card.name}, Vorderseite`} /></div>
            <div className="slide slide-zoom"><img src={img(card.id)} alt={`${card.name}, Detail der Pinselstriche`} /></div>
          </div>
          <div className="dots" aria-hidden="true">
            {captions.map((_, i) => <span key={i} className={i === slide ? 'on' : ''} />)}
          </div>
          <div className="caption">{captions[slide]}</div>
        </div>

        <div className="info">
          <div className="blot blot-wine" aria-hidden="true" />
          <div className="title-row">
            <h1>{card.name}</h1>
            <div className="price">{eur(card.price)}</div>
          </div>
          <p className="desc">{card.desc ?? DEFAULT_DESC}</p>

          <ul className="facts">
            <li><Stroke />Handgemalt mit Aquarell, jedes Exemplar ist leicht anders</li>
            <li><Stroke />Format A5, inkl. Couvert</li>
            <li><Stroke />Aquarellpapier 300 g, innen unbeschrieben</li>
          </ul>

          <div className="qty-row">
            <span id="qty-label">Menge</span>
            <Qty value={qty} label="Menge" onDec={() => changeQty(-1)} onInc={() => changeQty(1)} />
          </div>

          <button type="button" className="btn btn-block" onClick={() => { add(card.id, qty); setAdded(true); }}>
            {added ? 'Im Warenkorb ✓' : `In den Warenkorb · ${eur(card.price * qty)}`}
          </button>
          {added && <div className="small center"><Link to="/warenkorb" className="text-link">Zum Warenkorb</Link></div>}
          <div className="small center">Versand in 2 bis 4 Tagen · ab 25 € versandkostenfrei</div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="wrap section">
          <h2>Passt dazu</h2>
          <div className="row-scroll">
            {related.map(c => <CardTile key={c.id} card={c} small />)}
          </div>
        </section>
      )}
    </>
  );
}
