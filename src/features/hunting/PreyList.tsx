import type { PreyItem, Source } from '../../domain/types'
import { SourceLinks } from '../../components/SourceLinks'
import styles from './prey-list.module.css'

const CATEGORY_LABELS: Record<PreyItem['category'], string> = {
  mammal: 'Mamífero',
  reptile: 'Reptil',
  fish: 'Pez',
  bird: 'Ave',
  livestock: 'Ganado',
}

export interface PreyListProps {
  readonly prey: readonly PreyItem[]
  readonly sources: readonly Source[]
}

export function PreyList({ prey, sources }: PreyListProps) {
  return (
    <ul className={styles.list}>
      {prey.map((item) => (
        <li key={item.id} className={styles.item}>
          <p className={styles.heading}>
            <strong>{item.name}</strong>{' '}
            <span className={styles.category}>{CATEGORY_LABELS[item.category]}</span>
          </p>
          <p className={styles.description}>{item.description}</p>
          <SourceLinks sourceIds={item.sourceIds} sources={sources} label="Fuente" />
        </li>
      ))}
    </ul>
  )
}
