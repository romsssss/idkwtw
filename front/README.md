# IDKWTW Front

Frontend web application made with Vue 3 in Vite.

## Getting started

Install project dependencies

```sh
npm install
```

## Run project

Compile and Hot-Reload for Development

```sh
npm run dev
```

Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Run test

Run Unit Tests with Vitest

```sh
npm run test:unit
```

Run End-to-End Tests with Playwright

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

## Lint project

Lint with ESLint

```sh
npm run lint
```
