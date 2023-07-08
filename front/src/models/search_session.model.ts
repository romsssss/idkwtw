
export const searchSessionPublics = ['alone', 'date', 'partner', 'kids', 'friends', 'family'] as const;

type SearchSessionPublics = typeof searchSessionPublics[number];

export interface SearchSession {
  uuid: string,
  public: SearchSessionPublics | null,
  genres: string[],
  tconst_chosen: string | null
}
