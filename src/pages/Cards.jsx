import { Link, useSearchParams } from 'react-router-dom';
import { CardTile, Squiggle } from '../components.jsx';
import { cards, categories } from '../data.js';

const filters = ['Alle', ...categories.map(c => c.name)];

export default function Cards({ notFound }) {
  const [params, setParams] = useSearchParams();
  const active = filters.includes(params.get('anlass')) ? params.get('anlass') : 'Alle';
  const list = cards.filter(c => active === 'Alle' || c.cat === active);

  return (
    <section className="wrap">
      <div className="page-head">
        {notFound
          ? <p className="notice" role="alert">Diese Seite gibt es leider nicht. Hier sind alle Karten.</p>
          : <div className="script">zum Aussuchen &amp; Verschenken</div>}
        <h1>Meine Karten</h1>
        <Squiggle w={90} color="#D9A5A0" />
        <p className="caps" data-testid="result-label">{list.length} {list.length === 1 ? 'Karte' : 'Karten'} · handgemalt · A5</p>
      </div>

      <div className="chips" role="group" aria-label="Nach Anlass filtern">
        {filters.map(f => (
          <button key={f} type="button" className="chip" aria-pressed={f === active}
            onClick={() => setParams(f === 'Alle' ? {} : { anlass: f }, { replace: true })}>
            {f}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {list.map(c => <CardTile key={c.id} card={c} />)}
      </div>

      <div className="cta-note">
        <Squiggle />
        <p>Du suchst ein bestimmtes Motiv?</p>
        <Link to="/ueber-mich#wunsch" className="text-link">Wunschkarte anfragen</Link>
      </div>
    </section>
  );
}
