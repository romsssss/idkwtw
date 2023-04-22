# IDKWTWT API

## Project setup

Install dependencies

```bash
npm install
```

Add required ENV variables in a `.env.development` file

* `DB_HOST`
* `DB_USER`
* `DB_PASSWORD`
* `DB_NAME`

Create and seed the database

```bash
psql -U $DB_USER -d $DB_NAME < data/schema.sql
psql -U $DB_USER -d $DB_NAME < data/seed.sql
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
