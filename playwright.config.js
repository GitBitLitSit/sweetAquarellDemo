import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  // Set BASE_PATH (e.g. /sweetAquarellDemo/) to test the GitHub Pages build.
  use: { baseURL: `http://localhost:4173${process.env.BASE_PATH || '/'}` },
  webServer: { command: 'npm run build && npm run preview -- --port 4173 --strictPort', url: `http://localhost:4173${process.env.BASE_PATH || '/'}`, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
