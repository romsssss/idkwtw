#!/usr/bin/env bash
set -euo pipefail

LOCAL_DB="${LOCAL_DB:-${POSTGRES_CONNECTION_URI:-}}"
PROD_DB="${PROD_DB:?PROD_DB env var required}"

if [[ -z "$LOCAL_DB" ]]; then
  echo "Error: LOCAL_DB or POSTGRES_CONNECTION_URI env var required" >&2
  exit 1
fi

echo "Dumping titles from local DB and streaming to production..."
pg_dump --data-only --table=public.titles --column-inserts --on-conflict-do-nothing "$LOCAL_DB" | psql "$PROD_DB"

echo "Done."
