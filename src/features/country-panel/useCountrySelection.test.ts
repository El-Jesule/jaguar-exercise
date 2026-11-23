import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCountrySelection } from './use-country-selection'

describe('useCountrySelection', () => {
  it('starts empty by default', () => {
    const { result } = renderHook(() => useCountrySelection())

    expect(result.current.selectedId).toBeNull()
  })

  it('accepts an initial id', () => {
    const { result } = renderHook(() => useCountrySelection('br'))

    expect(result.current.selectedId).toBe('br')
  })

  it('replaces the selection with a different country', () => {
    const { result } = renderHook(() => useCountrySelection())

    act(() => {
      result.current.select('br')
    })
    act(() => {
      result.current.select('pe')
    })

    expect(result.current.selectedId).toBe('pe')
  })

  it('is idempotent when the same country is selected twice', () => {
    const { result } = renderHook(() => useCountrySelection())
    let renders = 0

    act(() => {
      renders += 1
      result.current.select('br')
    })
    const afterFirst = result.current

    act(() => {
      renders += 1
      result.current.select('br')
    })

    expect(renders).toBe(2)
    expect(result.current.selectedId).toBe('br')
    expect(afterFirst.select).toBe(result.current.select)
  })

  it('clears the selection', () => {
    const { result } = renderHook(() => useCountrySelection('br'))

    act(() => {
      result.current.clear()
    })

    expect(result.current.selectedId).toBeNull()
  })
})
