import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { HuntingSection } from './HuntingSection'

function renderSection() {
  render(
    <HuntingSection
      hunting={atlasContent.hunting}
      prey={atlasContent.prey}
      sources={atlasContent.sources}
    />,
  )
}

describe('HuntingSection', () => {
  it('explains ambush, the skull bite, aquatic hunting, and activity periods', () => {
    renderSection()

    expect(screen.getByRole('heading', { level: 3, name: 'Emboscada y acecho' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'La mordida en el cráneo' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'Caza en el agua' })).toBeVisible()
    expect(screen.getByRole('heading', { level: 3, name: 'Crepúsculo y noche' })).toBeVisible()
    expect(screen.getByText(/Un depredador de emboscada/)).toBeVisible()
  })

  it('lists at least five habitual prey items with a source', () => {
    renderSection()

    const region = screen.getByRole('region', { name: 'Cómo caza el jaguar' })
    const preyItems = within(region).getAllByText(/Mamífero|Reptil|Pez|Ave|Ganado/)

    expect(preyItems.length).toBeGreaterThanOrEqual(5)
    expect(screen.getByRole('heading', { level: 3, name: 'Presas habituales' })).toBeVisible()
  })

  it('cites a source for the hunting method', () => {
    renderSection()

    const introLink = screen.getAllByRole('link', { name: 'Panthera' })[0]

    expect(introLink?.getAttribute('href')).toMatch(/^https:\/\//)
  })
})
