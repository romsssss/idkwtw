import os
import sys
import time
import requests
import psycopg2
from psycopg2.extras import execute_batch
from concurrent.futures import ThreadPoolExecutor
from dotenv import load_dotenv

# TMDB allows roughly 50 requests/second; stay comfortably below it.
WORKERS = 8
BATCH_SIZE = 500

def fetch_original_language(session, api_key, tconst):
    # TMDB accepts IMDB ids directly on the movie endpoint (also used for trailers by the API).
    for attempt in range(5):
        response = session.get(f'https://api.themoviedb.org/3/movie/{tconst}', params={'api_key': api_key})
        if response.status_code == 429:
            time.sleep(int(response.headers.get('Retry-After', 1)) * (attempt + 1))
            continue
        if response.status_code == 404:
            return None
        response.raise_for_status()
        language = response.json().get('original_language')
        return language if language and len(language) == 2 else None
    return None

def main():
    load_dotenv()
    api_key = os.environ['API_KEY_THE_MOVIE_DB']
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else None

    connection = psycopg2.connect(os.environ['POSTGRES_CONNECTION_URI'])
    cursor = connection.cursor()

    # Most popular first, so a partial run already covers the titles proposed most often.
    # Titles TMDB does not know stay NULL and are retried on the next run.
    cursor.execute(
        'SELECT tconst FROM public.titles WHERE original_language IS NULL ORDER BY num_votes DESC NULLS LAST LIMIT %s',
        (limit,))
    tconsts = [row[0] for row in cursor.fetchall()]
    print(f'Looking up {len(tconsts)} titles on TMDB')

    http = requests.Session()
    found = 0
    with ThreadPoolExecutor(max_workers=WORKERS) as executor:
        for start in range(0, len(tconsts), BATCH_SIZE):
            batch = tconsts[start:start + BATCH_SIZE]
            languages = executor.map(lambda tconst: fetch_original_language(http, api_key, tconst), batch)
            updates = [(language, tconst) for tconst, language in zip(batch, languages) if language]

            execute_batch(cursor, 'UPDATE public.titles SET original_language = %s WHERE tconst = %s', updates)
            connection.commit()

            found += len(updates)
            print(f'{start + len(batch)}/{len(tconsts)} looked up, {found} languages found')

    connection.close()

if __name__ == '__main__':
    main()
