// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import minimist from 'minimist';
import path from 'path';

export function getCommandParameters() {
  return minimist(process.argv.slice(1), {
    string: ['browser', 'grep', 'output', 'config'],
    boolean: ['headed'],
    number: ['timeout', 'retries '],
    alias: {
      g: 'grep',
      c: 'config',
    },
    default: {
      browser: 'chromium',
      headed: true,
      timeout: 60000,
      retries: 2,
    },
  });
}
enum EnvironmentVariable {
  AUTO_OPEN_DEVTOOLS = 'AUTO_OPEN_DEVTOOLS',
  OUTPUT_DIR = 'OUTPUT_DIR',
  BROWSER = 'BROWSER',
  CI = 'CI',
  COLLECT_COVERAGE = 'COLLECT_COVERAGE',
  ENABLE_LOGGING = 'ENABLE_LOGGING',
  GAUNTLET = 'GAUNTLET',
  HEADLESS = 'HEADLESS',
  IGNORE_FLAKY_TESTS = 'IGNORE_FLAKY_TESTS',
  IGNORE_HTTPS_ERRORS = 'IGNORE_HTTPS_ERRORS',
  INT_TESTS = 'INT_TESTS',
  RECORD_VIDEO = 'RECORD_VIDEO',
  RUN_ENV = 'RUN_ENV',
  RUN_TYPE = 'RUN_TYPE',
  SLOW_DOWN_MS = 'SLOW_DOWN_MS',
  TEST_TIMEOUT = 'TEST_TIMEOUT', // Timeout for a test case
  RETRIES = 'RETRIES', // Number of retry attempts for failed test
}

function getEnvironmentVariable<U extends string | number>(
  envVar: EnvironmentVariable,
  converter?: (arg: string) => U,
): U {
  const envName = EnvironmentVariable[EnvironmentVariable[envVar]];
  const envValue = process.env[envName];
  return converter ? converter(envValue || '') : (envValue as U);
}

function isEnabled(flag: EnvironmentVariable): boolean {
  return getEnvironmentVariable(flag) === 'true' ? true : false;
}

function isCIRun(): boolean {
  return isEnabled(EnvironmentVariable.CI);
}

export type BrowserType = 'chromium' | 'webkit' | 'firefox';
export function isBrowserType(str: string): str is BrowserType {
  return str === 'chromium' || str === 'firefox' || str === 'webkit';
}

process.env.BROWSER = 'webkit';
process.env.CI = 'true';
process.env.HEADLESS = 'false';
const isRunningInCI = isCIRun();
//console.log('CI ' + isRunningInCI, getEnvironmentVariable(EnvironmentVariable.CI));

const parameters = getCommandParameters();
//console.log('Parameters: ', parameters);
const integrationTestsPackageName = 'test';
if (!process.env.OUTPUT_DIR) {
  process.env.OUTPUT_DIR = process.cwd();
}

const browser = isBrowserType(process.env.BROWSER) ? (process.env.BROWSER as BrowserType) : 'chromium';

const config: PlaywrightTestConfig = {
  name: 'Integration Tests',
  globalSetup: require.resolve('./globals/global-setup'),
  globalTeardown: require.resolve('./globals/global-teardown'),
  use: {
    browserName: browser,
    headless: Boolean(process.env.HEADLESS),
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    trace: 'retain-on-failure',
    launchOptions: {
      headless: Boolean(process.env.HEADLESS),
      slowMo: Number(process.env.SLOW_DOWN_MS),
      devtools: process.env.AUTO_OPEN_DEVTOOLS === 'true',
      args: ['--start-maximized', '--no-sandbox', '--disable-web-security'],
    },
  },
  outputDir: path.join(process.env.OUTPUT_DIR, 'artifacts'),
  reporter: [
    ['list'],
    [
      'junit',
      {
        outputFile:
          process.env.OUTPUT_DIR +
          '/artifacts/testResults/' +
          integrationTestsPackageName.replace(/[^a-z0-9.-]+/gi, '_').toLowerCase() +
          '-results.xml',
      },
    ],
  ],
  retries: Number(process.env.RETRIES) || 2,
  testDir: process.env.TEST_DIR || 'src/tests',
  timeout: Number(process.env.TEST_TIMEOUT) || 60000,
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
  workers: process.env.CI ? 2 : undefined,
};
export default config;
