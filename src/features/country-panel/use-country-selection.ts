import { useCallback, useState } from 'react'
import type { CountryId } from '../../domain/types'

export interface CountrySelection {
  readonly selectedId: CountryId | null
  readonly select: (id: CountryId) => void
  readonly clear: () => void
}

export function useCountrySelection(initialId: CountryId | null = null): CountrySelection {
  const [selectedId, setSelectedId] = useState<CountryId | null>(initialId)

  const select = useCallback((id: CountryId) => {
    setSelectedId((current) => (current === id ? current : id))
  }, [])

  const clear = useCallback(() => {
    setSelectedId(null)
  }, [])

  return { selectedId, select, clear }
}
