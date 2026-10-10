import { useState } from 'react';
import { Squiggle } from '../components.jsx';
import { asset, EMAIL, PHONE } from '../data.js';

const occasions = ['Geburtstag', 'Baby', 'Weihnachten', 'Trauer', 'Hochzeit', 'Anderes'];

export default function About() {
  const [occasion, setOccasion] = useState('Geburtstag');
  const [sent, setSent] = useState(false);

  const submit = e => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get('name')}\nE-Mail: ${f.get('email')}\nAnlass: ${occasion}\n\n${f.get('message')}`;
    // shortcut: no form backend, opens the visitor's mail app; swap for a form service if visitors without a mail app matter.
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Wunschkarte: ' + occasion)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <section className="wrap about">
        <div className="atelier">
          <img src={asset('atelier.jpg')} alt="Mein Aquarellkasten im Atelier" />
          <img src={asset('image.jpeg')} alt="Foto von Laura" className="portrait" width="96" height="96" />
        </div>
        <div className="about-text">
          <div className="blot blot-rose" aria-hidden="true" />
          <h1>Hallo, ich bin Laura.</h1>
          <p>In meinem kleinen Atelier male ich Grusskarten mit Aquarell: Blumen, Weihnachtskugeln, kleine Momente, die Freude machen. Angefangen hat alles mit Karten für Familie und Freunde. Heute dürfen sie auch zu dir nach Hause.</p>
          <p>Jede Karte entsteht von Hand, ohne Druck und ohne Vorlage. Deshalb gleicht keine der anderen genau. Für mich ist das kein Fehler, sondern das Schönste daran.</p>
          <div className="script script-lg">Laura</div>
        </div>
      </section>

      <div className="center"><Squiggle /></div>

      <section className="wrap narrow section" id="wunsch">
        <h2>Du hast einen besonderen Wunsch?</h2>
        <p>Ein bestimmtes Motiv, eine Farbe, ein Anlass, den es hier noch nicht gibt: Schreib mir, und ich male deine Karte.</p>
        <form className="form" onSubmit={submit}>
          <label>Dein Name<input name="name" type="text" autoComplete="name" required /></label>
          <label>Deine E-Mail<input name="email" type="email" autoComplete="email" required /></label>
          <fieldset>
            <legend>Anlass</legend>
            <div className="chips wrapping">
              {occasions.map(o => (
                <button key={o} type="button" className="chip" aria-pressed={o === occasion} onClick={() => setOccasion(o)}>{o}</button>
              ))}
            </div>
          </fieldset>
          <label>Dein Wunsch<textarea name="message" rows="4" required placeholder="Motiv, Farben, Stimmung …" /></label>
          <button type="submit" className="btn btn-block">Wunsch senden</button>
          <div className="small center" role="status">
            {sent ? 'Danke! Dein E-Mail-Programm hat sich geöffnet, schick die Nachricht einfach ab.' : 'Ich melde mich innerhalb von zwei Tagen bei dir.'}
          </div>
        </form>

        <div className="panel contact">
          <div className="panel-title">Oder schreib mir direkt</div>
          <a href={`mailto:${EMAIL}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F4A6D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 6.5h17v11.2h-17z" /><path d="M4 7c3 2.5 5.5 4.6 8 6.3 2.6-1.8 5.2-3.9 8-6.1" /></svg>
            {EMAIL}
          </a>
          <a href={`tel:${PHONE.replace(/ /g, '')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F4A6D" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4.5c1.5-.6 2.4.4 3.3 2.2.8 1.6.3 2.3-.9 3.2 1 2.5 3 4.5 5.6 5.7.9-1.1 1.7-1.7 3.3-.8 1.8 1 2.7 1.8 2.1 3.2-.8 1.6-3 1.8-5 .9-5-2.2-8.7-6-10.2-10.3-.6-2 .2-3.5 1.8-4.1z" /></svg>
            {PHONE}
          </a>
        </div>
      </section>
    </>
  );
}
