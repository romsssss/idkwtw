import os.path
import gzip
import shutil
import requests

FILE_URLS = [
    'https://datasets.imdbws.com/title.basics.tsv.gz',
    'https://datasets.imdbws.com/name.basics.tsv.gz',
    'https://datasets.imdbws.com/title.ratings.tsv.gz',
    'https://datasets.imdbws.com/title.crew.tsv.gz',
    'https://datasets.imdbws.com/title.principals.tsv.gz'
]

def main():
    for i, file_url in enumerate(FILE_URLS):
        file_name = file_url.split('/')[-1]
        file_path = f'./raw_data/{file_name}'
        file_path_unziped = '.'.join(file_path.split('.')[:-1])

        print(f'STEP {i+1}/{len(FILE_URLS)}: DOWNLOADING {file_name}')

        if os.path.isfile(file_path):
            print('file was already previously downloaded')
        else:
            r = requests.get(file_url, allow_redirects=True)
            open(file_path, 'wb').write(r.content)

        if os.path.isfile(file_path_unziped):
            print('file was already unzipped')
        else:
            with gzip.open(file_path, 'rb') as f_in:
                with open(file_path_unziped, 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)

        print('Done')

main()
