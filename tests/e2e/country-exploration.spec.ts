import { expect, test } from '@playwright/test'

test('selects a country and reads its sourced population panel', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Ver población de México' }).first().click()

  const panel = page.getByRole('region', { name: 'Población de jaguares en México' })

  await expect(panel).toBeVisible()
  await expect(panel.getByText('4.800 jaguares')).toBeVisible()
  await expect(panel.getByText('Estimación de 2018')).toBeVisible()
  await expect(panel.getByRole('link', { name: /CONANP/ })).toBeVisible()
})

test('shows an explicit no-estimate state instead of a number', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Ver población de Brasil' }).first().click()

  const panel = page.getByRole('region', { name: 'Población de jaguares en Brasil' })

  await expect(panel.getByText('Sin estimación publicada')).toBeVisible()
  await expect(panel.getByText('Tendencia: En descenso')).toBeVisible()
  await expect(panel.getByText(/Selva tropical húmeda/)).toBeVisible()
})

test('offers all 18 range countries in the country list', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('region', { name: 'Norteamérica' }).getByRole('button')).toHaveCount(1)
  await expect(page.getByRole('region', { name: 'Centroamérica' }).getByRole('button')).toHaveCount(
    6,
  )
  await expect(page.getByRole('region', { name: 'Sudamérica' }).getByRole('button')).toHaveCount(11)
})
