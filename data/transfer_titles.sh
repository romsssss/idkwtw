#!/usr/bin/env bash
set -euo pipefail

LOCAL_DB="${LOCAL_DB:-${POSTGRES_CONNECTION_URI:-}}"
PROD_DB="${PROD_DB:?PROD_DB env var required}"

if [[ -z "$LOCAL_DB" ]]; then
  echo "Error: LOCAL_DB or POSTGRES_CONNECTION_URI env var required" >&2
  exit 1
fi

DUMP_FILE=$(mktemp)
trap 'rm -f "$DUMP_FILE"' EXIT

echo "Dumping titles from local DB..."
pg_dump --data-only --table=public.titles "$LOCAL_DB" > "$DUMP_FILE"

echo "Upserting titles into production..."
psql "$PROD_DB" <<'SQL'
CREATE TEMP TABLE titles_import (LIKE public.titles INCLUDING ALL);
SQL

# Load the dump into the temp table by rewriting COPY targets from public.titles to titles_import
sed 's/COPY public\.titles /COPY titles_import /' "$DUMP_FILE" | psql "$PROD_DB"

psql "$PROD_DB" <<'SQL'
INSERT INTO public.titles
SELECT * FROM titles_import
ON CONFLICT (tconst) DO UPDATE SET
  title_type = EXCLUDED.title_type,
  primary_title = EXCLUDED.primary_title,
  original_title = EXCLUDED.original_title,
  is_adult = EXCLUDED.is_adult,
  start_year = EXCLUDED.start_year,
  end_year = EXCLUDED.end_year,
  runtime_minutes = EXCLUDED.runtime_minutes,
  genres = EXCLUDED.genres,
  created_on = EXCLUDED.created_on,
  average_rating = EXCLUDED.average_rating,
  num_votes = EXCLUDED.num_votes,
  directors = EXCLUDED.directors,
  writers = EXCLUDED.writers;

DROP TABLE titles_import;
SQL

echo "Done."
