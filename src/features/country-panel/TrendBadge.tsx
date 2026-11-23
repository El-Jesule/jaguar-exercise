import type { Trend } from '../../domain/types'
import styles from './trend-badge.module.css'

const TREND_LABELS: Record<Trend, { readonly label: string; readonly glyph: string }> = {
  decreasing: { label: 'En descenso', glyph: '↓' },
  stable: { label: 'Estable', glyph: '→' },
  increasing: { label: 'En aumento', glyph: '↑' },
  unknown: { label: 'Sin dato de tendencia', glyph: '·' },
}

export function TrendBadge({ trend }: { readonly trend: Trend }) {
  const { label, glyph } = TREND_LABELS[trend]

  return (
    <p className={styles.badge}>
      <span aria-hidden="true" className={styles.glyph}>
        {glyph}
      </span>
      Tendencia: {label}
    </p>
  )
}
