# IDKWTWT API

[![Tests][tests-badge]][tests-url]
[![Linter][linter-badge]][linter-url]

[tests-badge]: https://github.com/romsssss/idkwtw/actions/workflows/api-tests-runner.yml/badge.svg?branch=main
[tests-url]: https://github.com/romsssss/idkwtw/actions/workflows/api-tests-tests-runner.yml?query=branch%3Amain
[linter-badge]:https://github.com/romsssss/idkwtw/actions/workflows/api-linter-runner.yml/badge.svg?branch=main
[linter-url]: https://github.com/romsssss/idkwtw/actions/workflows/api-linter-runner.yml?query=branch%3Amain

## Project setup

Install dependencies

```bash
npm install
```

Add required ENV variables in a `.env.development` file

* `POSTGRES_HOST`
* `POSTGRES_USER`
* `POSTGRES_PASSWORD`
* `POSTGRES_DATABASE`

Create and seed the database

```bash
psql -U $POSTGRES_USER -d $POSTGRES_DATABASE < data/schema.sql
psql -U $POSTGRES_USER -d $POSTGRES_DATABASE < data/seed.sql
```

## Run project

```bash
DEBUG=webservice:* NODE_ENV=development npm start
```

## Run test

````bash
npm test
````

## Lint project

With ESLint:

````bash
npm run lint
````
