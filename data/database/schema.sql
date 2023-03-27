CREATE SCHEMA IF NOT EXISTS imdb_datasets;

CREATE TABLE IF NOT EXISTS imdb_datasets.title_basics (
  tconst VARCHAR(10) UNIQUE NOT NULL PRIMARY KEY,
  title_type VARCHAR(255) NOT NULL,
  primary_title TEXT,
  original_title TEXT,
  is_adult BOOLEAN,
  start_year SMALLINT,
  end_year SMALLINT,
  runtime_minutes INTEGER,
  genres VARCHAR(255)[],
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS imdb_datasets.title_ratings (
  tconst VARCHAR(10) UNIQUE NOT NULL PRIMARY KEY REFERENCES imdb_datasets.title_basics,
  average_rating FLOAT NOT NULL,
  num_votes INTEGER NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS imdb_datasets.name_basics (
  nconst VARCHAR(10) UNIQUE NOT NULL PRIMARY KEY,
  primary_name TEXT,
  birth_year SMALLINT,
  death_year SMALLINT,
  primary_profession VARCHAR(255)[],
  known_for_titles VARCHAR(10)[],
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS imdb_datasets.title_crew (
  tconst VARCHAR(10) UNIQUE NOT NULL PRIMARY KEY, -- foreign key is setup at a later stage
  directors VARCHAR(10)[],
  writers VARCHAR(10)[],
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS imdb_datasets.title_principals (
  tconst VARCHAR(10) NOT NULL,  -- foreign key is setup at a later stage
  ordering INTEGER NOT NULL,
  nconst VARCHAR(10) NOT NULL,  -- foreign key is setup at a later stage
  category TEXT,
  job TEXT,
  characters TEXT,
  created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (tconst, ordering)
);
