import { defineConfig, devices } from "@playwright/test";

const snapshotSuite = process.env.PLAYWRIGHT_SNAPSHOT_SUITE?.trim();
const snapshotPathTemplate = snapshotSuite
  ? `snaps/${snapshotSuite}/{projectName}/{arg}{ext}`
  : "snaps/{projectName}/{arg}{ext}";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Run a fixed worker count in CI for consistent speed and stability. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ["list"],
        ["html", { outputFolder: "playwright-report", open: "never" }],
        ["json", { outputFile: "playwright-report.json" }],
      ]
    : [
        ["list", { printSteps: false }],
        ["html", { outputFolder: "playwright-report", open: "on-failure" }],
        ["json", { outputFile: "playwright-report.json" }],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    bypassCSP: true,

    screenshot: "only-on-failure",
    video: "retain-on-failure",

    /* Retain trace artifacts for failed tests, even without a retry. */
    trace: "retain-on-failure",
  },

  /* Custom snapshot path */
  snapshotPathTemplate,
  // expect: {
  //   toHaveScreenshot: {
  //     maxDiffPixelRatio: 0.03,
  //     animations: "disabled",
  //     threshold: 0.2,
  //   },
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // iPhone browsers
    // {
    //   name: "iPhone Chrome",
    //   use: {
    //     ...devices["iPhone 12"],
    //     browserName: "chromium",
    //     channel: "chrome",
    //   },
    // },
    {
      name: "iPhone Safari",
      use: { ...devices["iPhone 12"], browserName: "webkit" },
    },
    // {
    //   name: "iPhone Firefox",
    //   use: {
    //     browserName: "firefox",
    //     channel: "firefox",
    //     viewport: { width: 390, height: 844 }, // iPhone 12 viewport
    //     userAgent:
    //       "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/32.0 Mobile/15E148 Safari/605.1.15",
    //   },
    // },
    // {
    //   name: "iPhone Edge",
    //   use: {
    //     ...devices["iPhone 12"],
    //     browserName: "chromium",
    //     channel: "msedge",
    //   },
    // },

    // Android browsers
    // {
    //   name: "Android Chrome",
    //   use: {
    //     ...devices["Pixel 5"],
    //     browserName: "chromium",
    //     channel: "chrome",
    //   },
    // },
    // {
    //   name: "Android Safari",
    //   use: { ...devices["Pixel 5"], browserName: "webkit" },
    // },
    // {
    //   name: "Android Firefox",
    //   use: {
    //     browserName: "firefox",
    //     channel: "firefox",
    //     viewport: { width: 393, height: 851 }, // Pixel 5 viewport
    //     userAgent:
    //       "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) FxiOS/32.0 Mobile/15E148 Safari/605.1.15",
    //   },
    // },
    // {
    //   name: "Android Edge",
    //   use: {
    //     ...devices["Pixel 5"],
    //     browserName: "chromium",
    //     channel: "msedge",
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
