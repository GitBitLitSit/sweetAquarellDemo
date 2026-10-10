# sweetAquarellDemo

Shop site for sweetaquarell, Laura's hand-painted watercolour cards.

```sh
npm install
npm run dev        # http://localhost:5173
npm test           # Playwright smoke tests (desktop + phone); first run: npx playwright install chromium
npm run build      # static site in dist/
```

Deploys to GitHub Pages on every push to `master` (`.github/workflows/deploy.yml`; enable Pages with source "GitHub Actions" in the repo settings).

Pages: `/` start, `/karten` (filter via `?anlass=`), `/karte/:id`, `/warenkorb`, `/ueber-mich`.

Orders and wish requests open an e-mail draft (no backend yet). Cart is in memory only.
