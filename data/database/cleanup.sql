/*
  IMDB datasets contain orphan rows
  This SQL script aims to remove orphan rows and create missing foreign keys
*/


DELETE FROM imdb_datasets.title_crew
  WHERE tconst IN (
      SELECT title_crew.tconst
      FROM imdb_datasets.title_crew
          LEFT JOIN imdb_datasets.title_basics ON title_crew.tconst = title_basics.tconst
      WHERE title_basics.tconst IS NULL
  );

ALTER TABLE imdb_datasets.title_crew
  ADD CONSTRAINT title_crew_tconst_fkey FOREIGN KEY (tconst) REFERENCES imdb_datasets.title_basics (tconst);


DELETE FROM imdb_datasets.title_principals
  WHERE tconst IN (
      SELECT title_principals.tconst
      FROM imdb_datasets.title_principals
          LEFT JOIN imdb_datasets.title_basics ON title_principals.tconst = title_basics.tconst
      WHERE title_basics.tconst IS NULL
  );

ALTER TABLE imdb_datasets.title_principals
  ADD CONSTRAINT title_principals_tconst_fkey FOREIGN KEY (tconst) REFERENCES imdb_datasets.title_basics (tconst);

DELETE FROM imdb_datasets.title_principals
  WHERE nconst IN (
      SELECT title_principals.nconst
      FROM imdb_datasets.title_principals
          LEFT JOIN imdb_datasets.name_basics ON title_principals.nconst = name_basics.nconst
      WHERE name_basics.nconst IS NULL
  );

ALTER TABLE imdb_datasets.title_principals
  ADD CONSTRAINT title_principals_nconst_fkey FOREIGN KEY (nconst) REFERENCES imdb_datasets.name_basics (nconst);
