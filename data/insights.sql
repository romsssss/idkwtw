-- =============================================================================
-- Usage Insights Queries
-- Run these against the production database to understand user behavior.
-- =============================================================================

-- 1. Sessions per week
SELECT TO_CHAR(DATE_TRUNC('week', created_at), 'Dy DD Mon') AS week, COUNT(*) AS sessions
FROM search_sessions
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY DATE_TRUNC('week', created_at) DESC;

-- 2. Sessions per day (last 30 days)
SELECT TO_CHAR(created_at, 'Dy DD Mon') AS date, COUNT(*) AS sessions
FROM search_sessions
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at), TO_CHAR(created_at, 'Dy DD Mon')
ORDER BY DATE(created_at) DESC;

-- 3. Funnel (last 30 days)
WITH funnel AS (
  SELECT
    COUNT(*) AS sessions_created,
    COUNT(public) AS scenario_picked,
    COUNT(CASE WHEN genres IS NOT NULL AND array_length(genres, 1) > 0 THEN 1 END) AS genres_picked,
    (SELECT COUNT(DISTINCT p.search_session_uuid) FROM proposals p JOIN search_sessions ss ON ss.uuid = p.search_session_uuid WHERE ss.created_at >= NOW() - INTERVAL '30 days') AS got_proposal,
    COUNT(tconst_chosen) AS accepted_movie
  FROM search_sessions
  WHERE created_at >= NOW() - INTERVAL '30 days'
)
SELECT
  sessions_created,
  scenario_picked  || ' (' || ROUND(100.0 * scenario_picked / NULLIF(sessions_created, 0), 1) || '%)' AS scenario_picked,
  genres_picked    || ' (' || ROUND(100.0 * genres_picked / NULLIF(sessions_created, 0), 1) || '%)' AS genres_picked,
  got_proposal     || ' (' || ROUND(100.0 * got_proposal / NULLIF(sessions_created, 0), 1) || '%)' AS got_proposal,
  accepted_movie   || ' (' || ROUND(100.0 * accepted_movie / NULLIF(sessions_created, 0), 1) || '%)' AS accepted_movie
FROM funnel;

-- 4. Completion rate
SELECT
  COUNT(*) AS total_sessions,
  COUNT(tconst_chosen) AS completed,
  ROUND(100.0 * COUNT(tconst_chosen) / NULLIF(COUNT(*), 0), 1) AS completion_pct
FROM search_sessions
WHERE created_at >= NOW() - INTERVAL '30 days';

-- 5. Average proposals before acceptance
SELECT ROUND(AVG(proposal_count), 1) AS avg_proposals_before_accept
FROM (
  SELECT ss.uuid, COUNT(p.uuid) AS proposal_count
  FROM search_sessions ss
  JOIN proposals p ON p.search_session_uuid = ss.uuid
  WHERE ss.tconst_chosen IS NOT NULL
    AND ss.created_at >= NOW() - INTERVAL '30 days'
  GROUP BY ss.uuid
) sub;

-- 6. Rejection reasons distribution
SELECT
  COALESCE(rejected_feedback::text, 'no_feedback') AS reason,
  COUNT(*) AS sessions,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER ()) || '%' AS pct
FROM proposals
WHERE accepted = false AND already_seen IS NOT TRUE
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY rejected_feedback
ORDER BY sessions DESC;

-- 7. Already-seen feedback distribution
SELECT
  COALESCE(already_seen_feedback::text, 'no_feedback') AS sentiment,
  COUNT(*) AS count
FROM proposals
WHERE already_seen = true
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY already_seen_feedback
ORDER BY count DESC;

-- 8. Popular scenarios
SELECT public AS scenario,
  COUNT(*) AS sessions,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER ()) || '%' AS pct
FROM search_sessions
WHERE public IS NOT NULL
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY public
ORDER BY sessions DESC;

-- 9. Popular genres
SELECT g AS genre,
  COUNT(*) AS sessions,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER ()) || '%' AS pct
FROM search_sessions, unnest(genres) AS g
WHERE genres IS NOT NULL
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY g
ORDER BY sessions DESC;

-- 10. Most accepted movies
SELECT t.primary_title, t.start_year, t.genres, COUNT(*) AS times_accepted
FROM search_sessions ss
JOIN titles t ON t.tconst = ss.tconst_chosen
WHERE ss.tconst_chosen IS NOT NULL
  AND ss.created_at >= NOW() - INTERVAL '30 days'
GROUP BY t.tconst, t.primary_title, t.start_year, t.genres
ORDER BY times_accepted DESC
LIMIT 20;

-- 11. Most rejected movies (shown but never accepted)
SELECT t.primary_title, t.start_year,
  COUNT(*) AS times_proposed,
  COUNT(CASE WHEN p.accepted = false THEN 1 END) AS times_rejected
FROM proposals p
JOIN titles t ON t.tconst = p.tconst
WHERE p.created_at >= NOW() - INTERVAL '30 days'
GROUP BY t.tconst, t.primary_title, t.start_year
HAVING COUNT(CASE WHEN p.accepted = true THEN 1 END) = 0
ORDER BY times_rejected DESC
LIMIT 20;
