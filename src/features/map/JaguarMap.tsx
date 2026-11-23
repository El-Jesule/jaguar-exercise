import type { CountryId, RangeCountry } from '../../domain/types'
import { CountryShape } from './CountryShape'
import { MAP_VIEWBOX, COUNTRY_SHAPES } from './country-paths'
import styles from './map.module.css'

export interface JaguarMapProps {
  readonly countries: readonly RangeCountry[]
  readonly selectedId: CountryId | null
  readonly onSelect: (id: CountryId) => void
  readonly onClear: () => void
}

export function JaguarMap({ countries, selectedId, onSelect, onClear }: JaguarMapProps) {
  return (
    <div>
      <svg
        className={styles.map}
        viewBox={MAP_VIEWBOX}
        role="group"
        aria-label="Países con presencia de jaguar en América"
      >
        {countries.map((country) => (
          <CountryShape
            key={country.id}
            country={country}
            paths={COUNTRY_SHAPES[country.id] ?? []}
            selected={selectedId === country.id}
            onSelect={onSelect}
            onClear={onClear}
          />
        ))}
      </svg>
      <p className={styles.hint}>
        Selecciona un país en el mapa o en la lista con el teclado (Tab y Enter). Pulsa Escape para
        cerrar la ficha.
      </p>
    </div>
  )
}
