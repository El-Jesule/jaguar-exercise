import type { Curiosity, Source } from '../../domain/types'
import { SourceLinks } from '../../components/SourceLinks'
import styles from './curiosity-card.module.css'

export interface CuriosityCardProps {
  readonly curiosity: Curiosity
  readonly sources: readonly Source[]
}

export function CuriosityCard({ curiosity, sources }: CuriosityCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{curiosity.title}</h3>
      <p className={styles.body}>{curiosity.body}</p>
      <SourceLinks sourceIds={curiosity.sourceIds} sources={sources} label="Fuente" />
    </article>
  )
}
