import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it } from 'vitest'
import { App } from '../../app/App'
import { expectNoA11yViolations } from '../../test/axe'

describe('map and panel accessibility', () => {
  it('has no detectable violations on first render', async () => {
    const { container } = render(<App />)

    await expectNoA11yViolations(container)
  })

  it('has no detectable violations with a country panel open', async () => {
    const { container } = render(<App />)

    await userEvent.click(
      screen.getAllByRole('button', { name: 'Ver población de Brasil' })[0],
    )

    await expectNoA11yViolations(container)
  })
})
