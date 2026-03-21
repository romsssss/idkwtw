import { test, expect } from '@playwright/test'
import {
  buildSearchSession,
  buildProposal,
  buildTitle,
  setupApiMocks
} from './fixtures/api-mocks'

test('full user flow: home → quiz → proposal → skip → new proposal', async ({ page }) => {
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

  await setupApiMocks(page, {
    searchSession,
    proposals: [proposal1, proposal2],
    titles: [title1, title2]
  })

  await test.step('Home page — click CTA', async () => {
    await page.goto('/')
    await expect(page.locator('main h1')).toHaveText("I Don't Know What To Watch")
    await page.getByRole('link', { name: 'Find a movie' }).click()
    await page.waitForURL(`**/search_sessions/${searchSession.uuid}`)
  })

  await test.step('Scenario step — select "With friends" and click Next', async () => {
    await expect(page.getByText('Who are you watching with ?')).toBeVisible()
    const options = page.locator('input[name="public"]')
    await expect(options).toHaveCount(6)
    await page.getByText('With friends').click()
    await page.getByRole('link', { name: 'Next' }).click()
  })

  await test.step('Genres step — check Comedy and Action, start searching', async () => {
    await expect(page.getByText('What kind of film are you in ?')).toBeVisible()
    await page.getByText('Comedy').click()
    await page.getByText('Action').click()
    await page.getByRole('link', { name: 'Start searching' }).click()
    await page.waitForURL(`**/proposals/${proposal1.uuid}`)
  })

  await test.step('Proposal — verify movie info and click Skip', async () => {
    await expect(page.getByText(title1.primary_title)).toBeVisible()
    await expect(page.getByText(String(title1.start_year))).toBeVisible()
    await page.getByRole('button', { name: 'Skip' }).click()
  })

  await test.step('Rejection feedback — click "Too old"', async () => {
    await expect(page.getByRole('button', { name: 'Too old' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Too long' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Too violent' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Too scary' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Just skip' })).toBeVisible()
    await page.getByRole('button', { name: 'Too old' }).click()
  })

  await test.step('New proposal loads with different movie', async () => {
    await page.waitForURL(`**/proposals/${proposal2.uuid}`)
    await expect(page.getByText(title2.primary_title)).toBeVisible()
  })
})
