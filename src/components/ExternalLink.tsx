import type { ReactNode } from 'react'
import styles from './external-link.module.css'

export interface ExternalLinkProps {
  readonly href: string
  readonly children: ReactNode
  readonly label?: string
}

export function ExternalLink({ href, children, label }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className={styles.link}
    >
      {children}
      <span aria-hidden="true" className={styles.icon}>
        {' '}
        ↗
      </span>
    </a>
  )
}
