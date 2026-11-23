# Contract: UI Interaction

**Feature**: `001-jaguar-habitat-atlas` | **Version**: 1.0.0 | **Date**: 2026-11-23

This contract defines what the visitor can rely on. Every clause maps to a functional requirement
and is verified by an automated test (RTL or Playwright). Clauses are normative.

## C1. Page composition

The page renders, top to bottom, these labelled regions:

| Region | Accessible name | Content |
|--------|-----------------|---------|
| Hero | `Jaguar: el mejor felino del planeta` | Prominent editorial statement that the jaguar is the best feline on the planet, visible without interaction (FR-008, SC-008) |
| Map | `Mapa del hábitat del jaguar` | Interactive map plus the country list alternative (FR-001, FR-007) |
| Panel | `Población de jaguares en {país}` | Details for the selected country, or an invitation when nothing is selected (FR-004) |
| Curiosities | `Curiosidades del jaguar` | At least 8 curiosities, each with a source link (FR-009) |
| Hunting | `Cómo caza el jaguar` | Hunting method plus habitual prey list (FR-010, FR-011) |
| Gallery | `Galería de fotos` | At least 6 credited photographs (FR-012) |
| Sources | `Fuentes` | Every source with title, publisher, year, link (FR-013) |

## C2. Country selection

- **Pointer/touch**: activating a country's hit area selects it. The hit area is at least 32×32 CSS
  pixels and does not overlap another country's hit area.
- **Keyboard**: every country is in the tab order once, has an accessible name
  (`Ver población de {país}`), shows a visible focus ring, and activates with Enter and Space.
- **State**: the selected country exposes `aria-pressed="true"`; all others expose
  `aria-pressed="false"`.
- **Idempotence**: activating the already-selected country changes nothing and does not move focus.
- **Announcement**: after selection, the panel heading region carries `aria-live="polite"`; focus
  stays on the activated control (FR-014).
- **Reset**: pressing Escape inside the map or list clears the selection, returns the panel to the
  invitation state, and keeps focus on the control that was active.
- **List parity**: the country list exposes the same 18 countries in the same order, under
  subregion headings, each with the same accessible name pattern, and selecting from either place
  updates the same panel (FR-007).

## C3. Panel states

| State | Visible content |
|-------|-----------------|
| No selection | Invitation text telling the visitor to choose a country on the map or in the list. |
| `number` estimate | `"{value} jaguares"`, `"Estimación de {referenceYear}"`, source citation, trend label, habitats, conservation note. |
| `range` estimate | `"Entre {min} y {max} jaguares"`, `"Estimación de {referenceYear}"`, source citation, trend label, habitats, conservation note. |
| `none` estimate | `"Sin estimación publicada"`, the explanatory note, and the covering source citation. Never `0`, never a dash alone. |

Every numeric figure appears with its year and source in the same visible block (FR-006).

## C4. Media

- Each photograph renders inside a reserved aspect-ratio box using its intrinsic dimensions; no
  layout shift when it loads.
- Each photograph has non-empty alt text describing the image (FR-012).
- Credit and license are visible on or beside the image, and the license links to its text.
- If an image fails to load, the caption, credit, and alt text remain visible and the layout does
  not collapse.

## C5. Adaptation

- At 360 px width there is no horizontal scrolling; text reflows, the map scales, and the panel
  moves below the map (FR-015, SC-007).
- At ≥ 1024 px the map and panel sit side by side.
- With `prefers-reduced-motion: reduce`, transitions and any transform-based motion are disabled
  (FR-016).

## C6. Language and tone

- All visible copy is Spanish (Latin American) (FR-017).
- The "best feline on the planet" statement is editorial and prominent; ecological facts around it
  remain sourced and neutral.
- Animal-welfare-sensitive content (hunting) is described factually and neutrally, without
  sensationalism.

## C7. Provenance

- Every curiosity, prey item, habitat, and country note ends with or links to its source(s).
- The Sources section lists every source used, each with title, publisher, year, and a link, and
  includes the access date (FR-013, FR-018).
- No element displays a population number without a source and year (SC-003, SC-010).

## C8. Forbidden behaviors

- Selecting a country MUST NOT trigger a network request.
- The page MUST NOT store anything in `localStorage`, `sessionStorage`, cookies, or a database.
- The page MUST NOT show a placeholder number (e.g. `0`, `N/A`, `--`) where an estimate is absent;
  it shows the explicit no-estimate state instead.
- The page MUST NOT autoplay audio or video.
- The map MUST NOT rely on color alone to convey selection or data; selection also changes
  `aria-pressed` and a visible outline.
