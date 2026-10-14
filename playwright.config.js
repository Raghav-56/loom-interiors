import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  use: { baseURL: 'http://localhost:4173', browserName: 'chromium', channel: 'chromium', headless: true },
  webServer: { command: 'npm run build && npm run preview -- --host 0.0.0.0 --port 4173', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI },
});
