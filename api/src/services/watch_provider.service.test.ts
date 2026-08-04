import WatchProviderService from './watch_provider.service'

const tmdbResponse = {
  id: 335984,
  poster_path: '/poster.jpg',
  overview: 'A young Blade Runner unearths a long-buried secret.',
  'watch/providers': {
    results: {
      FR: {
        link: 'https://www.themoviedb.org/movie/335984/watch?locale=FR',
        flatrate: [
          { logo_path: '/netflix.jpg', provider_id: 8, provider_name: 'Netflix', display_priority: 2 }
        ],
        rent: [
          { logo_path: '/apple.jpg', provider_id: 2, provider_name: 'Apple TV', display_priority: 5 },
          { logo_path: '/google.jpg', provider_id: 3, provider_name: 'Google Play', display_priority: 1 }
        ]
      }
    }
  }
}

describe('#perform', () => {
  describe('when providers are found for the region', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve(tmdbResponse) })
      ) as unknown as typeof fetch;
      (global.fetch as jest.Mock).mockClear()
    })

    test('returns success true', async () => {
      const res = await new WatchProviderService('tt1856101', 'FR').perform()
      expect(res.success).toBe(true)
    })

    test('returns the poster URL and overview', async () => {
      const res = await new WatchProviderService('tt1856101', 'FR').perform()
      if (!res.success) throw new Error('Expected success')
      expect(res.body.poster_url).toBe('https://image.tmdb.org/t/p/w500/poster.jpg')
      expect(res.body.overview).toBe('A young Blade Runner unearths a long-buried secret.')
    })

    test('normalizes providers with full logo URLs, sorted by display priority', async () => {
      const res = await new WatchProviderService('tt1856101', 'FR').perform()
      if (!res.success) throw new Error('Expected success')

      expect(res.body.region).toBe('FR')
      expect(res.body.link).toBe(tmdbResponse['watch/providers'].results.FR.link)
      expect(res.body.flatrate).toEqual([
        { provider_id: 8, provider_name: 'Netflix', logo_url: 'https://image.tmdb.org/t/p/w92/netflix.jpg' }
      ])
      expect(res.body.rent.map(p => p.provider_name)).toEqual(['Google Play', 'Apple TV'])
    })

    test('uppercases the region code', async () => {
      const res = await new WatchProviderService('tt1856101', 'fr').perform()
      if (!res.success) throw new Error('Expected success')
      expect(res.body.region).toBe('FR')
    })
  })

  describe('when the region has no providers', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve(tmdbResponse) })
      ) as unknown as typeof fetch;
      (global.fetch as jest.Mock).mockClear()
    })

    test('returns success with the poster, empty arrays and a null link', async () => {
      const res = await new WatchProviderService('tt1856101', 'JP').perform()
      if (!res.success) throw new Error('Expected success')

      expect(res.body).toEqual({
        region: 'JP',
        poster_url: 'https://image.tmdb.org/t/p/w500/poster.jpg',
        overview: 'A young Blade Runner unearths a long-buried secret.',
        link: null,
        flatrate: [],
        rent: [],
        buy: []
      })
    })
  })

  describe('when The Movie DB rejects the request', () => {
    beforeEach(() => {
      // TMDB returns an error object with no `id` for bad keys / unknown movies.
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve({ success: false, status_code: 7, status_message: 'Invalid API key' }) })
      ) as unknown as typeof fetch;
      (global.fetch as jest.Mock).mockClear()
    })

    test('returns success false', async () => {
      const res = await new WatchProviderService('tt1856101', 'FR').perform()
      expect(res.success).toBe(false)
      if (res.success) throw new Error('Expected failure')
      expect(res.error.message).toEqual('The Movie DB lookup failed')
    })
  })

  describe('when the request to The Movie DB throws', () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.reject(new Error('network down'))) as unknown as typeof fetch;
      (global.fetch as jest.Mock).mockClear()
    })

    test('returns success false with the error', async () => {
      const res = await new WatchProviderService('tt1856101', 'FR').perform()

      expect(res.success).toBe(false)
      if (res.success) throw new Error('Expected failure')
      expect(res.error.message).toEqual('network down')
    })
  })
})
