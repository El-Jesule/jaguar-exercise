import { describe, expect, it } from 'vitest'
import type { AtlasContent } from './invariants'
import { validateContent } from './invariants'
import { RESIDENT_COUNTRY_IDS } from './types'
import type { Curiosity, HabitatType, Photograph, PreyItem, RangeCountry, Source } from './types'

const CURRENT_YEAR = 2026

const unsafeUrl = (url: string): Source['url'] => url as Source['url']

const sources: readonly Source[] = [
  {
    id: 'iucn-2017',
    title: 'Panthera onca assessment',
    publisher: 'IUCN',
    year: 2017,
    url: 'https://www.iucnredlist.org',
    accessedOn: '2026-11-23',
  },
]

const habitats: readonly HabitatType[] = [
  {
    id: 'rainforest',
    name: 'Selva tropical húmeda',
    description: 'Bosque cerrado y húmedo.',
    sourceIds: ['iucn-2017'],
  },
]

function makeCountry(id: RangeCountry['id']): RangeCountry {
  return {
    id,
    name: id.toUpperCase(),
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: { kind: 'none', note: 'Sin censo nacional publicado.', sourceIds: ['iucn-2017'] },
    trend: 'unknown',
    habitatIds: ['rainforest'],
    conservationNote: 'Nota de conservación.',
    sourceIds: ['iucn-2017'],
  }
}

const curiosities: readonly Curiosity[] = Array.from({ length: 8 }, (_, index) => ({
  id: `curiosity-${String(index)}`,
  title: `Curiosidad ${String(index)}`,
  body: 'Texto de la curiosidad.',
  sourceIds: ['iucn-2017'],
}))

const prey: readonly PreyItem[] = Array.from({ length: 5 }, (_, index) => ({
  id: `prey-${String(index)}`,
  name: `Presa ${String(index)}`,
  category: 'mammal',
  description: 'Descripción de la presa.',
  sourceIds: ['iucn-2017'],
}))

const photos: readonly Photograph[] = Array.from({ length: 6 }, (_, index) => ({
  id: `photo-${String(index)}`,
  src: `/photo-${String(index)}.webp`,
  width: 1600,
  height: 1000,
  alt: 'Jaguar caminando junto a un río de la selva.',
  caption: 'Jaguar en la selva.',
  credit: 'Fotógrafo',
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
}))

function makeContent(overrides: Partial<AtlasContent> = {}): AtlasContent {
  return {
    countries: RESIDENT_COUNTRY_IDS.map(makeCountry),
    habitats,
    sources,
    curiosities,
    prey,
    photos,
    ...overrides,
  }
}

describe('validateContent', () => {
  it('accepts a complete, sourced content set', () => {
    expect(validateContent(makeContent(), CURRENT_YEAR)).toEqual([])
  })

  it('INV-01 flags a missing country', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.slice(1).map(makeCountry),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-01/)
  })

  it('INV-02 flags an empty no-estimate note', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.map((id) => ({
        ...makeCountry(id),
        estimate: { kind: 'none' as const, note: '  ', sourceIds: ['iucn-2017'] },
      })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-02/)
  })

  it('INV-03 flags an estimate without a source', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.map((id) => ({
        ...makeCountry(id),
        estimate: { kind: 'number' as const, value: 100, referenceYear: 2020, sourceIds: [] },
      })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-03/)
  })

  it('INV-03 flags an invalid reference year', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.map((id) => ({
        ...makeCountry(id),
        estimate: { kind: 'number' as const, value: 100, referenceYear: 1900, sourceIds: ['iucn-2017'] },
      })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/invalid reference year/)
  })

  it('INV-05 flags an unknown source id', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.map((id) => ({
        ...makeCountry(id),
        sourceIds: ['ghost'],
      })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/unknown source id ghost/)
  })

  it('INV-05 flags an orphan source', () => {
    const content = makeContent({
      sources: [
        ...sources,
        {
          id: 'orphan',
          title: 'Orphan',
          publisher: 'Nadie',
          year: 2020,
          url: 'https://example.org',
          accessedOn: '2026-11-23',
        },
      ],
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/orphan source orphan/)
  })

  it('INV-06 flags a non-https source url', () => {
    const content = makeContent({
      sources: [{ ...sources[0], url: unsafeUrl('http://insecure.example') }],
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-06/)
  })

  it('INV-07 flags too few curiosities', () => {
    expect(
      validateContent(makeContent({ curiosities: curiosities.slice(0, 3) }), CURRENT_YEAR).join(
        '\n',
      ),
    ).toMatch(/INV-07/)
  })

  it('INV-08 flags too few prey items', () => {
    expect(
      validateContent(makeContent({ prey: prey.slice(0, 2) }), CURRENT_YEAR).join('\n'),
    ).toMatch(/INV-08/)
  })

  it('INV-09 flags a small photo', () => {
    const content = makeContent({
      photos: photos.map((photo) => ({ ...photo, width: 600, height: 400 })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-09/)
  })

  it('INV-09 flags alt text that is too short', () => {
    const content = makeContent({ photos: photos.map((photo) => ({ ...photo, alt: 'jaguar' })) })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-09/)
  })

  it('INV-10 flags a country without habitats', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.map((id) => ({ ...makeCountry(id), habitatIds: [] })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-10/)
  })

  it('INV-11 flags a historical entry with a population number', () => {
    const content = makeContent({
      countries: [
        ...RESIDENT_COUNTRY_IDS.map(makeCountry),
        {
          ...makeCountry('us'),
          rangeStatus: 'historical',
          estimate: { kind: 'number', value: 5, referenceYear: 2020, sourceIds: ['iucn-2017'] },
        },
      ],
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-11/)
  })

  it('INV-12 flags duplicate ids', () => {
    const content = makeContent({ curiosities: [...curiosities, curiosities[0]] })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-12/)
  })

  it('INV-14 flags an unsourced population number in narrative text', () => {
    const content = makeContent({
      countries: RESIDENT_COUNTRY_IDS.map((id) => ({
        ...makeCountry(id),
        conservationNote: 'En el país viven 90000 jaguares según un estudio.',
      })),
    })

    expect(validateContent(content, CURRENT_YEAR).join('\n')).toMatch(/INV-14/)
  })
})
