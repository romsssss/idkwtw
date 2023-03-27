import os
import time
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import text
from dotenv import load_dotenv

def is_row_already_in_database(db_engine, table_name, filters):
    conditions = ''
    if len(filters) > 0:
        conditions = 'WHERE'
        processed_filters = []
        for key, value in filters.items():
            processed_filters.append(f" {key} = '{value}'")
        conditions += " AND ".join(processed_filters)

    query = f"SELECT EXISTS(SELECT 1 FROM {table_name} {conditions});"
    with db_engine.connect() as connection:
        return connection.execute(text(query)).__next__()[0]

def insert_title_basics(df, db_engine):
    df.columns = ['tconst', 'title_type', 'primary_title', 'original_title', 'is_adult', 'start_year', 'end_year', 'runtime_minutes', 'genres']

    # df = df.loc[df['titleType'] == 'movie']
    # df = df.loc[df.primary_title.notnull()] # filter out titles without title (NaN values)
    df['is_adult'] = df['is_adult'].astype(bool) # convert is_adult to boolean
    df['start_year'] = df['start_year'].map(lambda year: None if year == '\\N' else year) # handle unknown start_year
    df['end_year'] = df['end_year'].map(lambda year: None if year == '\\N' else year) # handle unknown end_year
    df['runtime_minutes'] = df['runtime_minutes'].map(lambda minutes: None if (minutes == '\\N' or not(minutes.isdigit())) else minutes) # handle unknown runtime_minutes (or NaN)
    df['genres'] = df['genres'].map(lambda genres: [] if type(genres) == float else list(filter(lambda genre: genre != '\\N', genres.split(',')))) # handle wrong genres

    df.to_sql('title_basics', db_engine, if_exists='append', index=False)

    print(f'Inserted {len(df.index)} rows')

def insert_title_ratings(df, db_engine):
    df.columns = ['tconst', 'average_rating', 'num_votes']

    df.to_sql('title_ratings', db_engine, if_exists='append', index=False)

    print(f'Inserted {len(df.index)} rows')

def insert_name_basics(df, db_engine):
    df.columns = ['nconst', 'primary_name', 'birth_year', 'death_year', 'primary_profession', 'known_for_titles']

    # df = df.loc[df.primary_name.notnull()] # filter out titles without title (NaN values)
    df['birth_year'] = df['birth_year'].map(lambda year: None if year == '\\N' else year) # handle unknown birth_year
    df['death_year'] = df['death_year'].map(lambda year: None if year == '\\N' else year) # handle unknown death_year
    df['primary_profession'] = df['primary_profession'].map(lambda primary_profession: [] if type(primary_profession) == float else primary_profession.split(','))
    df['known_for_titles'] = df['known_for_titles'].map(lambda known_for_titles: [] if type(known_for_titles) == float else known_for_titles.split(','))

    df.to_sql('name_basics', db_engine, if_exists='append', index=False)

    print(f'Inserted {len(df.index)} rows')

def insert_title_crew(df, db_engine):
    df.columns = ['tconst', 'directors', 'writers']

    df['directors'] = df['directors'].map(lambda directors: list(filter(lambda director: director != '\\N', directors.split(','))))
    df['writers'] = df['writers'].map(lambda writers: list(filter(lambda writer: writer != '\\N', writers.split(','))))

    df.to_sql('title_crew', db_engine, if_exists='append', index=False)

    print(f'Inserted {len(df.index)} rows')

def insert_title_principals(df, db_engine):
    df.columns = ['tconst', 'ordering', 'nconst', 'category', 'job', 'characters']

    df['job'] = df['job'].map(lambda job: None if job == '\\N' else job)
    df['characters'] = df['characters'].map(lambda characters: None if characters == '\\N' else characters)

    df.to_sql('title_principals', db_engine, if_exists='append', index=False)

    print(f'Inserted {len(df.index)} rows')

def import_tsv_file(file_path, db_engine, table_name, primary_key):
    reader = pd.read_csv(file_path, sep='\t', chunksize=100_000)

    for data_frame in reader:
        first_row = data_frame.iloc[0]
        filters = {attr:first_row[attr] for attr in primary_key}
        if is_row_already_in_database(db_engine, table_name, filters):
            print('skipping already imported batch')
        else:
            globals()[f"insert_{table_name}"](data_frame, db_engine)

def main():
    dbschema='imdb_datasets'
    database_engine = create_engine(
        os.environ['POSTGRES_CONNECTION_URI'],
        connect_args={'options': '-csearch_path={}'.format(dbschema)})

    total_start_time = time.time()

    print('STEP 1/5: IMPORTING title_basics')
    start_time = time.time()
    import_tsv_file('./raw_data/title.basics.tsv', database_engine, 'title_basics', ['tconst'])
    end_time = time.time()
    print(f'title_basics import finished in {round(end_time-start_time)}s')

    print('STEP 2/5: IMPORTING title_ratings')
    start_time = time.time()
    import_tsv_file('./raw_data/title.ratings.tsv', database_engine, 'title_ratings', ['tconst'])
    end_time = time.time()
    print(f'title_basics import finished in {round(end_time-start_time)}s')

    print('STEP 3/5: IMPORTING name_basics')
    start_time = time.time()
    import_tsv_file('./raw_data/name.basics.tsv', database_engine, 'name_basics', ['nconst'])
    end_time = time.time()
    print(f'title_basics import finished in {round(end_time-start_time)}s')

    print('STEP 4/5: IMPORTING title_crew')
    start_time = time.time()
    import_tsv_file('./raw_data/title.crew.tsv', database_engine, 'title_crew', ['tconst'])
    end_time = time.time()
    print(f'title_basics import finished in {round(end_time-start_time)}s')

    print('STEP 5/5: IMPORTING title_principals')
    start_time = time.time()
    import_tsv_file('./raw_data/title.principals.tsv', database_engine, 'title_principals', ['tconst', 'ordering'])
    end_time = time.time()
    print(f'title_basics import finished in {round(end_time-start_time)}s')

    total_end_time = time.time()
    print(f'GLOBAL IMPORT FINISHED IN {round(total_end_time-total_start_time)}s')


load_dotenv()
main()
