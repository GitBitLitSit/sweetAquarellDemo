import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Qty, Squiggle } from '../components.jsx';
import { byId, EMAIL, eur, img } from '../data.js';
import { useCart } from '../cart.jsx';

export default function Cart() {
  const { items, change, remove, subtotal, shipping, total } = useCart();
  const [wish, setWish] = useState('');

  if (items.length === 0) {
    return (
      <section className="wrap narrow page-head">
        <h1>Dein Warenkorb</h1>
        <p>Noch ist dein Warenkorb leer. Such dir in Ruhe eine Karte aus.</p>
        <Link to="/karten" className="btn">Karten entdecken</Link>
      </section>
    );
  }

  // shortcut: no checkout backend yet, the order is sent as an e-mail draft; replace with a real checkout (address + payment) before going live.
  const order = [
    ...items.map(it => `${it.qty} × ${byId(it.id).name} (${eur(byId(it.id).price * it.qty)})`),
    `Versand: ${shipping ? eur(shipping) : 'gratis'}`,
    `Gesamt: ${eur(total)}`,
    wish && `\nPersönlicher Wunsch: ${wish}`,
  ].filter(Boolean).join('\n');
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Bestellung Aquarellkarten')}&body=${encodeURIComponent(order + '\n\nMeine Adresse:\n')}`;

  return (
    <section className="wrap narrow">
      <h1 className="cart-title">Dein Warenkorb</h1>

      <ul className="cart-items">
        {items.map(it => {
          const c = byId(it.id);
          return (
            <li key={it.id} className="cart-item">
              <img src={img(c.id)} alt="" />
              <div>
                <Link to={`/karte/${c.id}`} className="cart-name">{c.name}</Link>
                <div className="small">A5 · inkl. Couvert</div>
                <div className="cart-line">
                  <Qty small value={it.qty} label={`Menge ${c.name}`} onDec={() => change(c.id, -1)} onInc={() => change(c.id, 1)} />
                  <span data-testid="line-total">{eur(c.price * it.qty)}</span>
                </div>
                <button type="button" className="link-btn" onClick={() => remove(c.id)}>Entfernen</button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="panel">
        <div className="panel-head">
          <label htmlFor="wish" className="panel-title">Persönlicher Wunsch</label>
          <span className="small">optional</span>
        </div>
        <p id="wish-help">Soll ich einen Namen oder ein paar Worte in die Karte schreiben? Oder hast du einen Wunsch zur Farbe?</p>
        <textarea id="wish" aria-describedby="wish-help" rows="3" value={wish} onChange={e => setWish(e.target.value)}
          placeholder="z. B. Bitte „Für Anna“ innen auf die Karte schreiben" />
      </div>

      <dl className="summary">
        <div><dt>Zwischensumme</dt><dd data-testid="subtotal">{eur(subtotal)}</dd></div>
        <div><dt>Versand</dt><dd data-testid="shipping">{shipping ? eur(shipping) : 'gratis'}</dd></div>
        <Squiggle />
        <div className="total"><dt>Gesamt</dt><dd data-testid="total">{eur(total)}</dd></div>
        <div className="small right">inkl. MwSt.</div>
      </dl>

      <a href={mailto} className="btn btn-block">Bestellung per E-Mail</a>
      <div className="small center">Dein E-Mail-Programm öffnet sich mit deiner Bestellung. Ergänze nur noch deine Adresse.</div>
      <div className="center"><Link to="/karten" className="text-link">Weiter stöbern</Link></div>
    </section>
  );
}
