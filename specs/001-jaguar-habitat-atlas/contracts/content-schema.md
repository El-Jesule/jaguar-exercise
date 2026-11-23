# Contract: Content Schema and Invariants

**Feature**: `001-jaguar-habitat-atlas` | **Version**: 1.0.0 | **Date**: 2026-11-23

The project exposes no network API and no CLI. Its external-facing contracts are (a) the typed
content surface consumed by the UI and (b) the interaction surface the visitor perceives. This
document defines the content surface; `ui-interaction.md` defines the interaction surface.

All types live in `src/domain/types.ts`; all data lives in `src/content/`. The contract is enforced
at compile time by TypeScript `strict` and at CI time by tests in `src/domain/invariants.test.ts`.

## Type surface

```ts
export type CountryId = 'mx' | 'gt' | 'bz' | 'hn' | 'ni' | 'cr' | 'pa' | 'co' | 've'
  | 'gy' | 'sr' | 'gf' | 'ec' | 'pe' | 'bo' | 'br' | 'py' | 'ar';

export type RangeStatus = 'resident' | 'historical';
export type Subregion = 'north-america' | 'central-america' | 'south-america';
export type Trend = 'decreasing' | 'stable' | 'increasing' | 'unknown';

export type SourceId = string;
export type HabitatTypeId = string;

export interface Source {
  readonly id: SourceId;
  readonly title: string;
  readonly publisher: string;
  readonly year: number;
  readonly url: `https://${string}`;
  readonly accessedOn: string; // YYYY-MM-DD
}

export type PopulationEstimate =
  | {
      readonly kind: 'number';
      readonly value: number;
      readonly referenceYear: number;
      readonly sourceIds: readonly SourceId[];
      readonly scopeNote?: string;
    }
  | {
      readonly kind: 'range';
      readonly min: number;
      readonly max: number;
      readonly referenceYear: number;
      readonly sourceIds: readonly SourceId[];
      readonly scopeNote?: string;
    }
  | {
      readonly kind: 'none';
      readonly note: string;
      readonly sourceIds: readonly SourceId[];
    };

export interface RangeCountry {
  readonly id: CountryId;
  readonly name: string;
  readonly subregion: Subregion;
  readonly rangeStatus: RangeStatus;
  readonly estimate: PopulationEstimate;
  readonly trend: Trend;
  readonly habitatIds: readonly HabitatTypeId[];
  readonly conservationNote: string;
  readonly sourceIds: readonly SourceId[];
}

export interface HabitatType {
  readonly id: HabitatTypeId;
  readonly name: string;
  readonly description: string;
  readonly sourceIds: readonly SourceId[];
}

export interface Curiosity {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly sourceIds: readonly SourceId[];
}

export interface PreyItem {
  readonly id: string;
  readonly name: string;
  readonly category: 'mammal' | 'reptile' | 'fish' | 'bird' | 'livestock';
  readonly description: string;
  readonly sourceIds: readonly SourceId[];
}

export interface Photograph {
  readonly id: string;
  readonly src: string;
  readonly srcAvif?: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
  readonly credit: string;
  readonly license: string;
  readonly licenseUrl: `https://${string}`;
}
```

## Exported selectors (the only way the UI reads content)

```ts
export function getResidentCountries(): readonly RangeCountry[];
export function getCountry(id: CountryId): RangeCountry;               // throws if absent
export function getHabitatsFor(country: RangeCountry): readonly HabitatType[];
export function getSourcesFor(sources: readonly SourceId[]): readonly Source[];
export function formatEstimate(estimate: PopulationEstimate): string;  // never invents a figure
export function getHistoricalPresenceNote(): string | null;
```

**Selector rules**

- `formatEstimate` returns `"Sin estimación publicada"` for `kind: 'none'` and never returns `"0"`
  or an empty string.
- `getSourcesFor` throws if any ID is unresolved; the UI MUST NOT filter silently.
- Selectors are pure and framework-free: no React import, no DOM access.

## Invariants (each is one failing test before implementation)

| ID | Invariant | Spec link |
|----|-----------|-----------|
| INV-01 | `getResidentCountries()` has exactly 18 entries with the exact ID set. | FR-003, SC-002 |
| INV-02 | No `resident` country has `estimate.kind === 'none'` without a non-empty `note`. | FR-005 |
| INV-03 | Every `'number'`/`'range'` estimate has `sourceIds.length >= 1` and a `referenceYear` in 1990..current year. | FR-006, SC-003 |
| INV-04 | A `'none'` estimate has no `value`, `min`, `max`, or `referenceYear` keys. | FR-005, FR-018 |
| INV-05 | Every `SourceId` in every entity resolves to a `Source`, and every `Source` is referenced at least once. | FR-013, FR-018 |
| INV-06 | Every `Source.url` and `Photograph.licenseUrl` starts with `https://`. | FR-013 |
| INV-07 | `curiosities.length >= 8` and titles are unique. | FR-009, SC-004 |
| INV-08 | `prey.length >= 5` and every item has at least one source. | FR-011, SC-009 |
| INV-09 | `photos.length >= 6`, max(width, height) >= 1200, `alt.length >= 20`. | FR-012, SC-005 |
| INV-10 | Every `habitatIds` entry resolves to a `HabitatType`, and each country has at least one habitat. | FR-004 |
| INV-11 | `us` (or any `historical` entry) carries `rangeStatus: 'historical'` and is absent from the map/list of 18. | FR-019 |
| INV-12 | All entity `id`s are unique within their collection. | FR-018 |
| INV-13 | Every referenced image file exists in `src/assets/photos/` (filesystem check in the test). | FR-012 |
| INV-14 | No content string contains a population number that is not present in a sourced `estimate`. | FR-018, SC-010 |

## Rendering contract for the panel

The panel MUST render, in this order, for the selected country:

1. Country name as the panel's accessible heading.
2. Estimate text from `formatEstimate` — for `'number'`/`'range'`: the figure, then
   `"Estimación de {referenceYear}"`, then the source citation line; for `'none'`: the explicit
   no-estimate message followed by the note.
3. Trend badge with a text label (never color-only).
4. Habitat list using `getHabitatsFor`.
5. Conservation note.
6. Source citation line(s) with reachable links.

Omitting any of these for a resident country is a contract violation.

## Versioning

- MAJOR: changing or removing a field, a selector signature, or an invariant.
- MINOR: adding an optional field or a new selector.
- PATCH: wording or documentation fixes only.
