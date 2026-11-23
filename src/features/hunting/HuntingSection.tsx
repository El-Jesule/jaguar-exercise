import type { HuntingContent, PreyItem, Source } from '../../domain/types'
import { Section } from '../../components/Section'
import { SourceLinks } from '../../components/SourceLinks'
import { PreyList } from './PreyList'
import styles from './hunting.module.css'

export interface HuntingSectionProps {
  readonly hunting: HuntingContent
  readonly prey: readonly PreyItem[]
  readonly sources: readonly Source[]
}

export function HuntingSection({ hunting, prey, sources }: HuntingSectionProps) {
  return (
    <Section
      id="caza"
      title="Cómo caza el jaguar"
      description="Un depredador de emboscada que confía en la sorpresa, la paciencia y una mordida decisiva."
    >
      <p className={styles.intro}>{hunting.intro}</p>
      <SourceLinks sourceIds={hunting.sourceIds} sources={sources} />

      <ol className={styles.behaviors}>
        {hunting.behaviors.map((behavior) => (
          <li key={behavior.id} className={styles.behavior}>
            <h3 className={styles.behaviorTitle}>{behavior.title}</h3>
            <p className={styles.behaviorBody}>{behavior.body}</p>
            <SourceLinks sourceIds={behavior.sourceIds} sources={sources} label="Fuente" />
          </li>
        ))}
      </ol>

      <div className={styles.preyBlock}>
        <h3 className={styles.preyTitle}>Presas habituales</h3>
        <p className={styles.preyIntro}>
          Su dieta cambia con el hábitat, pero estas son las presas más frecuentes en su área de
          distribución.
        </p>
        <PreyList prey={prey} sources={sources} />
      </div>
    </Section>
  )
}
