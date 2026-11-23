# Research: Jaguar Habitat Atlas

**Feature**: `001-jaguar-habitat-atlas` | **Date**: 2026-11-23

All Technical Context unknowns are resolved below. Every choice respects constitution Principle V
(simplicity) — each dependency is justified or rejected.

## R1. Application framework and build tool

- **Decision**: React 19 + TypeScript 5 (strict) built with Vite; a single static HTML entry.
- **Rationale**: The user mandated React + TypeScript; Vite gives an instant dev server, native TS
  and CSS Modules support, and static output, with no server runtime. The feature is one page of
  curated content, so no server rendering or routing is needed.
- **Alternatives considered**: Next.js (SSG) — adds a server/build framework, routing, and image
  pipeline for zero benefit on a static single page; rejected. Create React App — deprecated;
  rejected. Remix/Astro — server-first or multi-framework overhead; rejected.

## R2. Interactive map of the Americas

- **Decision**: An inline SVG map rendered by React, with country path data generated once,
  offline, from Natural Earth (public domain) and committed as a TypeScript module
  (`features/map/country-paths.ts`). Each country is a focusable element with
  `role="button"`, `tabIndex={0}`, `aria-pressed`, and `aria-label`.
- **Rationale**: Natural Earth is public domain, so there is no attribution or license constraint
  and no runtime network dependency. Committing simplified path data (a few KB) keeps the map
  deterministic, testable, and fast. Hand-rolled SVG avoids a geo dependency while meeting
  FR-001/FR-002.
- **Alternatives considered**: Leaflet or Mapbox GL — require tiles/network, keys, and heavier
  bundles; Mapbox licensing and tile usage policy add cost; rejected. `react-simple-maps` —
  pulls in d3-geo and topojson-client at runtime for a static map; rejected. Google Maps —
  requires an API key and a billing account, and does not render a continent-scale range map well;
  rejected. A raster image map with coordinates — not keyboard-accessible without extra work and
  not scalable; rejected.
- **Accessibility note**: FR-007's country list is not a fallback afterthought; it is the primary
  accessible path alongside the map, because 18 SVG buttons alone are usable but the list offers
  the same information with simpler semantics.

## R3. Content representation and validation (no database)

- **Decision**: Content lives in typed TypeScript modules under `src/content/`, exported with
  `satisfies` against domain types. Invariants are enforced at CI time by Vitest tests in
  `src/domain/invariants.test.ts` rather than by a runtime schema library.
- **Rationale**: Content is internal, trusted, compile-time constant data — there is no external
  input at runtime. The type system plus deterministic invariant tests (exactly 18 countries,
  estimate ⇒ source + year, no-estimate ⇒ no value, alt text present, image dimensions ≥ 1200 px,
  every referenced source ID resolves) give the same guarantee as a runtime schema without a
  runtime dependency. Constitution Principle III's "validated at the boundary" is satisfied at the
  build boundary.
- **Alternatives considered**: Zod runtime validation — adds ~12 KB gzipped and runtime cost for
  data that cannot be malformed after compilation; rejected. JSON files + manual types — loses
  compile-time checking of IDs and shapes; rejected. CMS or API — violates the no-database/no-
  backend constraint; rejected.

## R4. Styling

- **Decision**: CSS Modules with design tokens in `app/app.css` (`:root` custom properties for
  color, spacing, typography, radius, focus ring). No CSS framework.
- **Rationale**: Vite supports CSS Modules natively; scoping prevents style bleed; tokens make the
  focus ring and spacing consistent (WCAG basics, SC-006). No extra dependency, no build plugin.
- **Alternatives considered**: Tailwind — a build dependency and class-name churn for a one-page
  site; rejected. styled-components/emotion — runtime CSS-in-JS cost and hydration concerns;
  rejected. Global CSS only — invites bleed across features; rejected.

## R5. Photographs and licensing

- **Decision**: At least six photographs sourced from Wikimedia Commons or Unsplash, each with a
  recorded author, license name, and license URL in `content/photos.ts`. Images are downloaded,
  resized to serve variants, and committed under `assets/photos/` as WebP with an AVIF source when
  available; every image declares intrinsic width and height.
- **Rationale**: Local files remove runtime dependency on third-party hosts (reliability and
  privacy), guarantee the ≥1200 px criterion (FR-012), and let tests assert dimensions and alt
  text without network access. Declared dimensions prevent layout shift (SC-011 constraints).
- **Alternatives considered**: Hotlinking remote images — brittle, leaks visitor requests to third
  parties, breaks offline tests; rejected. Unsplash Source API — deprecated and unpredictable;
  rejected. Icons or illustrations only — the user explicitly asked for "buenas fotos"; rejected.

## R6. State management and selection flow

- **Decision**: Local `useState` inside `use-country-selection.ts` holding the selected country ID
  (or `null`); the panel is always rendered with a placeholder before selection. No global store,
  no URL state, no router.
- **Rationale**: One page, one piece of shared state. Lifting state to the page container keeps the
  map presentational and the panel pure. Avoiding URL/hash state keeps scope tight and avoids
  untested edge cases.
- **Alternatives considered**: URL hash deep links (`#pais=br`) — nice-to-have that adds parsing,
  history handling, and extra tests beyond the spec; deferred, not rejected on merit. Zustand or
  Redux — unjustified for a single boolean-ish value; rejected. React Context — indirection with no
  benefit at this depth; rejected.

## R7. Testing strategy

- **Decision**: Vitest + React Testing Library + `user-event` for all component behavior; jest-axe
  assertions on the page and the open panel; Playwright for two E2E journeys (select a country and
  read its panel; complete the same flow keyboard-only) plus a 360 px viewport smoke check.
  Test-first per Principle II: each FR gets a failing test before its implementation.
- **Rationale**: RTL asserts behavior through the user's surface (roles, labels, text), which is
  exactly what FR-004 to FR-019 describe. jest-axe catches missing accessible names and roles that
  manual review misses. E2E proves the two success criteria (SC-001, SC-006) that span layout and
  focus order.
- **Alternatives considered**: Enzyme — unmaintained and implementation-coupled; rejected.
  Snapshot-heavy testing — asserts markup, not behavior; rejected. Manual accessibility audit only
  — not repeatable in CI; kept as a complement, not the mechanism.
- **Determinism**: fake timers for any transition/animation assertions; no network in unit tests;
  fonts loaded locally or system stack; Playwright uses a fixed viewport and the local preview
  server.

## R8. Accessibility approach for the map and panel

- **Decision**: Country elements are announced as buttons with `aria-label` ("Brasil, ver población")
  and `aria-pressed` reflecting selection; the panel is a labelled region with
  `aria-live="polite"` on its heading area so selection changes are announced without stealing
  focus; the country list mirrors the same controls; focus ring is a token-driven outline visible on
  all backgrounds.
  `prefers-reduced-motion` disables transitions via a media query.
- **Rationale**: Meets FR-014 and FR-016 with standard platform semantics, no ARIA widget library.
  Announcing the panel heading rather than moving focus keeps keyboard position stable (edge case
  about re-selecting a country).
- **Alternatives considered**: A combobox/listbox composite widget — more ARIA states to get right
  than the information structure needs; rejected. Forcing focus into the panel on selection — loses
  the visitor's place in a long country list; rejected.

## R9. Data sourcing policy for population figures

- **Decision**: Population figures are drawn only from IUCN, WWF, Panthera, WCS, or national
  wildlife agencies (for example CONANP in Mexico, ICMBio in Brazil, SERFOR in Peru), each recorded
  with a reference year and a link. Where a country lacks a published national estimate, the
  content records `kind: 'none'` with a note naming the regional or global source that covers it.
  Nothing is interpolated, summed, or extrapolated.
- **Rationale**: Satisfies FR-005, FR-006, FR-018 and SC-002/SC-003/SC-010. It also makes the
  content honest about uncertainty (Assumptions: estimates are ranges).
- **Alternatives considered**: A single global estimate divided per country — fabricates national
  figures; prohibited. Aggregator sites of unknown provenance — untraceable; rejected. Wikipedia
  as a primary source — acceptable only to locate the underlying citation, never as the citation.

## R10. Definition of done for content

- **Decision**: Content is done only when every one of the 18 countries has a populated record, each
  curiosity and prey item resolves to a source, and the sources section lists every source used.
- **Rationale**: Prevents partially filled panels, dangling references, and invisible provenance.
  A dedicated content invariant test enforces it so the check is not manual.
- **Alternatives considered**: Editorial review only — not repeatable and easy to regress; rejected
  as the sole mechanism (it remains a complement).
