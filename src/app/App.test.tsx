import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('renders the map, the panel, and the sources in reading order', () => {
    render(<App />)

    const names = screen.getAllByRole('region').map((region) => region.getAttribute('aria-labelledby'))
    expect(names.length).toBeGreaterThan(0)

    const map = screen.getByRole('region', { name: 'Mapa del hábitat del jaguar' })
    const panel = screen.getByRole('region', { name: 'Población de jaguares por país' })
    const sources = screen.getByRole('region', { name: 'Fuentes' })

    expect(map.compareDocumentPosition(panel) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(panel.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('opens the panel when a country is chosen from the list', async () => {
    render(<App />)

    const southAmerica = screen.getByRole('region', { name: 'Sudamérica' })
    await userEvent.click(within(southAmerica).getByRole('button', { name: 'Ver población de Brasil' }))

    expect(
      screen.getByRole('heading', { level: 2, name: 'Población de jaguares en Brasil' }),
    ).toBeInTheDocument()
    expect(
      within(southAmerica).getByRole('button', { name: 'Ver población de Brasil' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('replaces the panel content when a different country is chosen', async () => {
    render(<App />)

    await userEvent.click(screen.getAllByRole('button', { name: 'Ver población de Brasil' })[0])
    await userEvent.click(screen.getAllByRole('button', { name: 'Ver población de Perú' })[0])

    expect(
      screen.getByRole('heading', { level: 2, name: 'Población de jaguares en Perú' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Población de jaguares en Brasil' }),
    ).not.toBeInTheDocument()
  })

  it('returns to the invitation and keeps focus when Escape is pressed', async () => {
    render(<App />)

    const controls = screen.getAllByRole('button', { name: 'Ver población de Brasil' })
    const mapControl = controls[0]
    mapControl.focus()
    await userEvent.keyboard('{Enter}')
    expect(
      screen.getByRole('heading', { level: 2, name: 'Población de jaguares en Brasil' }),
    ).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')

    expect(
      screen.getByRole('region', { name: 'Población de jaguares por país' }),
    ).toBeInTheDocument()
    expect(document.activeElement).toBe(mapControl)
  })

  it('shows a hint for keyboard users', () => {
    render(<App />)

    expect(screen.getByText(/Pulsa Escape para cerrar la ficha/)).toBeInTheDocument()
  })
})
