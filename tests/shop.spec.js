import { test, expect } from '@playwright/test';

let errors;
test.beforeEach(async ({ page }) => {
  errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
});
test.afterEach(() => expect(errors, 'browser console errors').toEqual([]));

test('home renders with all images loaded', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Handgemalte Grusskarten aus meinem Atelier');
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
  }
});

test('navigation reaches every page', async ({ page, isMobile }) => {
  await page.goto('./');
  const go = async name => {
    if (isMobile) await page.getByRole('button', { name: 'Menü' }).click();
    await page.getByRole('navigation').getByRole('link', { name }).click();
  };
  await go('Karten');
  await expect(page.getByRole('heading', { name: 'Meine Karten' })).toBeVisible();
  await go('Über mich');
  await expect(page.getByRole('heading', { name: 'Hallo, ich bin Laura.' })).toBeVisible();
  await page.getByRole('link', { name: /Warenkorb/ }).click();
  await expect(page.getByText('Noch ist dein Warenkorb leer')).toBeVisible();
});

test('category filter narrows the list and survives reload', async ({ page }) => {
  await page.goto('karten');
  await expect(page.getByTestId('result-label')).toContainText('20 Karten');
  await page.getByRole('button', { name: 'Weihnachten' }).click();
  await expect(page.getByTestId('result-label')).toContainText('7 Karten');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Weihnachten' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.card-grid .tile')).toHaveCount(7);
});

test('add to cart, totals and free shipping threshold', async ({ page }) => {
  await page.goto('karte/11');
  await page.getByRole('button', { name: 'Mehr' }).click();
  await page.getByRole('button', { name: 'Mehr' }).click();
  await page.getByRole('button', { name: 'In den Warenkorb · 19,50 €' }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('3');

  await page.getByRole('link', { name: 'Zum Warenkorb' }).click();
  await expect(page.getByTestId('subtotal')).toHaveText('19,50 €');
  await expect(page.getByTestId('shipping')).toHaveText('2,50 €');
  await expect(page.getByTestId('total')).toHaveText('22,00 €');

  await page.getByRole('button', { name: 'Mehr' }).click(); // 4 × 6,50 = 26,00 ≥ 25 → free shipping
  await expect(page.getByTestId('shipping')).toHaveText('gratis');
  await expect(page.getByTestId('total')).toHaveText('26,00 €');
  await expect(page.getByRole('link', { name: 'Bestellung per E-Mail' })).toHaveAttribute('href', /Weihnachtskugeln/);

  await page.getByRole('button', { name: 'Entfernen' }).click();
  await expect(page.getByText('Noch ist dein Warenkorb leer')).toBeVisible();
  await expect(page.getByTestId('cart-count')).toHaveCount(0);
});

test('wish form requires name, email and message', async ({ page }) => {
  await page.goto('ueber-mich#wunsch');
  await page.getByRole('button', { name: 'Wunsch senden' }).click();
  await expect(page.getByLabel('Dein Name')).toHaveJSProperty('validity.valid', false);
  await expect(page.getByRole('status')).toHaveText('Ich melde mich innerhalb von zwei Tagen bei dir.');
});

test('footer links to Datenschutz and Impressum', async ({ page }) => {
  await page.goto('./');
  for (const name of ['Datenschutz', 'Impressum']) {
    await page.getByRole('navigation', { name: 'Rechtliches' }).getByRole('link', { name }).click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(name);
  }
});

test('unknown card shows a friendly message', async ({ page }) => {
  await page.goto('karte/999');
  await expect(page.getByRole('heading', { name: 'Karte nicht gefunden' })).toBeVisible();
});

test('no horizontal page scroll', async ({ page }) => {
  for (const path of ['./', 'karten', 'karte/11', 'ueber-mich']) {
    await page.goto(path);
    // Mobile browsers widen the layout viewport (zoom out) when content overflows, and body clips overflow-x.
    const width = await page.evaluate(() => {
      document.body.style.overflowX = 'visible';
      return Math.max(window.innerWidth, document.documentElement.scrollWidth);
    });
    expect(width, path).toBe(page.viewportSize().width);
  }
});
