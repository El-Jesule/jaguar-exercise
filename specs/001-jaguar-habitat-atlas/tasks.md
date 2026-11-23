---

description: "Task list for the Jaguar Habitat Atlas feature"
---

# Tasks: Jaguar Habitat Atlas

**Input**: Design documents from `/specs/001-jaguar-habitat-atlas/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: MANDATORY (constitution Principle II). Every behavior gets a failing test before its
implementation. Tasks are deliberately short so each one is a single reviewable step.

**Organization**: Grouped by user story so each story is independently implementable and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Which user story the task belongs to (US1, US2, US3)
- Every task names the exact file it touches

## Path Conventions

Single-project frontend: `src/` for application code, colocated `*.test.ts[x]` beside the code,
`tests/e2e/` for Playwright, `src/assets/photos/` for images.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling

- [ ] T001 Create the Vite + React + TypeScript project scaffold in `package.json` and `index.html`
- [ ] T002 Enable `strict` TypeScript settings in `tsconfig.json`
- [ ] T003 Configure ESLint with typescript-eslint and react-hooks rules in `eslint.config.js`
- [ ] T004 Configure Prettier in `.prettierrc.json`
- [ ] T005 Configure Vitest with jsdom and a setup file in `vitest.config.ts` and `src/test/setup.ts`
- [ ] T006 Configure Playwright with a local preview server in `playwright.config.ts`
- [ ] T007 Add `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, and `test:e2e` scripts to `package.json`
- [ ] T008 Create the folder skeleton (`src/domain`, `src/content`, `src/features`, `src/components`, `src/assets/photos`, `tests/e2e`) with `.gitkeep` placeholders
- [ ] T009 Add design tokens and global styles (colors, spacing, type scale, focus ring) in `src/app/app.css`
- [ ] T010 Set `lang="es"`, title, and meta description in `index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Types, selectors, primitives, and the page shell every story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T011 Define all content entity types in `src/domain/types.ts` per `contracts/content-schema.md`
- [x] T012 Implement `getResidentCountries` and `getCountry` in `src/domain/selectors.ts`
- [x] T013 Implement `getHabitatsFor` and `getSourcesFor` in `src/domain/selectors.ts`
- [x] T014 Implement `formatEstimate` returning the no-estimate text for `kind: 'none'` in `src/domain/selectors.ts`
- [x] T015 Implement `getHistoricalPresenceNote` in `src/domain/selectors.ts`
- [x] T016 Write unit tests for every selector in `src/domain/selectors.test.ts`
- [x] T017 Implement the invariant predicate helpers in `src/domain/invariants.ts`
- [x] T018 Create the empty typed source registry in `src/content/sources.ts`
- [x] T019 Implement the `Section` landmark primitive in `src/components/Section.tsx`
- [x] T020 Test `Section` renders its landmark with an accessible name in `src/components/Section.test.tsx`
- [x] T021 Implement the `ExternalLink` primitive with `rel="noreferrer noopener"` in `src/components/ExternalLink.tsx`
- [x] T022 Test `ExternalLink` opens safely and exposes its label in `src/components/ExternalLink.test.tsx`
- [x] T023 Implement the `Figure` primitive with reserved aspect ratio in `src/components/Figure.tsx`
- [x] T024 Test `Figure` reserves dimensions and renders alt text in `src/components/Figure.test.tsx`
- [ ] T025 Create the page shell with all region landmarks in `src/app/App.tsx`
- [ ] T026 Test the shell renders every region in order in `src/app/App.test.tsx`
- [x] T027 Add the responsive map/panel grid (stacked under 1024 px) in `src/app/app.css`

**Checkpoint**: Types, primitives, and shell ready — user stories can start.

---

## Phase 3: User Story 1 - Explore jaguar range by country (Priority: P1) 🎯 MVP

**Goal**: An interactive Americas map where every range country is selectable and reveals a
sourced population panel.

**Independent Test**: Open the page, select a country, and confirm the panel shows that country's
figure (or the explicit no-estimate state), trend, habitats, and source with its reference year.

### Tests for User Story 1 (write first, must fail) ⚠️

- [ ] T028 [P] [US1] Write a failing test that the map renders all 18 range countries in `src/features/map/JaguarMap.test.tsx`
- [ ] T029 [P] [US1] Write a failing test that selecting a country renders its panel in `src/features/country-panel/CountryPanel.test.tsx`
- [ ] T030 [P] [US1] Write a failing test for the explicit no-estimate panel state in `src/features/country-panel/CountryPanelNone.test.tsx`
- [ ] T031 [P] [US1] Write a failing test that a numeric estimate shows its year and source in one block in `src/features/country-panel/CountryPanelEstimate.test.tsx`
- [ ] T032 [P] [US1] Write a failing test that a range estimate shows min, max, year, and source in `src/features/country-panel/CountryPanelRange.test.tsx`
- [ ] T033 [P] [US1] Write a failing keyboard test (Enter, Space, visible focus, `aria-pressed`) in `src/features/map/keyboard.test.tsx`
- [ ] T034 [P] [US1] Write a failing test that re-selecting the same country is idempotent in `src/features/country-panel/useCountrySelection.test.ts`
- [ ] T035 [P] [US1] Write a failing test that Escape clears the selection and keeps focus in `src/features/country-panel/useCountrySelection.test.ts`
- [ ] T036 [P] [US1] Write a failing test that the country list exposes the same 18 countries in `src/features/map/CountryList.test.tsx`
- [ ] T037 [P] [US1] Write failing content invariant tests INV-01..INV-12 and INV-14 in `src/domain/invariants.test.ts`
- [ ] T038 [P] [US1] Write a failing axe accessibility test for map plus panel in `src/features/map/a11y.test.tsx`

### Content for User Story 1

- [ ] T039 [P] [US1] Add habitat type records with sources in `src/content/habitats.ts`
- [ ] T040 [P] [US1] Add regional and global source records (IUCN, WWF, Panthera, WCS) in `src/content/sources.ts`
- [ ] T041 [US1] Add Mexico, Guatemala, Belize, Honduras, Nicaragua, Costa Rica, and Panama records in `src/content/countries.ts`
- [ ] T042 [US1] Add Colombia, Venezuela, Guyana, Suriname, French Guiana, and Ecuador records in `src/content/countries.ts`
- [ ] T043 [US1] Add Peru, Bolivia, Brazil, Paraguay, and Argentina records in `src/content/countries.ts`
- [ ] T044 [US1] Add the United States historical-presence note as a `historical` record in `src/content/countries.ts`
- [ ] T045 [US1] Verify every figure against its cited source and record access dates in `src/content/sources.ts`

### Implementation for User Story 1

- [ ] T046 [US1] Generate simplified country path data from Natural Earth into `src/features/map/country-paths.ts`
- [ ] T047 [US1] Implement `CountryShape` as a focusable, labelled button-like path in `src/features/map/CountryShape.tsx`
- [ ] T048 [US1] Implement the `JaguarMap` SVG frame and country rendering in `src/features/map/JaguarMap.tsx`
- [ ] T049 [US1] Add keyboard activation and `aria-pressed` wiring in `src/features/map/CountryShape.tsx`
- [ ] T050 [US1] Add hit-area sizing of at least 32×32 px in `src/features/map/map.module.css`
- [ ] T051 [US1] Implement the subregion-grouped country list in `src/features/map/country-list.tsx`
- [ ] T052 [US1] Implement selection state with idempotent re-select and Escape reset in `src/features/country-panel/use-country-selection.ts`
- [ ] T053 [US1] Implement the panel shell and no-selection invitation in `src/features/country-panel/CountryPanel.tsx`
- [ ] T054 [US1] Render the estimate block (number or range) with year and citation in `src/features/country-panel/CountryPanel.tsx`
- [ ] T055 [US1] Render the no-estimate state with its explanatory note in `src/features/country-panel/CountryPanel.tsx`
- [ ] T056 [US1] Render the trend badge with a text label in `src/features/country-panel/TrendBadge.tsx`
- [ ] T057 [US1] Render habitats and the conservation note from selectors in `src/features/country-panel/CountryPanel.tsx`
- [ ] T058 [US1] Add `aria-live="polite"` announcement on the panel heading in `src/features/country-panel/CountryPanel.tsx`
- [ ] T059 [US1] Implement the aggregated sources section with access dates in `src/features/sources/SourcesSection.tsx`
- [ ] T060 [US1] Wire map, country list, and panel together in `src/app/App.tsx`
- [ ] T061 [US1] Test the sources section lists every registered source in `src/features/sources/SourcesSection.test.tsx`
- [ ] T062 [US1] Write the E2E journey that selects Brasil and reads the panel in `tests/e2e/country-exploration.spec.ts`
- [ ] T063 [US1] Write the E2E keyboard-only country journey in `tests/e2e/keyboard-navigation.spec.ts`
- [ ] T064 [US1] Run `npm test`, `npm run typecheck`, and `npm run lint` and fix failures across `src/`

**Checkpoint**: User Story 1 is fully functional and independently testable (MVP).

---

## Phase 4: User Story 2 - Best feline statement and curiosities (Priority: P2)

**Goal**: A prominent "best feline on the planet" statement plus a sourced curiosities section and
a credited photo gallery.

**Independent Test**: Load the page, confirm the statement is visible without interaction, then
count at least eight sourced curiosities and six credited, described photos.

### Tests for User Story 2 (write first, must fail) ⚠️

- [ ] T065 [P] [US2] Write a failing test that the hero statement is visible on first render in `src/features/hero/Hero.test.tsx`
- [ ] T066 [P] [US2] Write a failing test for at least eight curiosities, each with a source link, in `src/features/curiosities/CuriositiesSection.test.tsx`
- [ ] T067 [P] [US2] Write a failing test for at least six photos with alt, credit, and license in `src/features/gallery/PhotoGallery.test.tsx`
- [ ] T068 [P] [US2] Write a failing test that a broken image keeps its caption and credit visible in `src/components/Figure.test.tsx`
- [ ] T069 [P] [US2] Write a failing axe test for hero, curiosities, and gallery in `src/features/gallery/a11y.test.tsx`

### Implementation for User Story 2

- [ ] T070 [US2] Implement the hero block with the "mejor felino del planeta" statement in `src/features/hero/Hero.tsx`
- [ ] T071 [P] [US2] Write eight-plus sourced curiosities in `src/content/curiosities.ts`
- [ ] T072 [US2] Implement the curiosity card with its source link in `src/features/curiosities/CuriosityCard.tsx`
- [ ] T073 [US2] Implement the curiosities section wrapper in `src/features/curiosities/CuriositiesSection.tsx`
- [ ] T074 [P] [US2] Source, license-check, and commit at least six photographs to `src/assets/photos/`
- [ ] T075 [US2] Write photo metadata (credit, license, license URL, alt, dimensions) in `src/content/photos.ts`
- [ ] T076 [US2] Implement the gallery grid with reserved aspect ratios in `src/features/gallery/PhotoGallery.tsx`
- [ ] T077 [US2] Add lazy loading and optional AVIF source handling in `src/components/Figure.tsx`
- [ ] T078 [US2] Add the image-error fallback that preserves caption and credit in `src/components/Figure.tsx`
- [ ] T079 [US2] Mount hero, curiosities, and gallery in `src/app/App.tsx`
- [ ] T080 [US2] Add an E2E check that curiosity sources are reachable links in `tests/e2e/content-provenance.spec.ts`
- [ ] T081 [US2] Run `npm test`, `npm run typecheck`, and `npm run lint` and fix failures across `src/`

**Checkpoint**: User Story 2 works independently of User Story 3.

---

## Phase 5: User Story 3 - How jaguars hunt and what they eat (Priority: P3)

**Goal**: A sourced explanation of the jaguar's hunting method and its habitual prey.

**Independent Test**: Read the hunting section and confirm it explains ambush/stalking, the
skull-or-neck bite, swimming, and activity periods, and lists at least five sourced prey items.

### Tests for User Story 3 (write first, must fail) ⚠️

- [ ] T082 [P] [US3] Write a failing test that the hunting method covers the four required points in `src/features/hunting/HuntingSection.test.tsx`
- [ ] T083 [P] [US3] Write a failing test that at least five prey items render with category and source in `src/features/hunting/PreyList.test.tsx`
- [ ] T084 [P] [US3] Write a failing axe test for the hunting section in `src/features/hunting/a11y.test.tsx`

### Implementation for User Story 3

- [ ] T085 [P] [US3] Write the hunting method copy with sources in `src/content/hunting.ts`
- [ ] T086 [P] [US3] Write at least five prey items with descriptions and sources in `src/content/prey.ts`
- [ ] T087 [US3] Implement the hunting method block in `src/features/hunting/HuntingSection.tsx`
- [ ] T088 [US3] Implement the prey list with category labels in `src/features/hunting/PreyList.tsx`
- [ ] T089 [US3] Mount the hunting section in `src/app/App.tsx`
- [ ] T090 [US3] Add hunting and prey sources to the aggregated sources section in `src/content/sources.ts`
- [ ] T091 [US3] Run `npm test`, `npm run typecheck`, and `npm run lint` and fix failures across `src/`

**Checkpoint**: All three stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, mobile behavior, performance, and end-to-end verification

- [ ] T092 Verify and fix the 360 px layout with no horizontal scroll in `src/app/app.css`
- [ ] T093 Add the `prefers-reduced-motion` disabling rule in `src/app/app.css`
- [ ] T094 Write the INV-13 filesystem test that every photo file exists in `src/domain/invariants.test.ts`
- [ ] T095 Add the initial-JS size budget assertion (≤ 200 KB gzip) in `scripts/check-bundle-size.mjs`
- [ ] T096 Add the bundle-size check to the `build` script in `package.json`
- [ ] T097 Run a full-page axe audit and fix findings in `src/features/`
- [ ] T098 Verify no `localStorage`, cookie, or network call exists in `src/` with a source scan test in `src/app/app.test.ts`
- [ ] T099 Add Firefox and WebKit to the Playwright projects in `playwright.config.ts`
- [ ] T100 Document run commands and the data-provenance policy in `README.md`
- [ ] T101 Execute quickstart scenarios V1..V12 and record results in `specs/001-jaguar-habitat-atlas/quickstart.md`
- [ ] T102 Run the final gate (`lint`, `typecheck`, `test`, `test:e2e`, `build`) and fix any failure across `src/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Stories (Phases 3-5)**: Depend on Foundational; then independent of each other
  - US1 (P1) is the MVP and is delivered first
  - US2 (P2) and US3 (P3) can run in parallel once Foundational is complete, except where they
    both edit `src/app/App.tsx` (T079, T089) — the parent owns that file or the tasks run in
    sequence
- **Polish (Phase 6)**: Depends on all desired stories

### User Story Dependencies

- **US1 (P1)**: No dependency on other stories
- **US2 (P2)**: No dependency on US1 or US3; only the shared `Figure` primitive and the app shell
- **US3 (P3)**: No dependency on US1 or US2; only the shared `Section` primitive and the app shell

### Within Each Story

- Tests first (RED), then content, then implementation (GREEN), then the story-level gate
- Content before components (components read from `src/content/`)
- Primitives before sections; sections before mounting into `src/app/App.tsx`

### Same-File Sequencing (no [P])

- T041, T042, T043, T044 all edit `src/content/countries.ts` — run in order
- T028-T038 test files are separate; the tests that touch one shared file are marked accordingly
- T053-T058 all edit `src/features/country-panel/CountryPanel.tsx` — run in order
- T076-T078 all edit `src/features/gallery/PhotoGallery.tsx` and `src/components/Figure.tsx`

---

## Parallel Example: User Story 1

```bash
# Launch the independent RED tests together (different files):
Task: "T028 map renders 18 countries - src/features/map/JaguarMap.test.tsx"
Task: "T030 no-estimate panel - src/features/country-panel/CountryPanelNone.test.tsx"
Task: "T033 keyboard operability - src/features/map/keyboard.test.tsx"
Task: "T037 content invariants - src/domain/invariants.test.ts"
Task: "T038 axe accessibility - src/features/map/a11y.test.tsx"
```

```bash
# Content that can be authored in parallel (different files):
Task: "T039 habitat records - src/content/habitats.ts"
Task: "T040 source records - src/content/sources.ts"
```

## Parallel Example: User Stories 2 and 3 after Foundational

```bash
Task: "T065 hero test - src/features/hero/Hero.test.tsx"
Task: "T082 hunting method test - src/features/hunting/HuntingSection.test.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 (T001-T010)
2. Complete Phase 2 (T011-T027)
3. Complete Phase 3 (T028-T064)
4. **STOP and VALIDATE**: run quickstart V1, V2, V3, V6, and V10
5. Demo the map with sourced country panels

### Incremental Delivery

1. Setup + Foundational → shell and types ready
2. US1 → map, panel, sources → MVP
3. US2 → hero statement, curiosities, gallery
4. US3 → hunting and prey
5. Polish → mobile, performance, full audit

---

## Notes

- Tests are not optional here; the constitution makes them mandatory for every behavior
- `[P]` means different files and no incomplete dependency; never parallelize two edits to the same file
- Every figure needs a source and year in the same visible block; an unsourced number is a defect
- Commit after each task or small group; keep tests and code in the same commit
- Stop at each checkpoint to validate the story independently
