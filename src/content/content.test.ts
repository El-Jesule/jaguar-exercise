import { describe, expect, it } from 'vitest'
import { atlasContent } from '.'
import { validateContent } from '../domain/invariants'
import { getResidentCountries, getSourcesFor, getHabitatsFor } from '../domain/selectors'

const DEFERRED = /^INV-0[789]/

describe('country content', () => {
  it('contains exactly the 18 resident range countries', () => {
    expect(getResidentCountries(atlasContent.countries)).toHaveLength(18)
  })

  it('satisfies every content invariant that concerns countries and sources', () => {
    const problems = validateContent(atlasContent).filter((problem) => !DEFERRED.test(problem))

    expect(problems).toEqual([])
  })

  it('exposes Mexican estimate with its year and source', () => {
    const mexico = atlasContent.countries.find((country) => country.id === 'mx')

    expect(mexico?.estimate.kind).toBe('number')

    if (mexico?.estimate.kind === 'number') {
      expect(mexico.estimate.value).toBe(4800)
      expect(mexico.estimate.referenceYear).toBe(2018)
      expect(getSourcesFor(mexico.estimate.sourceIds, atlasContent.sources)[0]?.publisher).toMatch(
        /CONANP/,
      )
    }
  })

  it('marks the United States as historical with no population figure', () => {
    const usa = atlasContent.countries.find((country) => country.id === 'us')

    expect(usa?.rangeStatus).toBe('historical')
    expect(usa?.estimate.kind).toBe('none')
  })

  it('resolves every country habitat', () => {
    for (const country of atlasContent.countries) {
      expect(getHabitatsFor(country, atlasContent.habitats).length).toBeGreaterThan(0)
    }
  })

  it('gives every country at least one source', () => {
    for (const country of atlasContent.countries) {
      expect(getSourcesFor(country.sourceIds, atlasContent.sources).length).toBeGreaterThan(0)
    }
  })
})
