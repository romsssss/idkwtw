import { test, expect } from '@playwright/test'
import {
  buildSearchSession,
  buildProposal,
  buildTitle,
  setupApiMocks
} from './fixtures/api-mocks'

test.describe('Proposal actions', () => {
  const searchSession = buildSearchSession()
  const proposal1 = buildProposal()
  const proposal2 = buildProposal({
    uuid: 'proposal-uuid-2',
    tconst: 'tt0000002'
  })
  const title1 = buildTitle()
  const title2 = buildTitle({
    tconst: 'tt0000002',
    primary_title: 'Another Movie',
    start_year: 2020,
    genres: ['Drama', 'Thriller']
  })

  test('"Watch now" accepts and navigates to IMDb', async ({ page }) => {
    const ss = { ...searchSession }
    const p1 = { ...proposal1 }
    const t1 = { ...title1 }

    await setupApiMocks(page, {
      searchSession: ss,
      proposals: [p1],
      titles: [t1]
    })

    // Intercept IMDb navigation to prevent leaving the page
    await page.route('**/imdb.com/**', (route) => route.abort())

    await page.goto(`/proposals/${p1.uuid}`)
    await expect(page.getByText(t1.primary_title)).toBeVisible()

    const imdbRequest = page.waitForRequest((r) => r.url().includes('imdb.com'))
    await page.getByRole('button', { name: 'Watch now' }).click()
    await imdbRequest
  })

  test('"Skip" shows feedback then creates new proposal', async ({ page }) => {
    const ss = { ...searchSession }
    const p1 = { ...proposal1, accepted: null as boolean | null }
    const p2 = { ...proposal2 }
    const t1 = { ...title1 }
    const t2 = { ...title2 }

    await setupApiMocks(page, {
      searchSession: ss,
      proposals: [p1, p2],
      proposalQueue: [p2],
      titles: [t1, t2]
    })

    await page.goto(`/proposals/${p1.uuid}`)
    await expect(page.getByText(t1.primary_title)).toBeVisible()

    // Click Skip
    await page.getByRole('button', { name: 'Skip' }).click()

    // Verify feedback buttons appear
    await expect(page.getByRole('button', { name: 'Too long' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Too old' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Too violent' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Too scary' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Just skip' })).toBeVisible()

    // Click "Too long"
    await page.getByRole('button', { name: 'Too long' }).click()

    // New proposal loads
    await page.waitForURL(`**/proposals/${p2.uuid}`)
    await expect(page.getByText(t2.primary_title)).toBeVisible()
  })

  test('"Seen it already" shows feedback then creates new proposal', async ({ page }) => {
    const ss = { ...searchSession }
    const p1 = { ...proposal1, accepted: null as boolean | null, already_seen: null as boolean | null }
    const p2 = { ...proposal2 }
    const t1 = { ...title1 }
    const t2 = { ...title2 }

    await setupApiMocks(page, {
      searchSession: ss,
      proposals: [p1, p2],
      proposalQueue: [p2],
      titles: [t1, t2]
    })

    await page.goto(`/proposals/${p1.uuid}`)
    await expect(page.getByText(t1.primary_title)).toBeVisible()

    // Click "Seen it already"
    await page.getByRole('button', { name: 'Seen it already' }).click()

    // Verify already-seen feedback buttons appear
    await expect(page.getByRole('button', { name: 'Liked it' })).toBeVisible()
    await expect(page.getByRole('button', { name: "Dind't like it" })).toBeVisible()
    await expect(page.getByRole('button', { name: "Don't remember" })).toBeVisible()

    // Click "Liked it"
    await page.getByRole('button', { name: 'Liked it' }).click()

    // New proposal loads
    await page.waitForURL(`**/proposals/${p2.uuid}`)
    await expect(page.getByText(t2.primary_title)).toBeVisible()
  })
})
