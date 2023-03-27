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
