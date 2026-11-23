import { axe } from 'jest-axe'
import { expect } from 'vitest'

export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await axe(container)

  expect(results.violations.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([])
}
