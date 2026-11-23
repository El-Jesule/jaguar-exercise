import { expect, test } from '@playwright/test'

test('shows at least eight sourced curiosities', async ({ page }) => {
  await page.goto('/')

  const region = page.getByRole('region', { name: 'Curiosidades del jaguar' })
  const cards = region.getByRole('article')

  expect(await cards.count()).toBeGreaterThanOrEqual(8)

  for (let index = 0; index < (await cards.count()); index += 1) {
    const links = cards.nth(index).getByRole('link')

    expect(await links.count()).toBeGreaterThan(0)

    for (let linkIndex = 0; linkIndex < (await links.count()); linkIndex += 1) {
      await expect(links.nth(linkIndex)).toHaveAttribute('href', /^https:\/\//)
    }
  }
})

test('shows six credited photographs with descriptive alt text', async ({ page }) => {
  await page.goto('/')

  const region = page.getByRole('region', { name: 'Galería de fotos' })
  const images = region.getByRole('img')

  expect(await images.count()).toBeGreaterThanOrEqual(6)

  for (let index = 0; index < (await images.count()); index += 1) {
    const alt = await images.nth(index).getAttribute('alt')

    expect(alt?.length ?? 0).toBeGreaterThanOrEqual(20)
  }

  await expect(region.getByRole('link', { name: /CC BY-SA/ }).first()).toHaveAttribute(
    'href',
    /^https:\/\//,
  )
})

test('explains the hunting method and lists at least five prey items', async ({ page }) => {
  await page.goto('/')

  const region = page.getByRole('region', { name: 'Cómo caza el jaguar' })

  await expect(region.getByRole('heading', { name: 'Emboscada y acecho' })).toBeVisible()
  await expect(region.getByRole('heading', { name: 'La mordida en el cráneo' })).toBeVisible()
  await expect(region.getByRole('heading', { name: 'Caza en el agua' })).toBeVisible()
  await expect(region.getByRole('heading', { name: 'Presas habituales' })).toBeVisible()
  expect(await region.getByRole('listitem').count()).toBeGreaterThanOrEqual(5)
})

test('keeps the editorial claim visible without interaction', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'mejor felino del planeta',
  )
})
