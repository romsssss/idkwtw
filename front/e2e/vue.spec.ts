import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main > h1')).toHaveText("I Don't Know What To Watch");
})
