import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Section } from './Section'

describe('Section', () => {
  it('renders an accessible region named by its heading', () => {
    render(
      <Section id="fuentes" title="Fuentes">
        <p>Contenido</p>
      </Section>,
    )

    expect(screen.getByRole('region', { name: 'Fuentes' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Fuentes' })).toBeInTheDocument()
  })

  it('renders the optional description', () => {
    render(
      <Section id="caza" title="Cómo caza" description="Técnicas de emboscada">
        <p>Contenido</p>
      </Section>,
    )

    expect(screen.getByText('Técnicas de emboscada')).toBeInTheDocument()
  })
})
