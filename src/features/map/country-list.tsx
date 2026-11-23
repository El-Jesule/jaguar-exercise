import type { CountryId, RangeCountry } from '../../domain/types'
import { groupBySubregion } from '../../domain/selectors'
import styles from './country-list.module.css'

export interface CountryListProps {
  readonly countries: readonly RangeCountry[]
  readonly selectedId: CountryId | null
  readonly onSelect: (id: CountryId) => void
  readonly onClear: () => void
}

export function CountryList({ countries, selectedId, onSelect, onClear }: CountryListProps) {
  const groups = groupBySubregion(countries)

  return (
    <div className={styles.list}>
      {groups.map((group) => (
        <section key={group.subregion} aria-labelledby={`grupo-${group.subregion}`}>
          <h3 id={`grupo-${group.subregion}`} className={styles.groupTitle}>
            {group.label}
          </h3>
          <ul className={styles.items}>
            {group.countries.map((country) => (
              <li key={country.id}>
                <button
                  type="button"
                  className={
                    selectedId === country.id ? styles.countryButtonSelected : styles.countryButton
                  }
                  aria-pressed={selectedId === country.id}
                  aria-label={`Ver población de ${country.name}`}
                  aria-controls="panel-poblacion"
                  onClick={() => {
                    onSelect(country.id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault()
                      onClear()
                    }
                  }}
                >
                  {country.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
