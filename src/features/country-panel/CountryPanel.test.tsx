import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { getCountry } from '../../domain/selectors'
import { CountryPanel } from './CountryPanel'

const brasil = getCountry(atlasContent.countries, 'br')

describe('CountryPanel', () => {
  it('invites the visitor to choose a country when nothing is selected', () => {
    render(
      <CountryPanel selected={null} habitats={atlasContent.habitats} sources={atlasContent.sources} />,
    )

    expect(
      screen.getByRole('region', { name: 'Población de jaguares por país' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Elige un país/)).toBeInTheDocument()
  })

  it('shows the selected country name in the panel heading', () => {
    render(
      <CountryPanel
        selected={brasil}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Población de jaguares en Brasil' }),
    ).toBeInTheDocument()
  })

  it('shows habitats, conservation note, and sources for the country', () => {
    render(
      <CountryPanel
        selected={brasil}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByRole('heading', { level: 3, name: 'Hábitats' })).toBeInTheDocument()
    expect(screen.getByText(/Selva tropical húmeda/)).toBeInTheDocument()
    expect(screen.getByText(/Brasil reúne la mayor superficie/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Fuentes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Panthera' })).toBeInTheDocument()
  })

  it('shows the trend as text, not colour only', () => {
    render(
      <CountryPanel
        selected={brasil}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText(/Tendencia: En descenso/)).toBeInTheDocument()
  })

  it('does not repeat the figure outside the estimate block', () => {
    const mexico = getCountry(atlasContent.countries, 'mx')

    render(
      <CountryPanel
        selected={mexico}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getAllByText(/4\.800/)).toHaveLength(1)
  })
})
