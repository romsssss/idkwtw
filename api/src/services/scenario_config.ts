export interface ScenarioFilters {
  excludeGenres: string[]
  maxRuntimeMinutes: number | null
}

export const scenarioConfig: Record<string, ScenarioFilters> = {
  alone: { excludeGenres: [], maxRuntimeMinutes: null },
  date: { excludeGenres: ['Horror', 'War', 'Documentary'], maxRuntimeMinutes: 150 },
  partner: { excludeGenres: [], maxRuntimeMinutes: null },
  kids: { excludeGenres: ['Horror', 'Crime', 'Thriller', 'War', 'Western'], maxRuntimeMinutes: 120 },
  friends: { excludeGenres: ['Documentary', 'Romance', 'Biography'], maxRuntimeMinutes: null },
  family: { excludeGenres: ['Horror', 'Crime', 'Thriller', 'War'], maxRuntimeMinutes: 150 },
}
