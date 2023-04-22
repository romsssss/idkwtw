CREATE TABLE IF NOT EXISTS public.titles (
  tconst VARCHAR(10) UNIQUE NOT NULL PRIMARY KEY,
  title_type VARCHAR(255),
  primary_title TEXT,
  original_title TEXT,
  is_adult BOOLEAN,
  start_year SMALLINT,
  end_year SMALLINT,
  runtime_minutes INTEGER,
  genres VARCHAR(255)[],
  created_on TIMESTAMP,
  average_rating FLOAT,
  num_votes INTEGER,
  directors VARCHAR(10)[],
  writers VARCHAR(10)[]
);

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
    CONSTRAINT proposal_search_session_uuid_fkey FOREIGN KEY(search_session_uuid) REFERENCES public.search_sessions(uuid),
    CONSTRAINT proposal_search_session_tconst_fkey FOREIGN KEY(tconst) REFERENCES public.titles(tconst)
);

DROP TYPE IF EXISTS public.enum_videos_type;
CREATE TYPE public.enum_videos_type AS ENUM ('trailer');
DROP TYPE IF EXISTS public.enum_videos_site;
CREATE TYPE public.enum_videos_site AS ENUM ('youtube');
CREATE TABLE public.videos (
    uuid uuid NOT NULL,
    name text,
    type public.enum_videos_type NOT NULL,
    site public.enum_videos_site NOT NULL,
    key varchar NOT NULL,
    size int4,
    official bool,
    iso_639_1 varchar,
    iso_3166_1 varchar,
    published_at timestamptz,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NOT NULL,
    tconst varchar,
    CONSTRAINT videos_tconst_fkey FOREIGN KEY (tconst) REFERENCES public.titles(tconst),
    PRIMARY KEY (uuid)
);
