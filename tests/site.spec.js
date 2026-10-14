import { test, expect } from '@playwright/test';

for (const width of [1440, 1000, 640, 400]) {
  test(`Layout and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1000 ? 560 : 900 });
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design spaces that feel like home.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('link', { name: /^Request Consultation/ }).click();
    await expect(page.locator('#name')).toBeInViewport();
    await page.locator('#name').fill('Demo Student');
    await page.getByRole('button', { name: /^Create consultation brief/ }).click();
    expect(await page.locator('#email').evaluate(el => el.validity.valueMissing)).toBe(true);
    await page.locator('#email').fill('student@example.com');
    await page.locator('#phone').fill('123');
    await page.locator('#type').fill('Chandigarh bedroom');
    await page.getByRole('button', { name: /^Create consultation brief/ }).click();
    expect(await page.locator('#phone').evaluate(el => el.validity.patternMismatch)).toBe(true);
    await page.locator('#phone').fill('+91 98765 43210');
    await page.getByRole('button', { name: /^Create consultation brief/ }).dblclick();
    await expect(page.locator('.form-result')).toHaveCount(1);
    await expect(page.locator('.form-result')).toContainText('No request has been sent');
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: /^Download brief/ }).click();
    expect((await download).suggestedFilename()).toBe('loom-consultation-brief.txt');
    await page.getByRole('button', { name: /^Clear details/ }).click();
    await expect(page.locator('#name')).toHaveValue('');
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    await page.reload();
    await expect(page.locator('.form-result')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('Project dialog opens from gallery and restores focus on Escape', async ({ page }) => {
  await page.goto('/');
  const first = page.getByRole('button', { name: /^View project/ }).first();
  await first.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The Bandra Residence' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(first).toBeFocused();
});

test('Chat replies work and dragging does not toggle the panel', async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 560 });
  await page.goto('/');
  const fab = page.locator('.chat-fab');
  await fab.click();
  await page.getByRole('button', { name: 'Kitchen', exact: true }).click();
  await expect(page.locator('.chat-panel')).toContainText('start with storage');
  const bounds = await page.locator('.chat-panel').boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0); expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(560);
  await page.keyboard.press('Escape');
  const box = await fab.boundingBox();
  await page.mouse.move(box.x + 20, box.y + 20); await page.mouse.down();
  await page.mouse.move(80, 180, { steps: 10 }); await page.mouse.up();
  await expect(fab).toHaveAttribute('aria-expanded', 'false');
  await fab.click();
  await expect(fab).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('link', { name: /^Continue to consultation/ }).click();
  await expect(page.locator('#name')).toBeInViewport();
  await expect(page.locator('.chat-widget')).toHaveClass(/closed/);
});

test('Style selection and camera denial preserve a usable preview', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia: () => Promise.reject(new DOMException('Denied', 'NotAllowedError')) } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Coastal ink' }).click();
  await expect(page.getByRole('button', { name: 'Coastal ink' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.camera-stage-label')).toContainText('Teal + natural linen');
  await page.getByRole('button', { name: 'Open camera' }).click();
  await expect(page.locator('.camera-status')).toContainText('Camera access is unavailable');
});

test('Camera starts and stops video tracks with a simulated device', async ({ browser }) => {
  const context = await browser.newContext({ permissions: ['camera'] });
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.cameraStops = 0;
    const stream = new MediaStream();
    stream.getTracks = () => [{ stop: () => window.cameraStops++ }];
    Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia: async () => stream } });
    HTMLMediaElement.prototype.play = async () => {};
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open camera' }).click();
  await expect(page.locator('.camera-stage')).toHaveClass(/ready/);
  await expect(page.locator('.camera-overlay')).not.toHaveCSS('background-image', /url/);
  await page.getByRole('button', { name: 'Close camera' }).click();
  expect(await page.evaluate(() => window.cameraStops)).toBe(1);
  await expect(page.locator('.camera-stage')).toHaveClass(/idle/);
  await context.close();
});

test('All rendered images load and mobile menu follows a click-through path', async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 900 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('#siteNav').getByRole('link', { name: 'Fit check' }).click();
  await expect(page.locator('#fit-check')).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  await page.evaluate(async () => Promise.all([...document.images].map(img => img.decode())));
  expect(await page.locator('img').evaluateAll(imgs => imgs.every(img => img.naturalWidth > 0))).toBe(true);
});
