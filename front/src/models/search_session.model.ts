
type SearchSessionPublics = 'alone' | 'date' | 'partner' | 'kids' | 'friends' | 'family';

interface SearchSession {
  uuid: string,
  public: SearchSessionPublics | null,
  genres: string[],
  tconst_chosen: string | null
}

export { type SearchSession };
