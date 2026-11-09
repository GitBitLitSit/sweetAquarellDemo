# sweetAquarellDemo

Shop site for sweetaquarell, Laura's hand-painted watercolour cards.

```sh
npm install
npm run dev        # http://localhost:5173
npm test           # Playwright smoke tests (desktop + phone); first run: npx playwright install chromium
npm run build      # static site in dist/
```

Live on sweetaquarell.ch via Cloudflare Pages: every push to `master` builds the coming-soon page (`npm run build:cover`, output `dist`).

Coming-soon page: `npm run cover-sheet` (dev), `npm run build:cover` (build). Newsletter sign-ups go to Brevo (form URL in `src/pages/Cover.jsx`).

Pages: `/` start, `/karten` (filter via `?anlass=`), `/karte/:id`, `/warenkorb`, `/ueber-mich`.

Orders and wish requests open an e-mail draft (no backend yet). Cart is in memory only.
