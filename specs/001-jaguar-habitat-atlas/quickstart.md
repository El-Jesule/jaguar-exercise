# Quickstart: Jaguar Habitat Atlas

**Feature**: `001-jaguar-habitat-atlas` | **Date**: 2026-11-23

A run-and-verify guide. It proves the feature works end to end; implementation detail lives in
`tasks.md`.

## Prerequisites

- Node.js 20 LTS and npm
- A modern Chromium, Firefox, or WebKit browser
- No database, no environment variables, no API keys (see `plan.md` Technical Context)

## Setup

```bash
npm install
npm run dev          # serves the app at http://localhost:5173
```

## Quality gates (constitution + CI)

```bash
npm run lint         # ESLint, must exit 0
npm run typecheck    # tsc --noEmit, must exit 0
npm test             # Vitest: unit, component, content invariants, a11y
npm run test:e2e     # Playwright: two critical journeys + 360 px smoke
npm run build        # production build must succeed
npm run preview      # serve the built output for the final manual pass
```

Every command is expected to exit `0`. A red test is a blocked feature, not a warning.

## Validation scenarios

Each scenario references the success criterion it proves and can be executed against `npm run dev`
or `npm run preview`.

### V1 — Country-specific information in two interactions (SC-001)

1. Open the page.
2. Activate `Brasil` on the map.
3. Expect the panel titled `Población de jaguares en Brasil` with a figure, `Estimación de <año>`,
   a source citation, a trend label, habitats, and a conservation note.
   **Pass**: all fields visible without further interaction.

### V2 — All 18 range countries, each complete (SC-002)

1. Expand the country list.
2. Count the entries and compare with `mx, gt, bz, hn, ni, cr, pa, co, ve, gy, sr, gf, ec, pe, bo,
   br, py, ar`.
3. Open each one in turn.
   **Pass**: 18 entries, each showing either a sourced estimate with its year or
   `Sin estimación publicada` with a note.

### V3 — Every figure is dated and sourced (SC-003)

1. Open a panel with a numeric estimate.
2. Read the figure's block.
   **Pass**: source name/link and reference year appear in the same visible block. Repeat for
   several countries; no figure appears without a year.

### V4 — Curiosities are sourced (SC-004)

1. Scroll to `Curiosidades del jaguar`.
2. Count entries and follow a sample of sources.
   **Pass**: at least 8 distinct curiosities; every one has a reachable source.

### V5 — Photos are credited and described (SC-005)

1. Scroll to `Galería de fotos`.
2. Inspect each image.
   **Pass**: at least 6 images; every image has descriptive alt text, a visible credit, a license,
   and a license link.

### V6 — Keyboard-only journey (SC-006)

1. Press Tab from the top of the page.
2. Reach a country control, confirm the focus ring is visible, press Enter, then Space on another.
3. Read the resulting panel.
4. Continue tabbing to the country list and repeat.
   **Pass**: every one of the 18 countries is reachable and activatable; the panel is announced;
   no control lacks a visible focus indicator or accessible name.

### V7 — Mobile width (SC-007)

1. Set the viewport to 360 px wide (or use a device emulator).
2. Scroll the whole page.
   **Pass**: no horizontal scrollbar; text readable; map, panel, and gallery usable.

### V8 — Best feline statement is immediate (SC-008)

1. Open the page without scrolling or clicking.
   **Pass**: the "mejor felino del planeta" statement is visible in the initial viewport.

### V9 — Hunting and prey (SC-009)

1. Scroll to `Cómo caza el jaguar`.
2. Read the method and the prey list.
   **Pass**: the method explains ambush/stalking, the skull-or-neck bite, swimming, and activity
   periods; at least 5 prey items are listed with descriptions and sources.

### V10 — No unsourced claims (SC-010)

1. Run `npm test` (the content invariant suite, INV-01..INV-14).
2. Skim the page for numbers.
   **Pass**: the suite is green and no number appears without a source and year.

### V11 — Perceived load (SC-011)

1. Open DevTools → Network → throttle to "Fast 3G" and clear cache.
2. Reload.
   **Pass**: meaningful content is visible within 3 seconds; the gallery does not cause layout
   shift while images load.

### V12 — Reduced motion and re-selection edge cases

1. Enable the OS/browser "reduce motion" preference and reload.
   **Pass**: transitions are off.
2. Activate the selected country again, then press Escape.
   **Pass**: no duplicate render, no lost focus; Escape returns the panel to its invitation state
   and keeps focus where it was.

## Troubleshooting

- **Map renders blank**: confirm `features/map/country-paths.ts` exists; it is committed, not
  downloaded at runtime.
- **Photos missing**: confirm `src/assets/photos/` matches `content/photos.ts`; INV-13 fails loudly
  when they disagree.
- **A country shows `Sin estimación publicada` unexpectedly**: that is the correct behavior when no
  national estimate is published; verify the note names the covering source.

## Verification log — 2026-11-23

Observed on the implementation at branch `001-jaguar-habitat-atlas` (no git remote push).

| Command | Result |
|---------|--------|
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm test` | 25 files, 106 tests passed |
| `npm run test:e2e` | 36 passed (12 journeys x Chromium, Firefox, WebKit) |
| `npm run build` | success; initial JS 84.04 KB gzip (budget 200 KB) |

| Scenario | Result | How it was checked |
|----------|--------|--------------------|
| V1 two-interaction country info | PASS | E2E `country-exploration.spec.ts` |
| V2 all 18 countries complete | PASS | E2E list counts 1 + 6 + 11; invariant INV-01 |
| V3 every figure dated and sourced | PASS | Unit `CountryPanelEstimate` + invariant INV-03 |
| V4 curiosities sourced | PASS | E2E `content-provenance.spec.ts`; invariant INV-07 |
| V5 photos credited and described | PASS | E2E gallery check; invariants INV-09 and INV-13 |
| V6 keyboard-only journey | PASS | E2E `keyboard-navigation.spec.ts` (all 18 countries) |
| V7 360 px, no horizontal scroll | PASS | E2E `responsive.spec.ts` |
| V8 best feline statement immediate | PASS | E2E `content-provenance.spec.ts`; `Hero.test.tsx` |
| V9 hunting and prey | PASS | E2E hunting check; invariant INV-08 |
| V10 no unsourced claims | PASS | Full `validateContent(atlasContent)` returns no problems |
| V11 perceived load | PASS with caveat | FCP 1000 ms and heading visible at 1134 ms on the production build, emulating Fast 3G (1.6 Mbps, 150 ms latency) and 4x CPU throttling at 390x844. Not measured on physical devices. |
| V12 reduced motion and re-selection | PASS | E2E reduced-motion check; `App.test.tsx` Escape and re-selection tests |

Known gaps at the time of this log:

- Population figures beyond Mexico are intentionally absent (no national estimate published), so
  most panels show the explicit no-estimate state.
- The WWF page returns HTTP 403 to automated requests while remaining reachable from a browser; the
  IUCN species page was dropped because its URL returned 404 instead of being guessed.
