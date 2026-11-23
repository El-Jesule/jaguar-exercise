import { useId } from 'react'
import type { HabitatType, RangeCountry, Source } from '../../domain/types'
import { describeEstimate, getSourcesFor } from '../../domain/selectors'
import { ExternalLink } from '../../components/ExternalLink'
import { TrendBadge } from './TrendBadge'
import styles from './country-panel.module.css'

export interface CountryPanelProps {
  readonly selected: RangeCountry | null
  readonly habitats: readonly HabitatType[]
  readonly sources: readonly Source[]
}

export function CountryPanel({ selected, habitats, sources }: CountryPanelProps) {
  const titleId = useId()

  if (!selected) {
    return (
      <section
        id="panel-poblacion"
        className={styles.panel}
        aria-live="polite"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className={styles.title}>
          Población de jaguares por país
        </h2>
        <p className={styles.empty}>
          Elige un país en el mapa o en la lista para ver su población estimada, sus hábitats y las
          fuentes de cada dato.
        </p>
      </section>
    )
  }

  const view = describeEstimate(selected.estimate)
  const habitatEntries = selected.habitatIds
    .map((habitatId) => habitats.find((habitat) => habitat.id === habitatId))
    .filter((habitat): habitat is HabitatType => habitat !== undefined)
  const citationIds = [...new Set([...selected.estimate.sourceIds, ...selected.sourceIds])]
  const citations = getSourcesFor(citationIds, sources)
  const scopeNote =
    selected.estimate.kind === 'none' ? undefined : selected.estimate.scopeNote

  return (
    <section
      id="panel-poblacion"
      className={styles.panel}
      aria-live="polite"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className={styles.title}>
        Población de jaguares en {selected.name}
      </h2>

      <div className={styles.estimate}>
        <p className={styles.headline}>{view.headline}</p>
        {view.detail ? <p className={styles.detail}>{view.detail}</p> : null}
        {scopeNote ? <p className={styles.scope}>{scopeNote}</p> : null}
      </div>

      <TrendBadge trend={selected.trend} />

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>Hábitats</h3>
        <ul className={styles.habitatList}>
          {habitatEntries.map((habitat) => (
            <li key={habitat.id}>
              <strong>{habitat.name}.</strong> {habitat.description}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>Conservación</h3>
        <p className={styles.note}>{selected.conservationNote}</p>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockTitle}>Fuentes</h3>
        <ul className={styles.citationList}>
          {citations.map((source) => (
            <li key={source.id}>
              <ExternalLink href={source.url}>{source.publisher}</ExternalLink>{' '}
              <span className={styles.citationMeta}>
                {source.title} ({source.year})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
