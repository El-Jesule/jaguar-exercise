# Data Model: Jaguar Habitat Atlas

**Feature**: `001-jaguar-habitat-atlas` | **Date**: 2026-11-23

No database and no persistence. Every entity below is a compile-time TypeScript value in
`src/content/`, typed by `src/domain/types.ts`, and validated by invariant tests. Identifiers are
lowercase kebab-case strings, unique per entity type.

## RangeCountry

A country where jaguars currently live in the wild.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | `CountryId` | Yes | ISO 3166-1 alpha-2, lowercase (`br`, `mx`). Unique. |
| `name` | `string` | Yes | Spanish display name (`Brasil`, `México`). |
| `subregion` | `'north-america' \| 'central-america' \| 'south-america'` | Yes | Used for grouping in the country list. |
| `rangeStatus` | `'resident' \| 'historical'` | Yes | Only `resident` countries appear on the map as selectable range countries. |
| `estimate` | `PopulationEstimate` | Yes | See below. |
| `trend` | `'decreasing' \| 'stable' \| 'increasing' \| 'unknown'` | Yes | Rendered as a labelled badge, never color-only. |
| `habitatIds` | `HabitatTypeId[]` | Yes | At least one; every ID resolves. |
| `conservationNote` | `string` | Yes | Two to four sentences, plain language. |
| `sourceIds` | `SourceId[]` | Yes | At least one; every ID resolves. |

**Invariants**

- Exactly 18 `resident` countries exist, with this exact ID set: `mx, gt, bz, hn, ni, cr, pa, co,
  ve, gy, sr, gf, ec, pe, bo, br, py, ar`.
- `historical` entries (the United States, `us`) are excluded from the map and from the 18-county
  assertion; they may appear only in a clearly labelled note (FR-019).
- A `historical` country MUST NOT carry a population number.
- `conservationNote` MUST NOT contain a numeric population claim that is absent from
  `estimate` + `sourceIds`.

## PopulationEstimate

The jaguar population figure for one country. Discriminated union so that a missing estimate cannot
be confused with zero.

| Variant | Fields | Rules |
|---------|--------|-------|
| `number` | `kind: 'number'`, `value: number`, `referenceYear: number`, `sourceIds: SourceId[]`, `scopeNote?: string` | `value > 0`; `referenceYear` between 1990 and the current year; at least one source. |
| `range` | `kind: 'range'`, `min: number`, `max: number`, `referenceYear`, `sourceIds`, `scopeNote?` | `0 < min <= max`; at least one source. |
| `none` | `kind: 'none'`, `note: string`, `sourceIds` | MUST NOT carry `value`, `min`, `max`, or `referenceYear`; `note` MUST explain why no national estimate exists and name the covering source. |

**Invariants**

- Every `number`/`range` estimate renders its source citation and `referenceYear` in the same
  visible context (FR-006).
- No estimate may be derived by arithmetic at render time.

## Source

A citable document or dataset backing one or more claims.

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | `SourceId` | Yes | Unique, kebab-case (`iucn-2021-panthera-onca`). |
| `title` | `string` | Yes | Document or dataset title. |
| `publisher` | `string` | Yes | IUCN, WWF, Panthera, WCS, or a national agency. |
| `year` | `number` | Yes | 1990–current year. |
| `url` | `string` | Yes | `https://` only. |
| `accessedOn` | `string` | Yes | ISO date `YYYY-MM-DD`. |

**Invariants**

- Every `SourceId` referenced by any entity resolves to exactly one entry here.
- Every entry here is referenced by at least one claim (no orphan sources) and appears in the
  sources section (FR-013).

## HabitatType

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | `HabitatTypeId` | Yes | Unique. |
| `name` | `string` | Yes | Spanish name (`Selva tropical húmeda`). |
| `description` | `string` | Yes | One to three sentences. |
| `sourceIds` | `SourceId[]` | Yes | At least one. |

## Curiosity

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | `string` | Yes | Unique. |
| `title` | `string` | Yes | Under 60 characters. |
| `body` | `string` | Yes | 1–3 sentences, non-technical Spanish. |
| `sourceIds` | `SourceId[]` | Yes | At least one (FR-009). |

**Invariants**: at least 8 entries; no duplicate `title`; every claim sourced (SC-004).

## PreyItem

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | `string` | Yes | Unique. |
| `name` | `string` | Yes | Spanish name. |
| `category` | `'mammal' \| 'reptile' \| 'fish' \| 'bird' \| 'livestock'` | Yes | Rendered as a label. |
| `description` | `string` | Yes | One to two sentences. |
| `sourceIds` | `SourceId[]` | Yes | At least one (FR-011). |

**Invariants**: at least 5 entries (SC-009).

## Photograph

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | `string` | Yes | Unique. |
| `src` | `string` | Yes | Repo-relative asset path. |
| `srcAvif?` | `string` | No | Optional AVIF variant of the same dimensions. |
| `width` / `height` | `number` | Yes | Intrinsic pixel dimensions; max(width, height) ≥ 1200 (FR-012). |
| `alt` | `string` | Yes | ≥ 20 characters, describes the image, no "imagen de" prefix. |
| `caption` | `string` | Yes | Spanish caption. |
| `credit` | `string` | Yes | Author or institution (FR-012). |
| `license` | `string` | Yes | License name (`CC BY-SA 4.0`, `Unsplash License`, `Public domain`). |
| `licenseUrl` | `string` | Yes | `https://` URL to the license text. |

**Invariants**: at least 6 entries; `alt` non-empty and descriptive; dimensions reserved in markup
to prevent layout shift; no duplicate `src`.

## Relationships

```text
Source 1 ──< RangeCountry (sourceIds)
Source 1 ──< PopulationEstimate (sourceIds)
Source 1 ──< HabitatType (sourceIds)
Source 1 ──< Curiosity (sourceIds)
Source 1 ──< PreyItem (sourceIds)
RangeCountry >──< HabitatType (habitatIds)
RangeCountry 1 ──< PopulationEstimate (1, by composition)
Photograph (standalone, optional caption link to a RangeCountry)
```

## State Transitions (UI selection)

The only stateful entity is the current selection.

| State | Trigger | Result |
|-------|---------|--------|
| `idle` (no selection) | Page load | Panel shows an invitation to choose a country. |
| `idle` | Select country `C` | State `selected(C)`; panel shows `C`; `C` is `aria-pressed="true"`. |
| `selected(C)` | Select country `D` | State `selected(D)`; panel replaces content; `C` is deselected. Never a partial merge. |
| `selected(C)` | Select `C` again | State unchanged; no duplicate render, focus preserved. |
| `selected(C)` | Keyboard Escape | State `idle`; focus returns to the map/list control that was active. |

**Validation rules derived from the spec**

- A panel MUST never render a numeric estimate without source + year in the same visible context
  (FR-006, SC-003).
- A `none` estimate MUST render the explicit "sin estimación publicada" text and its note (FR-005).
- The 18-country set MUST be identical in the map, the list, and the content data (FR-003, SC-002).
