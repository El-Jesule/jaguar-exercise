import { useState } from 'react'
import type { Photograph } from '../domain/types'
import styles from './figure.module.css'

export interface FigureProps {
  readonly photo: Photograph
  readonly eager?: boolean
  readonly className?: string
}

export function Figure({ photo, eager = false, className }: FigureProps) {
  const [failed, setFailed] = useState(false)

  const image = (
    <img
      className={styles.image}
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => {
        setFailed(true)
      }}
    />
  )

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(' ')}>
      <div
        className={styles.media}
        style={{ aspectRatio: `${String(photo.width)} / ${String(photo.height)}` }}
      >
        {failed ? (
          <div className={styles.fallback}>
            <p className={styles.fallbackText}>Imagen no disponible</p>
            <span className="visually-hidden">{photo.alt}</span>
          </div>
        ) : photo.srcAvif ? (
          <picture>
            <source type="image/avif" srcSet={photo.srcAvif} />
            {image}
          </picture>
        ) : (
          image
        )}
      </div>
      <figcaption className={styles.caption}>
        <span>{photo.caption}</span>{' '}
        <span className={styles.credit}>
          {photo.credit} ·{' '}
          <a href={photo.licenseUrl} target="_blank" rel="noreferrer noopener">
            {photo.license}
          </a>
        </span>
      </figcaption>
    </figure>
  )
}
