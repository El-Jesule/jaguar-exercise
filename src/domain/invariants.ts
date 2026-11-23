import type {
  Curiosity,
  HabitatType,
  HuntingContent,
  Photograph,
  PopulationEstimate,
  PreyItem,
  RangeCountry,
  Source,
} from './types'
import { RESIDENT_COUNTRY_IDS } from './types'

export interface AtlasContent {
  readonly countries: readonly RangeCountry[]
  readonly habitats: readonly HabitatType[]
  readonly sources: readonly Source[]
  readonly curiosities: readonly Curiosity[]
  readonly prey: readonly PreyItem[]
  readonly photos: readonly Photograph[]
  readonly hunting: HuntingContent
}

const MIN_CURIOSITIES = 8
const MIN_PREY = 5
const MIN_PHOTOS = 6
const MIN_PHOTO_SIDE = 1200
const MIN_ALT_LENGTH = 20
const MIN_SOURCE_YEAR = 1990
const HISTORY_YEAR_LIMIT = 1900

function duplicates(values: readonly string[]): readonly string[] {
  const seen = new Set<string>()
  const repeated = new Set<string>()

  for (const value of values) {
    if (seen.has(value)) {
      repeated.add(value)
    }
    seen.add(value)
  }

  return [...repeated]
}

function hasInvalidYear(year: number, currentYear: number): boolean {
  return !Number.isInteger(year) || year < MIN_SOURCE_YEAR || year > currentYear
}

function estimateIsSourced(estimate: PopulationEstimate): boolean {
  if (estimate.kind === 'none') {
    return estimate.note.trim().length > 0
  }

  return estimate.sourceIds.length > 0
}

function collectSourceIds(content: AtlasContent): readonly string[] {
  const ids = new Set<string>()

  for (const country of content.countries) {
    country.sourceIds.forEach((id) => ids.add(id))

    if (country.estimate.kind !== 'none') {
      country.estimate.sourceIds.forEach((id) => ids.add(id))
    }
  }

  for (const habitat of content.habitats) {
    habitat.sourceIds.forEach((id) => ids.add(id))
  }

  for (const curiosity of content.curiosities) {
    curiosity.sourceIds.forEach((id) => ids.add(id))
  }

  for (const prey of content.prey) {
    prey.sourceIds.forEach((id) => ids.add(id))
  }

  content.hunting.sourceIds.forEach((id) => ids.add(id))

  for (const behavior of content.hunting.behaviors) {
    behavior.sourceIds.forEach((id) => ids.add(id))
  }

  return [...ids]
}

function knownNumbers(content: AtlasContent): readonly number[] {
  const numbers: number[] = []

  for (const country of content.countries) {
    const { estimate } = country

    if (estimate.kind === 'number') {
      numbers.push(estimate.value, estimate.referenceYear)
    }

    if (estimate.kind === 'range') {
      numbers.push(estimate.min, estimate.max, estimate.referenceYear)
    }
  }

  return numbers
}

function unsourcedNumbers(text: string, known: readonly number[]): readonly string[] {
  const matches = text.match(/\d[\d.]*\d|\d/g) ?? []
  const knownAsText = new Set(known.map((value) => String(value)))
  const offenders: string[] = []

  for (const raw of matches) {
    const digits = raw.replace(/\./g, '')

    if (digits.length < 3) {
      continue
    }

    const numeric = Number(digits)

    if (numeric >= HISTORY_YEAR_LIMIT && numeric <= 2100) {
      continue
    }

    if (knownAsText.has(digits)) {
      continue
    }

    offenders.push(raw)
  }

  return offenders
}

export function validateContent(content: AtlasContent, currentYear = new Date().getFullYear()): readonly string[] {
  const problems: string[] = []

  const residents = content.countries.filter((country) => country.rangeStatus === 'resident')
  const residentIds = residents.map((country) => country.id).sort()
  const expectedIds = [...RESIDENT_COUNTRY_IDS].sort()

  if (residents.length !== expectedIds.length) {
    problems.push(
      `INV-01: expected ${expectedIds.length} resident countries, found ${residents.length}`,
    )
  }

  if (residentIds.join(',') !== expectedIds.join(',')) {
    problems.push(`INV-01: resident country ids differ from the required set`)
  }

  for (const country of content.countries) {
    if (country.estimate.kind === 'none' && country.estimate.note.trim().length === 0) {
      problems.push(`INV-02: ${country.id} has an empty no-estimate note`)
    }

    if (!estimateIsSourced(country.estimate)) {
      problems.push(`INV-03: ${country.id} has an unsourced estimate`)
    }

    if (country.estimate.kind !== 'none') {
      if (hasInvalidYear(country.estimate.referenceYear, currentYear)) {
        problems.push(
          `INV-03: ${country.id} has an invalid reference year ${country.estimate.referenceYear}`,
        )
      }

      if (country.estimate.kind === 'number' && country.estimate.value <= 0) {
        problems.push(`INV-03: ${country.id} has a non-positive estimate`)
      }

      if (
        country.estimate.kind === 'range' &&
        (country.estimate.min <= 0 || country.estimate.min > country.estimate.max)
      ) {
        problems.push(`INV-03: ${country.id} has an invalid estimate range`)
      }
    }

    if (country.rangeStatus === 'historical' && country.estimate.kind !== 'none') {
      problems.push(`INV-11: historical entry ${country.id} must not carry a population number`)
    }

    if (country.habitatIds.length === 0) {
      problems.push(`INV-10: ${country.id} has no habitats`)
    }

    for (const habitatId of country.habitatIds) {
      if (!content.habitats.some((habitat) => habitat.id === habitatId)) {
        problems.push(`INV-10: ${country.id} references unknown habitat ${habitatId}`)
      }
    }
  }

  for (const estimate of content.countries.map((country) => country.estimate)) {
    if (estimate.kind === 'none' && (('value' in estimate) || ('min' in estimate))) {
      problems.push(`INV-04: a no-estimate entry carries numeric fields`)
    }
  }

  const referenced = collectSourceIds(content)
  const sourceIds = content.sources.map((source) => source.id)

  for (const id of referenced) {
    if (!sourceIds.includes(id)) {
      problems.push(`INV-05: unknown source id ${id}`)
    }
  }

  for (const id of sourceIds) {
    if (!referenced.includes(id)) {
      problems.push(`INV-05: orphan source ${id}`)
    }
  }

  for (const source of content.sources) {
    if (!source.url.startsWith('https://')) {
      problems.push(`INV-06: source ${source.id} does not use https`)
    }

    if (hasInvalidYear(source.year, currentYear)) {
      problems.push(`INV-06: source ${source.id} has an invalid year ${source.year}`)
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.accessedOn)) {
      problems.push(`INV-06: source ${source.id} has an invalid access date`)
    }
  }

  if (content.curiosities.length < MIN_CURIOSITIES) {
    problems.push(`INV-07: expected at least ${MIN_CURIOSITIES} curiosities`)
  }

  if (content.curiosities.some((curiosity) => curiosity.sourceIds.length === 0)) {
    problems.push(`INV-07: a curiosity is missing its source`)
  }

  for (const title of duplicates(content.curiosities.map((curiosity) => curiosity.title))) {
    problems.push(`INV-07: duplicate curiosity title ${title}`)
  }

  if (content.prey.length < MIN_PREY) {
    problems.push(`INV-08: expected at least ${MIN_PREY} prey items`)
  }

  if (content.prey.some((prey) => prey.sourceIds.length === 0)) {
    problems.push(`INV-08: a prey item is missing its source`)
  }

  if (content.photos.length < MIN_PHOTOS) {
    problems.push(`INV-09: expected at least ${MIN_PHOTOS} photos`)
  }

  for (const photo of content.photos) {
    if (Math.max(photo.width, photo.height) < MIN_PHOTO_SIDE) {
      problems.push(`INV-09: photo ${photo.id} is smaller than ${MIN_PHOTO_SIDE}px`)
    }

    if (photo.alt.trim().length < MIN_ALT_LENGTH) {
      problems.push(`INV-09: photo ${photo.id} has insufficient alt text`)
    }

    if (!photo.licenseUrl.startsWith('https://')) {
      problems.push(`INV-06: photo ${photo.id} license URL is not https`)
    }
  }

  const collections: readonly (readonly { readonly id: string }[])[] = [
    content.countries,
    content.habitats,
    content.sources,
    content.curiosities,
    content.prey,
    content.photos,
  ]

  for (const collection of collections) {
    for (const id of duplicates(collection.map((entry) => entry.id))) {
      problems.push(`INV-12: duplicate id ${id}`)
    }
  }

  const known = knownNumbers(content)
  const narrativeTexts = [
    ...content.countries.map((country) => country.conservationNote),
    ...content.curiosities.map((curiosity) => curiosity.body),
    ...content.prey.map((prey) => prey.description),
    content.hunting.intro,
    ...content.hunting.behaviors.map((behavior) => behavior.body),
  ]

  for (const text of narrativeTexts) {
    for (const offender of unsourcedNumbers(text, known)) {
      problems.push(`INV-14: narrative mentions unsourced number ${offender}`)
    }
  }

  return problems
}
