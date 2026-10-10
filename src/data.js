// Prices in cents to keep totals exact.
export const cards = [
  { id: 1, name: 'Happy Birthday Beautiful', cat: 'Geburtstag', price: 650 },
  { id: 2, name: 'Blütenkranz zum Sechzigsten', cat: 'Geburtstag', price: 700 },
  { id: 3, name: 'Anemonen in Rot', cat: 'Geburtstag', price: 650 },
  { id: 4, name: 'Sonnenblumen', cat: 'Geburtstag', price: 650 },
  { id: 5, name: 'Ein Stück Torte', cat: 'Geburtstag', price: 650 },
  { id: 6, name: 'Blaue Kreise', cat: 'Geburtstag', price: 650 },
  { id: 7, name: 'Rosa Streifen', cat: 'Geburtstag', price: 650 },
  { id: 8, name: 'Willkommen kleines Wunder', cat: 'Willkommen Baby', price: 700 },
  { id: 9, name: 'Schön, dass du da bist · Rosa', cat: 'Willkommen Baby', price: 700 },
  { id: 10, name: 'Schön, dass du da bist · Blau', cat: 'Willkommen Baby', price: 700 },
  {
    id: 11, name: 'Weihnachtskugeln in Bordeaux', cat: 'Weihnachten', price: 650,
    desc: 'Zwei Christbaumkugeln in tiefem Beerenrot und Violett, mit feinen Tuschelinien aufgehängt und ein paar Farbspritzern rundherum. Ruhig, festlich und ein bisschen verspielt. Innen frei für deine Worte.',
  },
  { id: 12, name: 'Winterkugel', cat: 'Weihnachten', price: 650 },
  { id: 13, name: 'Blaue Kugeln mit Mütze', cat: 'Weihnachten', price: 650 },
  { id: 14, name: 'Lichterkleid', cat: 'Weihnachten', price: 700 },
  { id: 15, name: 'Goldene Kugeln', cat: 'Weihnachten', price: 650 },
  { id: 16, name: 'Der Weihnachtsmann und die Tanne', cat: 'Weihnachten', price: 650 },
  { id: 17, name: 'Zwei rote Kugeln', cat: 'Weihnachten', price: 650 },
  { id: 18, name: 'Das Sichtbare ist vergangen', cat: 'Trauer & Anteilnahme', price: 650 },
  { id: 19, name: 'Aufrichtige Anteilnahme', cat: 'Trauer & Anteilnahme', price: 650 },
  { id: 20, name: 'Dem Herzen ewig nah', cat: 'Trauer & Anteilnahme', price: 650 },
];

export const categories = [
  { name: 'Geburtstag', cover: 1, pos: '40%' },
  { name: 'Willkommen Baby', cover: 8, pos: '35%' },
  { name: 'Weihnachten', cover: 11, pos: '45%' },
  { name: 'Trauer & Anteilnahme', cover: 19, pos: '55%' },
];

export const DEFAULT_DESC = 'Mit Aquarell von Hand gemalt, mit viel Wasser und ein paar Farbspritzern. Innen frei für deine Worte.';
export const EMAIL = 'kontakt@example.com'; // TODO: echte Adresse eintragen
export const PHONE = '+00 000 000 00 00'; // TODO: echte Nummer eintragen
export const FREE_SHIPPING_FROM = 2500;
export const SHIPPING = 250;

export const byId = id => cards.find(c => c.id === Number(id));
// BASE_URL is '/' locally and '/<repo>/' on GitHub Pages.
export const asset = path => import.meta.env.BASE_URL + path;
export const img = id => asset(`cards/card-${id}.jpg`);
export const eur = cents => (cents / 100).toFixed(2).replace('.', ',') + ' €';
export const shippingFor = subtotal => (subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING);
