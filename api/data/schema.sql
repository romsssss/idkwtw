CREATE MATERIALIZED VIEW IF NOT EXISTS public.titles
AS
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
;

DROP TYPE IF EXISTS public.enum_search_sessions_public CASCADE;
CREATE TYPE public.enum_search_sessions_public AS ENUM ('alone', 'date', 'partner', 'kids', 'friends', 'family');
CREATE TABLE IF NOT EXISTS public.search_sessions (
    uuid uuid NOT NULL,
    public enum_search_sessions_public,
    genres VARCHAR(255)[],
    tconst_chosen varchar,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL,
     PRIMARY KEY (uuid)
);

DROP TYPE IF EXISTS public.enum_proposals_rejected_feedback CASCADE;
CREATE TYPE public.enum_proposals_rejected_feedback AS ENUM ('too_long', 'too_old', 'too_violent', 'too_scary');
DROP TYPE IF EXISTS public.enum_proposals_already_seen_feedback CASCADE;
CREATE TYPE public.enum_proposals_already_seen_feedback AS ENUM ('liked', 'disliked', 'do_no_remember');
CREATE TABLE IF NOT EXISTS public.proposals (
    uuid uuid NOT NULL,
    search_session_uuid uuid,
    tconst varchar NOT NULL,
    accepted bool,
    rejected_feedback public.enum_proposals_rejected_feedback,
    already_seen bool,
    already_seen_feedback public.enum_proposals_already_seen_feedback,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL,
    PRIMARY KEY (uuid),
    CONSTRAINT proposal_search_session_uuid_fkey FOREIGN KEY(search_session_uuid) REFERENCES public.search_sessions(uuid)
    -- CONSTRAINT proposal_search_session_tconst_fkey FOREIGN KEY(tconst) REFERENCES public.titles(tconst)
);
