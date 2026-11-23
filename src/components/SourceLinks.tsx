import { Fragment } from 'react'
import type { Source, SourceId } from '../domain/types'
import { getSourcesFor } from '../domain/selectors'
import { ExternalLink } from './ExternalLink'
import styles from './source-links.module.css'

export interface SourceLinksProps {
  readonly sourceIds: readonly SourceId[]
  readonly sources: readonly Source[]
  readonly label?: string
}

export function SourceLinks({ sourceIds, sources, label = 'Fuentes' }: SourceLinksProps) {
  const resolved = getSourcesFor(sourceIds, sources)

  return (
    <p className={styles.line}>
      <span className={styles.label}>{label}:</span>{' '}
      {resolved.map((source, index) => (
        <Fragment key={source.id}>
          {index > 0 ? ' · ' : null}
          <ExternalLink href={source.url}>{source.publisher}</ExternalLink>
        </Fragment>
      ))}
    </p>
  )
}
