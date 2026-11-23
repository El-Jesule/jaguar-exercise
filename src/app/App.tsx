import { atlasContent } from '../content'
import { getCountry, getResidentCountries } from '../domain/selectors'
import { CountryPanel } from '../features/country-panel/CountryPanel'
import { useCountrySelection } from '../features/country-panel/use-country-selection'
import { CuriositiesSection } from '../features/curiosities/CuriositiesSection'
import { PhotoGallery } from '../features/gallery/PhotoGallery'
import { Hero } from '../features/hero/Hero'
import { HuntingSection } from '../features/hunting/HuntingSection'
import { CountryList } from '../features/map/country-list'
import { JaguarMap } from '../features/map/JaguarMap'
import { SourcesSection } from '../features/sources/SourcesSection'
import { Section } from '../components/Section'
import styles from './app.module.css'

export function App() {
  const { selectedId, select, clear } = useCountrySelection()
  const residentCountries = getResidentCountries(atlasContent.countries)
  const selected = selectedId ? getCountry(atlasContent.countries, selectedId) : null

  return (
    <div className={styles.page}>
      <Hero />

      <main className="atlas-main">
        <div className="atlas-explorer">
          <Section
            id="mapa"
            title="Mapa del hábitat del jaguar"
            description="El jaguar habita dieciocho países del continente americano. Elige uno para ver su situación."
          >
            <JaguarMap
              countries={residentCountries}
              selectedId={selectedId}
              onSelect={select}
              onClear={clear}
            />
            <CountryList
              countries={residentCountries}
              selectedId={selectedId}
              onSelect={select}
              onClear={clear}
            />
          </Section>

          <CountryPanel
            selected={selected}
            habitats={atlasContent.habitats}
            sources={atlasContent.sources}
          />
        </div>

        <CuriositiesSection
          curiosities={atlasContent.curiosities}
          sources={atlasContent.sources}
        />

        <HuntingSection
          hunting={atlasContent.hunting}
          prey={atlasContent.prey}
          sources={atlasContent.sources}
        />

        <PhotoGallery photos={atlasContent.photos} />

        <SourcesSection sources={atlasContent.sources} />
      </main>

      <footer className={styles.footer}>
        <p>
          Proyecto educativo. Todas las estimaciones de población son aproximadas y deben leerse
          junto con su año y su fuente.
        </p>
      </footer>
    </div>
  )
}
