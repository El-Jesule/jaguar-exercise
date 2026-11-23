import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { atlasContent } from '../../content'
import { getResidentCountries } from '../../domain/selectors'
import { JaguarMap } from './JaguarMap'

const residents = getResidentCountries(atlasContent.countries)

describe('JaguarMap', () => {
  it('renders all 18 range countries as selectable controls', () => {
    render(
      <JaguarMap countries={residents} selectedId={null} onSelect={vi.fn()} onClear={vi.fn()} />,
    )

    const controls = screen.getAllByRole('button', { name: /^Ver población de / })

    expect(controls).toHaveLength(18)
    expect(screen.getByRole('button', { name: 'Ver población de Brasil' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver población de Argentina' })).toBeInTheDocument()
  })

  it('exposes the map as a labelled group', () => {
    render(
      <JaguarMap countries={residents} selectedId={null} onSelect={vi.fn()} onClear={vi.fn()} />,
    )

    expect(
      screen.getByRole('group', { name: 'Países con presencia de jaguar en América' }),
    ).toBeInTheDocument()
  })

  it('marks only the selected country as pressed', () => {
    render(
      <JaguarMap countries={residents} selectedId="br" onSelect={vi.fn()} onClear={vi.fn()} />,
    )

    expect(screen.getByRole('button', { name: 'Ver población de Brasil' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Ver población de Perú' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('calls onSelect when a country is clicked', async () => {
    const onSelect = vi.fn()
    render(
      <JaguarMap countries={residents} selectedId={null} onSelect={onSelect} onClear={vi.fn()} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Ver población de Colombia' }))

    expect(onSelect).toHaveBeenCalledWith('co')
  })
})
