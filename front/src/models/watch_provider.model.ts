export interface WatchProvider {
  provider_id: number
  provider_name: string
  logo_url: string
}

export interface WatchProviders {
  region: string
  poster_url: string | null
  overview: string | null
  link: string | null
  flatrate: WatchProvider[]
  rent: WatchProvider[]
  buy: WatchProvider[]
}

// One entry per title in the store: `data` is null until loaded, `error` is
// set when the lookup failed (network/TMDB down) so the view can fall back.
export interface WatchProvidersEntry {
  tconst: string
  data: WatchProviders | null
  error: boolean
}
