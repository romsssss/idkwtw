import type { Page } from '@playwright/test'

export function buildSearchSession(overrides?: Record<string, unknown>) {
  return {
    uuid: 'ss-uuid-1',
    public: null,
    genres: [],
    tconst_chosen: null,
    ...overrides
  }
}

export function buildProposal(overrides?: Record<string, unknown>) {
  return {
    uuid: 'proposal-uuid-1',
    search_session_uuid: 'ss-uuid-1',
    tconst: 'tt0000001',
    accepted: null,
    rejected_feedback: null,
    already_seen: null,
    already_seen_feedback: null,
    ...overrides
  }
}

export function buildTitle(overrides?: Record<string, unknown>) {
  return {
    tconst: 'tt0000001',
    title_type: 'movie',
    primary_title: 'Test Movie',
    original_title: 'Test Movie',
    is_adult: false,
    start_year: 2023,
    end_year: null,
    runtime_minutes: 120,
    genres: ['Comedy', 'Action'],
    average_rating: 7.5,
    num_votes: 10000,
    video: {
      uuid: 'video-uuid-1',
      name: 'Trailer',
      type: 'Trailer',
      site: 'youtube',
      key: 'dQw4w9WgXcQ',
      size: 1080,
      official: true,
      iso_639_1: 'en',
      iso_3166_1: 'US',
      published_at: '2023-01-01T00:00:00.000Z'
    },
    ...overrides
  }
}

interface SetupApiMocksOptions {
  searchSession: ReturnType<typeof buildSearchSession>
  proposals: ReturnType<typeof buildProposal>[]
  /** Queue for POST /proposals responses. Defaults to `proposals` if not provided. */
  proposalQueue?: ReturnType<typeof buildProposal>[]
  titles: ReturnType<typeof buildTitle>[]
}

export async function setupApiMocks(page: Page, options: SetupApiMocksOptions) {
  const { searchSession, proposals, titles } = options
  const postQueue = options.proposalQueue ?? proposals
  let proposalIndex = 0

  const isPageNavigation = (route: { request: () => { resourceType: () => string } }) =>
    route.request().resourceType() === 'document'

  // POST /search_sessions
  await page.route('**/search_sessions', (route) => {
    if (isPageNavigation(route)) return route.continue()
    if (route.request().method() === 'POST') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchSession)
      })
    }
    return route.continue()
  })

  // GET/PUT /search_sessions/:uuid
  await page.route('**/search_sessions/*', (route) => {
    if (isPageNavigation(route)) return route.continue()
    const method = route.request().method()
    if (method === 'GET') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchSession)
      })
    }
    if (method === 'PUT') {
      const body = route.request().postDataJSON()
      Object.assign(searchSession, body)
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(searchSession)
      })
    }
    return route.continue()
  })

  // POST /proposals
  await page.route('**/proposals?**', (route) => {
    if (isPageNavigation(route)) return route.continue()
    if (route.request().method() === 'POST') {
      const proposal = postQueue[proposalIndex]
      if (proposalIndex < postQueue.length - 1) {
        proposalIndex++
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(proposal)
      })
    }
    return route.continue()
  })

  // GET/PUT /proposals/:uuid
  await page.route('**/proposals/*', (route) => {
    if (isPageNavigation(route)) return route.continue()
    const method = route.request().method()
    const url = route.request().url()

    // Skip if this is the POST with query params (handled by earlier route)
    if (url.includes('?')) return route.fallback()

    const matchedProposal = proposals.find((p) => url.includes(p.uuid))
    if (!matchedProposal) return route.fallback()

    if (method === 'GET') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(matchedProposal)
      })
    }
    if (method === 'PUT') {
      const body = route.request().postDataJSON()
      Object.assign(matchedProposal, body)
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(matchedProposal)
      })
    }
    return route.continue()
  })

  // GET /titles/:tconst
  await page.route('**/titles/*', (route) => {
    if (isPageNavigation(route)) return route.continue()
    const url = route.request().url()
    const matchedTitle = titles.find((t) => url.includes(t.tconst))
    if (matchedTitle) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(matchedTitle)
      })
    }
    return route.continue()
  })
}
