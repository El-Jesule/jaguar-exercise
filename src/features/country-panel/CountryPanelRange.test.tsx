import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import type { RangeCountry } from '../../domain/types'
import { CountryPanel } from './CountryPanel'

const ranged: RangeCountry = {
  id: 'ar',
  name: 'Argentina',
  subregion: 'south-america',
  rangeStatus: 'resident',
  estimate: {
    kind: 'range',
    min: 200,
    max: 300,
    referenceYear: 2021,
    sourceIds: ['panthera-jaguar'],
    scopeNote: 'Rango publicado para las yungas y Misiones.',
  },
  trend: 'unknown',
  habitatIds: ['rainforest'],
  conservationNote: 'Nota de conservación de prueba.',
  sourceIds: ['panthera-jaguar'],
}

describe('CountryPanel with a range estimate', () => {
  it('renders the minimum, maximum, year, and source', () => {
    render(
      <CountryPanel
        selected={ranged}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText('Entre 200 y 300 jaguares')).toBeInTheDocument()
    expect(screen.getByText('Estimación de 2021')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Panthera' })).toBeInTheDocument()
  })

  it('renders the scope note for the range', () => {
    render(
      <CountryPanel
        selected={ranged}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText(/Rango publicado para las yungas/)).toBeInTheDocument()
  })
})
