interface Video {
  uuid: string
  name: string
  type: string
  site: string
  key: string
  size: number
  official: boolean
  iso_639_1: string
  iso_3166_1: string
  published_at: string
}

export interface Title {
  tconst: string
  title_type: string
  primary_title: string
  original_title: string
  is_adult: boolean
  start_year: number
  end_year: number
  runtime_minutes: number
  genres: string[]
  average_rating: number
  num_votes: number
  video: Video
}
