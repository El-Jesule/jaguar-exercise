import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { CuriositiesSection } from './CuriositiesSection'

describe('CuriositiesSection', () => {
  it('renders at least eight curiosities', () => {
    render(
      <CuriositiesSection
        curiosities={atlasContent.curiosities}
        sources={atlasContent.sources}
      />,
    )

    const region = screen.getByRole('region', { name: 'Curiosidades del jaguar' })
    const cards = within(region).getAllByRole('article')

    expect(cards.length).toBeGreaterThanOrEqual(8)
    expect(cards.length).toBe(atlasContent.curiosities.length)
  })

  it('gives every curiosity a reachable source link', () => {
    render(
      <CuriositiesSection
        curiosities={atlasContent.curiosities}
        sources={atlasContent.sources}
      />,
    )

    for (const curiosity of atlasContent.curiosities) {
      const heading = screen.getByRole('heading', { level: 3, name: curiosity.title })
      const card = heading.closest('article')

      expect(card).not.toBeNull()

      const links = within(card as HTMLElement).getAllByRole('link')

      expect(links.length).toBeGreaterThan(0)

      for (const link of links) {
        expect(link.getAttribute('href')).toMatch(/^https:\/\//)
      }
    }
  })

  it('uses unique curiosity titles', () => {
    const titles = atlasContent.curiosities.map((curiosity) => curiosity.title)

    expect(new Set(titles).size).toBe(titles.length)
  })
})
