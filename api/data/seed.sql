INSERT INTO titles
 SELECT
    title_basics.*,
    title_ratings.average_rating,
    title_ratings.num_votes,
    title_crew.directors,
    title_crew.writers
  FROM
    imdb_datasets.title_basics
    LEFT JOIN imdb_datasets.title_ratings ON title_ratings.tconst = title_basics.tconst
    LEFT JOIN imdb_datasets.title_crew ON title_crew.tconst = title_basics.tconst
  WHERE
    title_type = 'movie'
    AND NOT ('Adult' = ANY (genres))
    AND average_rating > 6
  ORDER BY
    tconst
ON CONFLICT DO NOTHING
;
