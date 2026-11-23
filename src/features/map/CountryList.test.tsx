import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { atlasContent } from '../../content'
import { getResidentCountries } from '../../domain/selectors'
import { CountryList } from './country-list'

const residents = getResidentCountries(atlasContent.countries)

describe('CountryList', () => {
  it('lists the same 18 countries grouped by subregion', () => {
    render(
      <CountryList
        countries={residents}
        selectedId={null}
        onSelect={vi.fn()}
        onClear={vi.fn()}
      />,
    )

    expect(screen.getAllByRole('button', { name: /^Ver población de / })).toHaveLength(18)
    expect(screen.getByRole('heading', { level: 3, name: 'Norteamérica' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Centroamérica' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Sudamérica' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver población de Guayana Francesa' })).toBeVisible()
  })

  it('reflects the current selection with aria-pressed', () => {
    render(
      <CountryList
        countries={residents}
        selectedId="br"
        onSelect={vi.fn()}
        onClear={vi.fn()}
      />,
    )

    expect(screen.getByRole('button', { name: 'Ver población de Brasil' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('selects a country on click', async () => {
    const onSelect = vi.fn()
    render(
      <CountryList countries={residents} selectedId={null} onSelect={onSelect} onClear={vi.fn()} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Ver población de Paraguay' }))

    expect(onSelect).toHaveBeenCalledWith('py')
  })

  it('clears the selection with Escape from a list button', async () => {
    const onClear = vi.fn()
    render(
      <CountryList
        countries={residents}
        selectedId="py"
        onSelect={vi.fn()}
        onClear={onClear}
      />,
    )

    const paraguay = screen.getByRole('button', { name: 'Ver población de Paraguay' })
    paraguay.focus()
    await userEvent.keyboard('{Escape}')

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(document.activeElement).toBe(paraguay)
  })
})
