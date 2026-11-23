import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { getCountry } from '../../domain/selectors'
import { CountryPanel } from './CountryPanel'

const guatemala = getCountry(atlasContent.countries, 'gt')

describe('CountryPanel without a published estimate', () => {
  it('states explicitly that no estimate is published', () => {
    render(
      <CountryPanel
        selected={guatemala}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText('Sin estimación publicada')).toBeInTheDocument()
  })

  it('never renders a zero or a placeholder figure', () => {
    render(
      <CountryPanel
        selected={guatemala}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.queryByText(/\b0 jaguares/)).not.toBeInTheDocument()
    expect(screen.queryByText(/^\s*(N\/A|--|-)\s*$/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Estimación de \d{4}/)).not.toBeInTheDocument()
  })

  it('explains why the estimate is missing and cites a source', () => {
    render(
      <CountryPanel
        selected={guatemala}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText(/No hay un censo nacional único publicado/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'WWF' })).toBeInTheDocument()
  })
})
