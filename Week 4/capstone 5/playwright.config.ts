import { defineConfig, devices } from '@playwright/test';
import { isRemote, BASE_URL, LOCAL_APP_PORT } from './config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: [/responsive/, /cross-browser/, /live/, /multilingual/, /datadriven/],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: [
        /responsive/,
        /cross-browser/,
        /live/,
        /multilingual/,
        /datadriven/,
        // The regression and integration modules are re-test modules: they re-run the same critical
        // paths as the functional suite, so they run once (chromium). Cross-browser coverage stays
        // with TC-026 / TC-027 / TC-028.
        /regression/,
        /integration/,
      ],
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: [
        /responsive/,
        /cross-browser/,
        /live/,
        /multilingual/,
        /datadriven/,
        /regression/,
        /integration/,
      ],
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      testIgnore: [
        /responsive/,
        /cross-browser/,
        /live/,
        /multilingual/,
        /datadriven/,
        /regression/,
        /integration/,
      ],
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'live-chromium',
      testMatch: /(live|multilingual|datadriven)[\\/]TC-[^/]*\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'live-firefox',
      testMatch: /(live|multilingual|datadriven)[\\/]TC-[^/]*\.spec\.ts$/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'live-webkit',
      testMatch: /(live|multilingual|datadriven)[\\/]TC-[^/]*\.spec\.ts$/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'cross-chrome',
      testMatch: /cross-browser[\\/]TC-026.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'cross-firefox',
      testMatch: /cross-browser.*TC-027.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'cross-webkit',
      testMatch: /cross-browser.*TC-028.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile',
      testMatch: /responsive.*TC-029.*\.spec\.ts/,
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'tablet',
      testMatch: /responsive.*TC-030.*\.spec\.ts/,
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
  webServer: isRemote
    ? undefined
    : {
        command: `npx http-server ./app -p ${LOCAL_APP_PORT} -c-1 --silent`,
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
      },
});
