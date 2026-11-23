import { useId } from 'react'
import type { ReactNode } from 'react'
import styles from './section.module.css'

export interface SectionProps {
  readonly id: string
  readonly title: string
  readonly description?: string
  readonly children: ReactNode
}

export function Section({ id, title, description, children }: SectionProps) {
  const titleId = useId()

  return (
    <section id={id} aria-labelledby={titleId} className={styles.section}>
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {description ? <p className={styles.description}>{description}</p> : null}
      </header>
      {children}
    </section>
  )
}
