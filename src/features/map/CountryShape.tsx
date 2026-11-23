import type { CountryId, RangeCountry } from '../../domain/types'
import styles from './map.module.css'

export interface CountryShapeProps {
  readonly country: RangeCountry
  readonly paths: readonly string[]
  readonly selected: boolean
  readonly onSelect: (id: CountryId) => void
  readonly onClear: () => void
}

export function CountryShape({ country, paths, selected, onSelect, onClear }: CountryShapeProps) {
  const label = `Ver población de ${country.name}`

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={selected}
      aria-controls="panel-poblacion"
      className={selected ? styles.countrySelected : styles.country}
      onClick={() => {
        onSelect(country.id)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(country.id)
        }

        if (event.key === 'Escape') {
          event.preventDefault()
          onClear()
        }
      }}
    >
      <title>{country.name}</title>
      {paths.map((path) => (
        <path key={path.slice(0, 24)} d={path} fillRule="evenodd" className={styles.shape} />
      ))}
    </g>
  )
}
