import styles from './hero.module.css'

export function Hero() {
  return (
    <header className={styles.hero}>
      <p className={styles.brand}>Jaguar Atlas</p>
      <h1 className={styles.statement}>
        El jaguar es <span className={styles.accent}>el mejor felino del planeta</span>
      </h1>
      <p className={styles.lede}>
        Explora dónde vive, qué población se estima en cada país, cómo caza y por qué conservarlo
        protege bosques, ríos y humedales enteros.
      </p>
      <p className={styles.disclaimer}>
        Afirmación editorial del sitio, respaldada por los datos y las fuentes de esta página.
      </p>
    </header>
  )
}
