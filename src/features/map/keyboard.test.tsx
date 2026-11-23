import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { atlasContent } from '../../content'
import { getResidentCountries } from '../../domain/selectors'
import { JaguarMap } from './JaguarMap'

const residents = getResidentCountries(atlasContent.countries)

function renderMap(
  overrides: { selectedId?: 'br' | null; onSelect?: () => void; onClear?: () => void } = {},
) {
  const onSelect = vi.fn()
  const onClear = vi.fn()

  render(
    <JaguarMap
      countries={residents}
      selectedId={overrides.selectedId ?? null}
      onSelect={overrides.onSelect ? () => undefined : onSelect}
      onClear={overrides.onClear ? () => undefined : onClear}
    />,
  )

  return { onSelect, onClear }
}

describe('JaguarMap keyboard behaviour', () => {
  it('puts every country in the tab order', () => {
    renderMap()

    for (const button of screen.getAllByRole('button', { name: /^Ver población de / })) {
      expect(button).toHaveAttribute('tabindex', '0')
    }
  })

  it('selects with Enter', () => {
    const { onSelect } = renderMap()
    const brasil = screen.getByRole('button', { name: 'Ver población de Brasil' })

    brasil.focus()
    fireEvent.keyDown(brasil, { key: 'Enter' })

    expect(onSelect).toHaveBeenCalledWith('br')
  })

  it('selects with Space without scrolling the page', () => {
    const { onSelect } = renderMap()
    const peru = screen.getByRole('button', { name: 'Ver población de Perú' })

    peru.focus()
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
    const prevented = !peru.dispatchEvent(event)

    expect(onSelect).toHaveBeenCalledWith('pe')
    expect(prevented).toBe(true)
  })

  it('clears the selection with Escape', () => {
    const { onClear } = renderMap({ selectedId: 'br' })
    const brasil = screen.getByRole('button', { name: 'Ver población de Brasil' })

    brasil.focus()
    fireEvent.keyDown(brasil, { key: 'Escape' })

    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('keeps focus on the control after Escape', () => {
    renderMap({ selectedId: 'br' })
    const brasil = screen.getByRole('button', { name: 'Ver población de Brasil' })

    brasil.focus()
    fireEvent.keyDown(brasil, { key: 'Escape' })

    expect(document.activeElement).toBe(brasil)
  })
})
