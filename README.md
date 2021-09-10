# playwright-framework
Playwright End to End Automation Framework using Playwright Test Runner.

1. Uses Page Object Model
2. Junit XML Reports will be generated automatically

For Detailed Tutorial Visit https://deepakkamboj.com/

If you have any questions contact me on linkedIn https://www.linkedin.com/in/kambojdeepak/

## What is Playwright?
The playwright is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. Playwright is built to enable cross-browser web testing.

Playwright by Microsoft did start as a fork of Puppeteer
Puppeteer is a node library to automate the chromium browsers with the JavaScript API
### Capabilities:
* It spans multiple pages, domains, and iframes
* Intercept network activity for stubbing and mocking network requests
* Emulate mobile devices, geolocation, permissions
* Native input events for mouse and keyboard
* Upload & download support

Playwright enables fast, reliable, and capable automation across all modern browsers

### Support for all browsers
* Test on Chromium, Firefox, and WebKit
* Test for mobile (device emulation)
* Headless and headful

### Fast and reliable execution
* Auto-wait APIs (clicks, types, etc)
* Timeout-free automation
* Lean parallelization with browser contexts
* Wide variety of selectors (locators) & shadow-dom support
* Can handle single page application

### Used tools for Playwright Integration Tests
- [playwright](https://playwright.dev/) - Playwright is a Node.js library to automate tests cases for Chromium, Firefox and WebKit with a single API
- [jest-playwright](https://github.com/playwright-community/jest-playwright) - integrates Jest and Playwright
- [expect-playwright](https://github.com/playwright-community/expect-playwright) - provides useful expect statements
- [Jest](https://jestjs.io) - provides the testing suite
- [ts-jest](https://github.com/kulshekhar/ts-jest) - provides support for TypeScript
- [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest) - ESLint plugin to follow best practices and anticipate common mistakes when writing tests with jest
- [jest-runner-groups](https://github.com/eugene-manuilov/jest-runner-groups) - A test runner that allows you to tag your tests and execute specific groups of tests with Jest.
- [axe-playwright](https://www.npmjs.com/package/axe-playwright) - Analyses the page and identifies accessibility issues.
- [Playwright test runner](https://github.com/microsoft/playwright-test) - Zero config cross-browser end-to-end testing for web apps. Browser automation with Playwright, Jest-like assertions and built-in support for TypeScript.

## Getting Started

Playwright is easy to install and start to work with. Just have to create a fresh project and install the playwright as a dependency.

### Create a new project
`$ npm init -y`

### Install Playwright
`$ npm install — save-dev playwright`

### Choosing Typescript as the scripting language
`$ npm install — save-dev typescript`


### Typescript config in “tsconfig.json“

```
{
  "compilerOptions": {
     "target": "es6",
     "module": "commonjs",
     "strict": true,
     "sourceMap": true
  },
  "include": ["src"]
}
```
** As per config, we should add all tests & other classes inside of the “src/” folder