import type { Photograph } from '../../domain/types'
import { Section } from '../../components/Section'
import { Figure } from '../../components/Figure'
import styles from './gallery.module.css'

export interface PhotoGalleryProps {
  readonly photos: readonly Photograph[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <Section
      id="galeria"
      title="Galería de fotos"
      description="Imágenes de jaguares en el Pantanal, con su crédito y licencia. Todas provienen de Wikimedia Commons."
    >
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <Figure key={photo.id} photo={photo} eager={index === 0} className={styles.item} />
        ))}
      </div>
    </Section>
  )
}
