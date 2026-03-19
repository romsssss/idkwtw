# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IDKWTW** ("I Don't Know What To Watch") — a minimalist movie recommendation app. Users answer two questions (viewing context + genre preferences), and the app recommends a movie with a trailer.

Three services in a monorepo:
- `api/` — Node.js/Express REST API (deployed on Vercel)
- `front/` — Vue 3 + TypeScript SPA (Vite)
- `data/` — Python scripts to import IMDB datasets into PostgreSQL

## Commands

### API (`cd api`)
```bash
npm install
DEBUG=webservice:* NODE_ENV=development npm start
npm test           # Jest (runs against a real test DB)
npm run lint       # ESLint
```

### Frontend (`cd front`)
```bash
npm install
npm run dev        # Vite dev server on :5173
npm run build      # type-check + vite build
npm run test:unit  # Vitest
npm run test:e2e   # Playwright (requires running dev server or prior build)
npm run lint       # ESLint --fix
npm run format     # Prettier
```

### Data service (`cd data`)
```bash
pipenv install
python download_imdb_datasets.py
psql $POSTGRES_CONNECTION_URI < database/schema.sql
python seed_imdb_datasets.py
psql $POSTGRES_CONNECTION_URI < database/cleanup.sql
```

## Architecture

### Database (PostgreSQL)
Two schemas:
- `imdb_datasets` — staging tables for raw IMDB data
- `public` — production tables:
  - `titles` — movie catalog (from IMDB, with ratings/crew)
  - `search_sessions` — user session with viewing scenario (`alone | date | partner | kids | friends | family`) and selected genres
  - `proposals` — recommended movies per session, with acceptance/rejection feedback
  - `videos` — YouTube trailers per title

### API (`api/src/`)
MVC structure: `models/` (Sequelize ORM) → `controllers/` → `routes/`. Business logic for generating proposals lives in `services/ProposalCreator` and `services/VideoCreator`.

### Frontend (`front/src/`)
Three main views driven by `router/index.ts`:
1. `/` — HomeView: creates a new search session, redirects to it
2. `/search_sessions/:uuid` — two-step quiz (scenario + genres)
3. `/proposals/:uuid` — displays recommended movie + trailer

State is managed via a Pinia store (`stores/main.ts`). UI strings are in `src/i18n/` (currently English only).

### CI
GitHub Actions runs API tests (with a PostgreSQL service container) and ESLint on every push/PR touching `api/**`. Node version is read from `api/.node-version`.
