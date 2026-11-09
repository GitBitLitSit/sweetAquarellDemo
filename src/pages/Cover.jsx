import { useState } from 'react';
import { Heart } from '../components.jsx';
import { asset } from '../data.js';

// Only these photos appear on the cover page; files live in public/cover/.
const photos = [
  { id: 1, name: 'Happy Birthday mit Blüten' },
  { id: 8, name: 'Jemand fehlt' },
  { id: 3, name: 'Alles Gute zum Sechzigsten' },
  { id: 9, name: 'Goldene Weihnachtskugeln' },
  { id: 4, name: 'Winterkugel' },
  { id: 5, name: 'Weihnachtskugeln in Bordeaux' },
  { id: 10, name: 'Kugeln in Bordeaux und Violett' },
  { id: 6, name: 'Blaue Kugeln mit Mütze' },
  { id: 7, name: 'Hirsch zum Dreissigsten' },
];
const photo = id => asset(`cover/${id}.jpg`);

// "jemand fehlt" in the middle, the Christmas cards beside it.
const fan = [1, 5, 8, 9, 7];

// The offer as a note circled by hand: two loose pencil loops, the number in script, a small painted heart.
function Offer() {
  return (
    <div className="offer" aria-hidden="true">
      <svg className="offer-loops" viewBox="0 0 300 180" fill="none" strokeLinecap="round">
        <ellipse cx="150" cy="90" rx="128" ry="68" fill="#FAF6F0" opacity=".88" />
        <path d="M150 14C228 10 290 42 288 92 286 140 214 168 142 166 70 164 12 138 14 90 16 46 74 18 160 16 196 15 226 22 248 34" stroke="#B9706A" strokeWidth="2" opacity=".85" />
        <path d="M138 22C214 16 280 48 280 94 280 136 210 160 140 158 72 156 22 130 24 88 26 52 80 26 150 24" stroke="#8E2A3B" strokeWidth="1.2" opacity=".55" />
      </svg>
      <span className="offer-num">-10%</span>
      <span className="offer-sub">auf deine erste Bestellung</span>
      <svg className="offer-heart" viewBox="0 0 40 36">
        <path d="M20 34C8 25 2 18 3 10 4 4 10 1 15 3 18 4 19 6 20 8 21 6 23 4 26 3 31 1 37 4 37 11 37 18 31 25 20 34Z" fill="#B44A5C" opacity=".85" />
        <path d="M20 34C8 25 2 18 3 10 4 4 10 1 15 3 18 4 19 6 20 8" fill="none" stroke="#8E2A3B" strokeWidth="1.2" opacity=".5" />
      </svg>
    </div>
  );
}

// Brevo: Kontakte → Formulare → Teilen → "action"-URL aus dem HTML-Code.
const BREVO_URL = 'https://9ce1b378.sibforms.com/serve/MUIFAPdWeGwf3CLCvwCVGB6LUhUnVPDqJN_mNO6mAFdKcC1SV-AvsVzJqDcrrcKBkNYxhhZ5aPbLC8nualp3GmkhTD7qCzPRd-oAgWWgRXAkRqTYjKS0Q8pEfcCG7jwOdypc1bs7_7Bm17utcevdlS50bW-IfAaXEGvjC5WdG8xgNhzmPZgkfzprox_NvxerLDNFRlRx_-9qau1uGQ==';

function Signup() {
  const [state, setState] = useState('idle'); // idle | sending | sent | error

  async function submit(e) {
    e.preventDefault();
    setState('sending');
    try {
      // shortcut: no-cors hides Brevo's answer, so a rejected address still shows "Danke"; Brevo's DOI mail is the real check.
      await fetch(BREVO_URL, { method: 'POST', mode: 'no-cors', body: new FormData(e.target) });
      setState('sent');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') return (
    <div className="signup-done" role="status">
      <div className="script script-lg">Danke dir! <Heart filled /></div>
      <p>Bitte bestätige noch kurz deine E-Mail-Adresse. Zum Shop-Start bekommst du deinen 10 %-Code.</p>
    </div>
  );

  return (
    <form className="signup" onSubmit={submit}>
      {/* Brevo's honeypot: bots fill it, Brevo drops those sign-ups. */}
      <input type="text" name="email_address_check" defaultValue="" hidden tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="locale" value="de" />
      {state === 'error' && <p className="consent" role="alert">Das hat leider nicht geklappt. Bitte versuch es nochmals.</p>}
      <div className="signup-row">
        <label className="sr-only" htmlFor="email">E-Mail-Adresse</label>
        <input id="email" name="EMAIL" type="email" placeholder="deine@email.com" autoComplete="email" required />
        <button className="btn" type="submit" disabled={state === 'sending'}>10 % sichern</button>
      </div>
      <label className="consent">
        <input type="checkbox" required />
        <span>Ja, ich möchte den Newsletter von sweetaquarell erhalten. Abmeldung jederzeit. Mehr in der <a href={asset('datenschutz')}>Datenschutzerklärung</a>.</span>
      </label>
    </form>
  );
}

export default function Cover() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <header className="cover-top">
        <div className="brand">
          <img className="logo" src={asset('logo.svg')} width="44" height="39" alt="" />
          <span className="brand-text">
            <span className="brand-name">sweetaquarell</span>
            <span className="brand-sub">Aquarellkarten</span>
          </span>
        </div>
      </header>

      <main>
        <section className="cover-hero">
          <div className="blot blot-rose" aria-hidden="true" />
          <div className="fan-wrap">
            <div className="fan" aria-hidden="true">
              {fan.map((id, i) => (
                <img key={id} src={photo(id)} alt="" style={{ '--i': i - 2, '--d': Math.abs(i - 2), zIndex: 5 - Math.abs(i - 2) }} />
              ))}
            </div>
            <Offer />
            <div className="blot blot-rose blot-rose-low" aria-hidden="true" />
          </div>
          <div className="cover-text">
            <div className="script">handgemalt von Laura</div>
            <h1>Für jeden Moment <span className="h1-accent">die richtige Karte.</span></h1>
            <p>Geburtstag, Weihnachten, Trauer oder dein eigenes Design: jede Karte von Hand mit Aquarell gemalt. Zum Shop-Start gibt es <strong className="offer-line">10 % auf deine erste Bestellung.</strong></p>
            <Signup />
          </div>
        </section>

        <section className="cover-strip" aria-label="Eine Auswahl meiner Karten">
          <div className="script">jede Karte ein Unikat</div>
          <div className="marquee">
            <div className="marquee-track">
              {/* 4 copies: 7 photos alone would leave a gap on wide screens; -50% scroll stays seamless. */}
              {[...photos, ...photos, ...photos, ...photos].map((c, i) => (
                <img key={i} src={photo(c.id)} alt={i < photos.length ? c.name : ''} aria-hidden={i >= photos.length} loading="lazy" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="cover-legal">
        <nav aria-label="Rechtliches">
          <a href={asset('datenschutz')}>Datenschutz</a>
          <a href={asset('impressum')}>Impressum</a>
        </nav>
      </footer>
    </>
  );
}
