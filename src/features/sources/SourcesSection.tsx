import type { Source } from '../../domain/types'
import { ExternalLink } from '../../components/ExternalLink'
import { Section } from '../../components/Section'
import styles from './sources.module.css'

function formatAccessDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return `${day ?? ''}/${month ?? ''}/${year ?? ''}`
}

export interface SourcesSectionProps {
  readonly sources: readonly Source[]
  readonly title?: string
  readonly description?: string
}

export function SourcesSection({
  sources,
  title = 'Fuentes',
  description = 'Cada cifra y cada afirmación ecológica de esta página se apoya en estas publicaciones. Las estimaciones son rangos sujetos a incertidumbre y deben citarse con su año.',
}: SourcesSectionProps) {
  return (
    <Section id="fuentes" title={title} description={description}>
      <ul className={styles.list}>
        {sources.map((source) => (
          <li key={source.id} className={styles.item}>
            <ExternalLink href={source.url}>{source.title}</ExternalLink>
            <p className={styles.meta}>
              {source.publisher} · {source.year} · consultado el{' '}
              {formatAccessDate(source.accessedOn)}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
