import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { SourcesSection } from './SourcesSection'

describe('SourcesSection', () => {
  it('lists every registered source with publisher, year, and access date', () => {
    render(<SourcesSection sources={atlasContent.sources} />)

    expect(screen.getByRole('region', { name: 'Fuentes' })).toBeInTheDocument()

    for (const source of atlasContent.sources) {
      expect(screen.getByRole('link', { name: source.title })).toBeInTheDocument()
      expect(screen.getByText(new RegExp(source.publisher.replace(/[()]/g, '.')))).toBeInTheDocument()
    }

    expect(screen.getAllByText(/consultado el 23\/11\/2026/)).toHaveLength(
      atlasContent.sources.length,
    )
  })

  it('links every source over https', () => {
    render(<SourcesSection sources={atlasContent.sources} />)

    for (const source of atlasContent.sources) {
      expect(screen.getByRole('link', { name: source.title })).toHaveAttribute('href', source.url)
    }
  })
})
