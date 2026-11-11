# IDKWTW Data

This service aims to import [IMDB datasets](https://www.imdb.com/interfaces/) into a local PostgreSQL database.

## Getting started

Requirements:

* `python` (v3+) and `pip`
* `postgresql`

Install `pipenv`

```bash
pip install --user pipenv
```

Install project dependencies

```bash
pipenv install
```

Setup `POSTGRES_CONNECTION_URI` environment variable such as in the example below

```bash
echo "POSTGRES_CONNECTION_URI=postgresql://my_user:@localhost:5432/my_database" >> .env
```

## Run project

The data import is split in 4 steps

### STEP 1: download and unzip raw data files

The following command will download and unzip IMDB datasets files into `raw_data/folder`

```bash
python download_imdb_datasets.py
```

### STEP 2: create PostgreSQL schema

The following command will create a new `imdb_datasets` schema into the PostgreSQL database.

```bash
psql $POSTGRES_CONNECTION_URI < database/schema.sql
```

### STEP 3: seed PostgreSQL schema

The following command will seed the freshly created `imdb_datasets` schema with the previously downloaded IMDB dataset

```bash
 python seed_imdb_datasets.py
```

### STEP 4: cleanup PostgreSQL schema

The following command will cleanup `imdb_datasets` schema from any inconsistent data from the datasets.

```bash
psql $POSTGRES_CONNECTION_URI < database/cleanup.sql
```

### STEP 5: backfill original languages

`public.titles` has no language information in the IMDB datasets, so the original language of each title is looked up on TMDB (requires `API_KEY_THE_MOVIE_DB` in `.env`). Only titles without a language are looked up, most popular first, so the script can be re-run after importing new titles or interrupted at any point. An optional argument limits the number of titles looked up.

```bash
python backfill_original_language.py         # all titles missing a language (~35 min for the full catalogue)
python backfill_original_language.py 5000    # only the 5,000 most popular
```

### STEP 6: transfer titles to production

Run the following command to populate the `public.titles` table in the production (Vercel/Neon) database.
Existing rows are silently skipped; `proposals` and `videos` are never touched.

```bash
LOCAL_DB=<local_uri> PROD_DB=<production_uri> bash transfer_titles.sh
# or, if POSTGRES_CONNECTION_URI is already set in .env:
source .env && PROD_DB=<production_uri> bash transfer_titles.sh
```
