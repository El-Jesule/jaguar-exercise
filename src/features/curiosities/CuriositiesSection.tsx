import type { Curiosity, Source } from '../../domain/types'
import { Section } from '../../components/Section'
import { CuriosityCard } from './CuriosityCard'
import styles from './curiosities.module.css'

export interface CuriositiesSectionProps {
  readonly curiosities: readonly Curiosity[]
  readonly sources: readonly Source[]
}

export function CuriositiesSection({ curiosities, sources }: CuriositiesSectionProps) {
  return (
    <Section
      id="curiosidades"
      title="Curiosidades del jaguar"
      description="Datos que explican por qué es un felino irrepetible: su fuerza, su relación con el agua y su papel en el ecosistema."
    >
      <div className={styles.grid}>
        {curiosities.map((curiosity) => (
          <CuriosityCard key={curiosity.id} curiosity={curiosity} sources={sources} />
        ))}
      </div>
    </Section>
  )
}
