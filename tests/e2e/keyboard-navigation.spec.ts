import { expect, test } from '@playwright/test'

test('every country is reachable and activatable with the keyboard', async ({ page }) => {
  await page.goto('/')

  const map = page.getByRole('group', { name: 'Países con presencia de jaguar en América' })
  const controls = map.getByRole('button')

  await expect(controls).toHaveCount(18)

  for (let index = 0; index < 18; index += 1) {
    const control = controls.nth(index)
    const label = await control.getAttribute('aria-label')
    const countryName = (label ?? '').replace('Ver población de ', '')

    await control.focus()
    await expect(control).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(
      page.getByRole('region', { name: `Población de jaguares en ${countryName}` }),
    ).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('region', { name: 'Población de jaguares por país' })).toBeVisible()
  }
})

test('shows a visible focus indicator on the map', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  let guard = 0

  while (guard < 20) {
    const label = await page.evaluate(
      () => document.activeElement?.getAttribute('aria-label') ?? '',
    )

    if (label.startsWith('Ver población de')) {
      break
    }

    await page.keyboard.press('Tab')
    guard += 1
  }

  const strokeWidth = await page.evaluate(() => {
    const active = document.activeElement
    const path = active?.querySelector('path')
    return path ? getComputedStyle(path).strokeWidth : '0px'
  })

  expect(strokeWidth).toBe('3px')
})
