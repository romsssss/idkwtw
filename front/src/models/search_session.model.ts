export const searchSessionPublics = ['alone', 'date', 'partner', 'kids', 'friends', 'family'] as const

type SearchSessionPublics = (typeof searchSessionPublics)[number]

export const searchSessionExitFeedback = ['just_browsing', 'nothing_fits_mood', 'dont_know_movies', 'other'] as const

type SearchSessionExitFeedback = (typeof searchSessionExitFeedback)[number]

export interface SearchSession {
  uuid: string
  public: SearchSessionPublics | null
  genres: string[]
  tconst_chosen: string | null
  exit_feedback: SearchSessionExitFeedback | null
  exit_feedback_note: string | null
}
