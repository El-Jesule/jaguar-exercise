import { expect, test } from '@playwright/test'

test('uses no horizontal scrolling at 360 pixels wide', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 })
  await page.goto('/')

  const overflow = await page.evaluate(() => {
    const root = document.documentElement
    return { scrollWidth: root.scrollWidth, clientWidth: root.clientWidth }
  })

  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth)

  for (const name of [
    'Mapa del hábitat del jaguar',
    'Curiosidades del jaguar',
    'Cómo caza el jaguar',
    'Galería de fotos',
    'Fuentes',
  ]) {
    await expect(page.getByRole('region', { name })).toBeVisible()
  }
})

test('reduces motion when the visitor asks for it', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  const duration = await page.evaluate(() => {
    const path = document.querySelector('svg path')

    return path ? getComputedStyle(path).transitionDuration : ''
  })

  expect(duration).not.toBe('')
  expect(Number.parseFloat(duration)).toBeLessThan(1)
})

test('loads the first view without layout shifts from images', async ({ page }) => {
  await page.goto('/')

  const firstImage = page.getByRole('region', { name: 'Galería de fotos' }).getByRole('img').first()

  await firstImage.scrollIntoViewIfNeeded()

  const box = await firstImage.boundingBox()

  expect(box).not.toBeNull()
  expect(box?.width ?? 0).toBeGreaterThan(0)
  expect(box?.height ?? 0).toBeGreaterThan(0)
})
