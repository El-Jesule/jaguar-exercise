# Implementation Plan: Jaguar Habitat Atlas

**Branch**: `001-jaguar-habitat-atlas` (no git repository initialized; branch name reserved for the feature) | **Date**: 2026-11-23 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-jaguar-habitat-atlas/spec.md`

## Summary

Build a single-page, statically hosted Spanish-language web experience about jaguars. The page
shows an interactive map of the Americas where each of the 18 current range countries is
selectable and reveals a sourced population panel; it also features a prominent "best feline on
the planet" statement, a curiosities section, a hunting and prey section, a credited photo
gallery, and a consolidated sources list. All content is curated, typed, and shipped at build
time — no backend, no database, no runtime data fetching.

Technical approach: React 19 + TypeScript (strict) on Vite; a hand-controlled inline SVG map with
committed public-domain path data (no runtime geo libraries); typed content modules validated by
CI invariant tests; CSS Modules with design tokens; Vitest + React Testing Library + jest-axe for
behavior and accessibility, Playwright for two critical end-to-end journeys.

## Technical Context

**Language/Version**: TypeScript 5.x (`strict`), React 19, Node.js 20 LTS for tooling

**Primary Dependencies**: react, react-dom, vite, vitest, @testing-library/react,
@testing-library/user-event, @testing-library/jest-dom, jest-axe, @playwright/test, eslint,
typescript-eslint, eslint-plugin-react-hooks, prettier. No runtime dependency beyond React.

**Storage**: N/A — no database and no persistence. Content lives in typed source modules
(`src/content/`) bundled at build time; no cookies, no localStorage, no user data.

**Testing**: Vitest + React Testing Library + user-event for unit/component behavior; jest-axe for
automated accessibility assertions; Playwright for two end-to-end journeys (country exploration and
keyboard-only navigation). Every behavior change is test-first per constitution Principle II.

**Target Platform**: Modern evergreen browsers (last two versions of Chrome, Firefox, Safari,
Edge), responsive from 360 px to desktop, static hosting (any CDN or static file server).

**Project Type**: Single-project frontend web application (static single page).

**Performance Goals**: Meaningful content visible within 3 s on a typical mobile connection
(SC-011); LCP ≤ 2.5 s on a mid-tier mobile device over 4G; initial JS ≤ 200 KB gzipped; no layout
shift from images (intrinsic dimensions reserved).

**Constraints**: No backend, no database, no authentication, no analytics, no runtime network
calls for content; WCAG 2.1 AA basics; Spanish (Latin American) copy; every numeric population
claim shows source and reference year; photographs must be licensed, credited, and at least
1200 px on the longest side; map must be operable with keyboard and pointer/touch.

**Scale/Scope**: One page, 18 range countries, 8+ curiosities, 5+ prey items, 6+ photographs, one
sources list; no routing, no accounts, no user-generated content.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Clean Code** (I): Feature-oriented modules with one responsibility each; domain types and
      selectors are framework-free; naming uses domain terms (`RangeCountry`, `PopulationEstimate`);
      no dead code. PASS.
- [x] **Tests Always, Test-First** (II): Every requirement gets a failing test first: selection
      behavior, no-estimate state, source/year rendering, keyboard operability, content invariants,
      responsive layout, reduced motion. Playwright covers the two critical journeys. PASS.
- [x] **React + TypeScript** (III): React 19 function components, `strict`, no `any`, typed props,
      no `React.FC`, hooks confined, render pure, side effects only at edges. PASS.
- [x] **Separation of Concerns** (IV): `domain/` (pure types + selectors), `content/` (typed data),
      `features/*` (UI + hooks), `components/` (shared primitives); components receive props, no
      fetching inside components. PASS.
- [x] **Simplicity** (V): Zero runtime dependencies beyond React; no routing library, no state
      manager, no CSS framework, no geo library; each addition rejected with a recorded rationale in
      `research.md`. PASS.

**Gate result**: PASS — no violations, no Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/001-jaguar-habitat-atlas/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── content-schema.md    # Typed content + invariant contract
│   └── ui-interaction.md    # User-facing interaction contract
├── checklists/
│   └── requirements.md  # Spec quality checklist (from /speckit.specify)
└── tasks.md             # Phase 2 output (/speckit.tasks — not created here)
```

### Source Code (repository root)

```text
src/
├── main.tsx                    # Entry point
├── app/
│   ├── App.tsx                 # Page composition (containers only, no business rules)
│   └── app.css                 # Tokens + global styles
├── domain/
│   ├── types.ts                # RangeCountry, Source, Curiosity, PreyItem, HabitatType, Photograph
│   ├── selectors.ts            # Pure lookups and derived values (habitats for a country, etc.)
│   └── invariants.ts           # Pure validation predicates used by content tests
├── content/
│   ├── sources.ts              # Source registry
│   ├── countries.ts            # 18 range countries + historical-presence note
│   ├── habitats.ts             # Habitat type definitions
│   ├── curiosities.ts          # Curiosities copy
│   ├── hunting.ts              # Hunting method copy
│   ├── prey.ts                 # Prey items
│   └── photos.ts               # Photo metadata (credit, license, alt, dimensions)
├── features/
│   ├── map/
│   │   ├── JaguarMap.tsx           # SVG map, presentational
│   │   ├── CountryShape.tsx        # One selectable path/button
│   │   ├── country-paths.ts        # Committed public-domain path data (generated offline)
│   │   └── country-list.tsx        # Accessible country list alternative
│   ├── country-panel/
│   │   ├── CountryPanel.tsx        # Panel presentational
│   │   └── use-country-selection.ts # Selection state (useState)
│   ├── hero/Hero.tsx               # "Best feline" statement block
│   ├── curiosities/CuriositiesSection.tsx
│   ├── hunting/HuntingSection.tsx
│   ├── gallery/PhotoGallery.tsx
│   └── sources/SourcesSection.tsx
├── components/                 # Shared primitives (Section, Figure, Badge, ExternalLink)
└── assets/photos/              # (unused; photos live in public/photos per research R5)

tests/e2e/                      # Playwright journeys (not Playwright unit specs)
```

**Structure Decision**: Single-project frontend. Feature-oriented folders keep each section's UI,
hooks, and tests together (Principle IV); `domain/` and `content/` stay framework-free so they run
in plain Vitest with no DOM. Colocated unit tests (`*.test.ts[x]`) sit beside the code they cover;
end-to-end journeys live in `tests/e2e/`.

## Complexity Tracking

> No constitution violations. Nothing to justify.
