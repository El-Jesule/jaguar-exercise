import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExternalLink } from './ExternalLink'

describe('ExternalLink', () => {
  it('opens in a new tab without leaking the referrer or opener', () => {
    render(<ExternalLink href="https://www.iucnredlist.org">UICN</ExternalLink>)

    const link = screen.getByRole('link', { name: 'UICN' })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    expect(link).toHaveAttribute('href', 'https://www.iucnredlist.org')
  })

  it('uses an explicit accessible label when provided', () => {
    render(
      <ExternalLink href="https://example.org" label="Abrir ficha de la UICN">
        ficha
      </ExternalLink>,
    )

    expect(screen.getByRole('link', { name: 'Abrir ficha de la UICN' })).toBeInTheDocument()
  })
})
