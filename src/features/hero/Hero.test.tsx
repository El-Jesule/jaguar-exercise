import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('states that the jaguar is the best feline on the planet in the main heading', () => {
    render(<Hero />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /el mejor felino del planeta/i,
    )
  })

  it('presents the claim as an editorial statement', () => {
    render(<Hero />)

    expect(screen.getByText(/Afirmación editorial del sitio/)).toBeInTheDocument()
  })
})
