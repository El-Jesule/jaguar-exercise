import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { getCountry } from '../../domain/selectors'
import { CountryPanel } from './CountryPanel'

const mexico = getCountry(atlasContent.countries, 'mx')

describe('CountryPanel with a single-number estimate', () => {
  it('renders the figure, the year, and the source in the same visible block', () => {
    render(
      <CountryPanel
        selected={mexico}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText('4.800 jaguares')).toBeInTheDocument()
    expect(screen.getByText('Estimación de 2018')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /CONANP/ })).toBeInTheDocument()
    expect(screen.getByText(/Censo Nacional del Jaguar 2018/)).toBeInTheDocument()
  })

  it('shows the scope note that qualifies the figure', () => {
    render(
      <CountryPanel
        selected={mexico}
        habitats={atlasContent.habitats}
        sources={atlasContent.sources}
      />,
    )

    expect(screen.getByText(/Censo nacional coordinado por la CONANP/)).toBeInTheDocument()
  })
})
