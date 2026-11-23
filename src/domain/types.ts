export const RESIDENT_COUNTRY_IDS = [
  'mx',
  'gt',
  'bz',
  'hn',
  'ni',
  'cr',
  'pa',
  'co',
  've',
  'gy',
  'sr',
  'gf',
  'ec',
  'pe',
  'bo',
  'br',
  'py',
  'ar',
] as const

export type ResidentCountryId = (typeof RESIDENT_COUNTRY_IDS)[number]

export type CountryId = ResidentCountryId | 'us'

export type RangeStatus = 'resident' | 'historical'

export type Subregion = 'north-america' | 'central-america' | 'south-america'

export type Trend = 'decreasing' | 'stable' | 'increasing' | 'unknown'

export type SourceId = string

export type HabitatTypeId = string

export type PreyCategory = 'mammal' | 'reptile' | 'fish' | 'bird' | 'livestock'

export interface Source {
  readonly id: SourceId
  readonly title: string
  readonly publisher: string
  readonly year: number
  readonly url: `https://${string}`
  readonly accessedOn: string
}

interface SourcedClaim {
  readonly sourceIds: readonly SourceId[]
}

export interface NumberEstimate extends SourcedClaim {
  readonly kind: 'number'
  readonly value: number
  readonly referenceYear: number
  readonly scopeNote?: string
}

export interface RangeEstimate extends SourcedClaim {
  readonly kind: 'range'
  readonly min: number
  readonly max: number
  readonly referenceYear: number
  readonly scopeNote?: string
}

export interface NoEstimate extends SourcedClaim {
  readonly kind: 'none'
  readonly note: string
}

export type PopulationEstimate = NumberEstimate | RangeEstimate | NoEstimate

export interface RangeCountry {
  readonly id: CountryId
  readonly name: string
  readonly subregion: Subregion
  readonly rangeStatus: RangeStatus
  readonly estimate: PopulationEstimate
  readonly trend: Trend
  readonly habitatIds: readonly HabitatTypeId[]
  readonly conservationNote: string
  readonly sourceIds: readonly SourceId[]
}

export interface HabitatType extends SourcedClaim {
  readonly id: HabitatTypeId
  readonly name: string
  readonly description: string
}

export interface Curiosity extends SourcedClaim {
  readonly id: string
  readonly title: string
  readonly body: string
}

export interface PreyItem extends SourcedClaim {
  readonly id: string
  readonly name: string
  readonly category: PreyCategory
  readonly description: string
}

export interface Photograph {
  readonly id: string
  readonly src: string
  readonly srcAvif?: string
  readonly width: number
  readonly height: number
  readonly alt: string
  readonly caption: string
  readonly credit: string
  readonly license: string
  readonly licenseUrl: `https://${string}`
}
