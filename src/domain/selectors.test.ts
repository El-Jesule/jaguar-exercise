import { describe, expect, it } from 'vitest'
import type { HabitatType, RangeCountry, Source } from './types'
import {
  describeEstimate,
  formatEstimate,
  formatNumber,
  getCountry,
  getHabitatsFor,
  getHistoricalPresenceNote,
  getResidentCountries,
  getSourcesFor,
  groupBySubregion,
} from './selectors'

const habitat = (id: string, name = id): HabitatType => ({
  id,
  name,
  description: 'descripcion',
  sourceIds: ['iucn-2017'],
})

const source = (id: string): Source => ({
  id,
  title: id,
  publisher: 'IUCN',
  year: 2017,
  url: 'https://example.org',
  accessedOn: '2026-11-23',
})

const country = (overrides: Partial<RangeCountry> & Pick<RangeCountry, 'id'>): RangeCountry => ({
  name: overrides.id.toUpperCase(),
  subregion: 'south-america',
  rangeStatus: 'resident',
  estimate: { kind: 'none', note: 'sin datos', sourceIds: ['iucn-2017'] },
  trend: 'unknown',
  habitatIds: ['rainforest'],
  conservationNote: 'nota',
  sourceIds: ['iucn-2017'],
  ...overrides,
})

describe('formatNumber', () => {
  it('groups thousands with a dot', () => {
    expect(formatNumber(4800)).toBe('4.800')
    expect(formatNumber(173000)).toBe('173.000')
    expect(formatNumber(42)).toBe('42')
  })
})

describe('getResidentCountries', () => {
  it('drops historical entries', () => {
    const countries = [
      country({ id: 'br' }),
      country({ id: 'us', rangeStatus: 'historical' }),
    ]

    expect(getResidentCountries(countries).map((entry) => entry.id)).toEqual(['br'])
  })
})

describe('getCountry', () => {
  it('returns the matching country', () => {
    expect(getCountry([country({ id: 'br' })], 'br').id).toBe('br')
  })

  it('throws for an unknown id', () => {
    expect(() => getCountry([country({ id: 'br' })], 'ar')).toThrow(/Unknown country id: ar/)
  })
})

describe('getHabitatsFor', () => {
  it('returns habitats in the country order', () => {
    const br = country({ id: 'br', habitatIds: ['flooded', 'rainforest'] })
    const habitats = [habitat('rainforest'), habitat('flooded')]

    expect(getHabitatsFor(br, habitats).map((entry) => entry.id)).toEqual([
      'flooded',
      'rainforest',
    ])
  })

  it('throws when a habitat id is unresolved', () => {
    const br = country({ id: 'br', habitatIds: ['missing'] })

    expect(() => getHabitatsFor(br, [])).toThrow(/Unknown habitat id: missing/)
  })
})

describe('getSourcesFor', () => {
  it('deduplicates while preserving first-seen order', () => {
    const sources = [source('a'), source('b')]

    expect(getSourcesFor(['b', 'a', 'b'], sources).map((entry) => entry.id)).toEqual(['b', 'a'])
  })

  it('throws when a source id is unresolved', () => {
    expect(() => getSourcesFor(['nope'], [])).toThrow(/Unknown source id: nope/)
  })
})

describe('describeEstimate', () => {
  it('describes a single number with its year', () => {
    expect(
      describeEstimate({ kind: 'number', value: 4800, referenceYear: 2017, sourceIds: ['s'] }),
    ).toEqual({
      headline: '4.800 jaguares',
      detail: 'Estimación de 2017',
      referenceYear: 2017,
    })
  })

  it('describes a range with its year', () => {
    expect(
      describeEstimate({
        kind: 'range',
        min: 1000,
        max: 3000,
        referenceYear: 2020,
        sourceIds: ['s'],
      }),
    ).toEqual({
      headline: 'Entre 1.000 y 3.000 jaguares',
      detail: 'Estimación de 2020',
      referenceYear: 2020,
    })
  })

  it('never invents a figure when no estimate exists', () => {
    const view = describeEstimate({ kind: 'none', note: 'Sin censo nacional', sourceIds: ['s'] })

    expect(view.headline).toBe('Sin estimación publicada')
    expect(view.detail).toBe('Sin censo nacional')
    expect(view.referenceYear).toBeNull()
    expect(view.headline).not.toMatch(/0 jaguares/)
  })
})

describe('formatEstimate', () => {
  it('returns only the headline', () => {
    expect(formatEstimate({ kind: 'none', note: 'x', sourceIds: ['s'] })).toBe(
      'Sin estimación publicada',
    )
  })
})

describe('groupBySubregion', () => {
  it('orders groups and labels them in Spanish', () => {
    const groups = groupBySubregion([
      country({ id: 'br', subregion: 'south-america' }),
      country({ id: 'mx', subregion: 'north-america' }),
      country({ id: 'pa', subregion: 'central-america' }),
    ])

    expect(groups.map((group) => group.label)).toEqual([
      'Norteamérica',
      'Centroamérica',
      'Sudamérica',
    ])
  })

  it('omits empty groups', () => {
    const groups = groupBySubregion([country({ id: 'br', subregion: 'south-america' })])

    expect(groups).toHaveLength(1)
    expect(groups[0]?.subregion).toBe('south-america')
  })
})

describe('getHistoricalPresenceNote', () => {
  it('returns the note for the historical entry', () => {
    const note = getHistoricalPresenceNote([
      country({
        id: 'us',
        rangeStatus: 'historical',
        conservationNote: 'Presencia histórica en Arizona.',
      }),
    ])

    expect(note).toBe('Presencia histórica en Arizona.')
  })

  it('returns null when the content has no historical entry', () => {
    expect(getHistoricalPresenceNote([country({ id: 'br' })])).toBeNull()
  })
})
