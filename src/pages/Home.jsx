import { Link } from 'react-router-dom';
import { CardTile, Heart, Stroke } from '../components.jsx';
import { asset, byId, categories, img } from '../data.js';

const favourites = [3, 14, 20, 16].map(byId);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="blot blot-rose" aria-hidden="true" />
        <div className="blot blot-sage" aria-hidden="true" />
        <div className="hero-img">
          <div className="hero-card">
            <img src={img(1)} alt="Handgemalte Aquarellkarte mit Mohnblüten" fetchpriority="high" />
            <div className="signature">Laura <Heart filled size={14} /></div>
          </div>
        </div>
        <div className="hero-text">
          <h1>Handgemalte Grusskarten aus meinem Atelier</h1>
          <p>Jede Karte male ich von Hand, mit Pinsel, Wasser und viel Freude. Schön, dass du hier bist.</p>
          <Link to="/karten" className="btn">
            Karten entdecken
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 6.2c5-.5 10-.3 15-.2" /><path d="M12 1.5 16.5 6 12 10.5" /></svg>
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <div className="script">mit Liebe gemalt</div>
            <h2>Für jeden Anlass</h2>
          </div>
          <Link to="/karten" className="text-link">Alle Karten</Link>
        </div>
        <div className="cat-grid">
          {categories.map(c => (
            <Link key={c.name} to={`/karten?anlass=${encodeURIComponent(c.name)}`} className="cat">
              <img src={img(c.cover)} alt="" loading="lazy" style={{ objectPosition: `center ${c.pos}` }} />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap">
        <div className="unikat">
          <div className="blot blot-gold" aria-hidden="true" />
          <div className="script script-lg">Jede Karte ein Unikat</div>
          <p>Jede Karte ist handgemalt und ein Unikat. Keine gleicht der anderen exakt.</p>
          <div className="meta"><Stroke />Format A5, inkl. Couvert<Stroke /></div>
        </div>
      </section>

      <section className="wrap section">
        <div className="script">besonders gern verschenkt</div>
        <h2 className="with-icon">Lieblingskarten <Heart /></h2>
        <div className="row-scroll">
          {favourites.map(c => <CardTile key={c.id} card={c} />)}
        </div>
      </section>

      <section className="wrap about-teaser">
        <img src={asset('image.jpeg')} alt="Foto von Laura" width="108" height="108" />
        <div>
          <div className="teaser-title">Hallo, ich bin Laura.</div>
          <p>Ich male jede Karte in meinem kleinen Atelier, eine nach der anderen.</p>
          <Link to="/ueber-mich" className="text-link">Mehr über mich</Link>
        </div>
      </section>
    </>
  );
}
