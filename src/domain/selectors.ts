import type {
  CountryId,
  HabitatType,
  PopulationEstimate,
  RangeCountry,
  Source,
  SourceId,
  Subregion,
} from './types'

export interface SubregionGroup {
  readonly subregion: Subregion
  readonly label: string
  readonly countries: readonly RangeCountry[]
}

const SUBREGION_LABELS: Record<Subregion, string> = {
  'north-america': 'Norteamérica',
  'central-america': 'Centroamérica',
  'south-america': 'Sudamérica',
}

const SUBREGION_ORDER: readonly Subregion[] = [
  'north-america',
  'central-america',
  'south-america',
]

const NO_ESTIMATE_HEADLINE = 'Sin estimación publicada'

export function formatNumber(value: number): string {
  const digits = Math.trunc(Math.abs(value)).toString()
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return value < 0 ? `-${grouped}` : grouped
}

export function getResidentCountries(countries: readonly RangeCountry[]): readonly RangeCountry[] {
  return countries.filter((country) => country.rangeStatus === 'resident')
}

export function getCountry(countries: readonly RangeCountry[], id: CountryId): RangeCountry {
  const country = countries.find((candidate) => candidate.id === id)

  if (!country) {
    throw new Error(`Unknown country id: ${id}`)
  }

  return country
}

export function getHabitatsFor(
  country: RangeCountry,
  habitats: readonly HabitatType[],
): readonly HabitatType[] {
  return country.habitatIds.map((habitatId) => {
    const habitat = habitats.find((candidate) => candidate.id === habitatId)

    if (!habitat) {
      throw new Error(`Unknown habitat id: ${habitatId} on country ${country.id}`)
    }

    return habitat
  })
}

export function getSourcesFor(
  sourceIds: readonly SourceId[],
  sources: readonly Source[],
): readonly Source[] {
  const uniqueIds = [...new Set(sourceIds)]

  return uniqueIds.map((sourceId) => {
    const source = sources.find((candidate) => candidate.id === sourceId)

    if (!source) {
      throw new Error(`Unknown source id: ${sourceId}`)
    }

    return source
  })
}

export function getHistoricalPresenceNote(
  countries: readonly RangeCountry[],
): string | null {
  const historical = countries.find((country) => country.rangeStatus === 'historical')
  return historical ? historical.conservationNote : null
}

export function groupBySubregion(
  countries: readonly RangeCountry[],
): readonly SubregionGroup[] {
  return SUBREGION_ORDER.map((subregion) => ({
    subregion,
    label: SUBREGION_LABELS[subregion],
    countries: countries.filter((country) => country.subregion === subregion),
  })).filter((group) => group.countries.length > 0)
}

export interface EstimateView {
  readonly headline: string
  readonly detail: string | null
  readonly referenceYear: number | null
}

export function describeEstimate(estimate: PopulationEstimate): EstimateView {
  if (estimate.kind === 'none') {
    return { headline: NO_ESTIMATE_HEADLINE, detail: estimate.note, referenceYear: null }
  }

  const detail = `Estimación de ${estimate.referenceYear}`
  const headline =
    estimate.kind === 'number'
      ? `${formatNumber(estimate.value)} jaguares`
      : `Entre ${formatNumber(estimate.min)} y ${formatNumber(estimate.max)} jaguares`

  return { headline, detail, referenceYear: estimate.referenceYear }
}

export function formatEstimate(estimate: PopulationEstimate): string {
  return describeEstimate(estimate).headline
}
