# Feature Specification: Jaguar Habitat Atlas

**Feature Branch**: `001-jaguar-habitat-atlas`

**Created**: 2026-11-23

**Status**: Draft

**Input**: User description: "Crea una página web interactiva sobre los jaguares. Quiero que se vean sus hábitats naturales en el continente americano, que puedas dar clic en cada país para obtener info específica sobre la población de jaguares en ese país. La web también debe tener curiosidades sobre los mismos y dejar en claro que son el mejor felino del planeta. Explica como cazan y cuáles son sus presas habituales. Pon buenas fotos"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explore jaguar range by country (Priority: P1)

A visitor opens the site and sees a map of the American continent showing the countries where
jaguars live in the wild. The visitor selects any country and immediately reads a panel with
that country's jaguar situation: estimated population, how and when that estimate was produced,
its source, population status, and the habitat types found there.

**Why this priority**: It is the core request and the only part that carries country-specific
data. Without it the product does not exist.

**Independent Test**: Open the page, select a country from the map, and confirm the panel shows
that country's name, estimate (or an explicit "no published estimate" state), source, and
reference year. Repeat for every range country.

**Acceptance Scenarios**:

1. **Given** the visitor is on the landing view, **When** they select Brazil on the map, **Then** a panel opens showing Brazil's jaguar population estimate, the estimate's reference year, its source, and its main habitats.
2. **Given** a country has no published estimate, **When** the visitor selects it, **Then** the panel shows an explicit "sin estimación publicada" message with the source note and never shows zero or an invented figure.
3. **Given** the visitor has a panel open, **When** they select a different country, **Then** the panel replaces its content with the newly selected country and retains the previously viewed country as visibly selected only for the current selection.
4. **Given** the visitor cannot or does not want to use the map, **When** they use the country list alternative, **Then** every country remains selectable and shows the same information panel.
5. **Given** the visitor uses only a keyboard, **When** they tab through the page, **Then** every country control is reachable, has a visible focus indicator, activates with Enter or Space, and the resulting panel is announced and readable.

---

### User Story 2 - Learn that the jaguar is the best feline on the planet (Priority: P2)

A visitor browses a curated set of jaguar curiosities and reads a prominent, unmissable statement
that the jaguar is the best feline on the planet, supported by the facts shown.

**Why this priority**: The user explicitly requires this message and the curiosity section. It adds
identity and engagement and is independent from the map data.

**Independent Test**: Load the page, confirm the "best feline" statement is visible without
interaction, then read the curiosities section and verify at least eight distinct, sourced
curiosities are present.

**Acceptance Scenarios**:

1. **Given** the visitor lands on the page, **When** the initial view is rendered, **Then** a prominent statement declaring the jaguar the best feline on the planet is visible without scrolling.
2. **Given** the visitor reads the curiosities section, **When** they count the entries, **Then** at least eight distinct curiosities are present, each with a short explanation and a supporting source.
3. **Given** a curiosity makes a factual claim, **When** the visitor follows its source, **Then** the source is reachable and supports the claim.

---

### User Story 3 - Understand how jaguars hunt and what they eat (Priority: P3)

A visitor reads an explanation of the jaguar's hunting behavior and its habitual prey, with
photos and clear, non-technical language.

**Why this priority**: Explicitly requested and self-contained. It enriches the page but the map
and the identity content deliver the primary value.

**Independent Test**: Open the hunting section and verify it explains the hunting method and lists
the habitual prey, each prey item with a short note, and that every factual claim has a source.

**Acceptance Scenarios**:

1. **Given** the visitor opens the hunting section, **When** they read the explanation, **Then** it describes the jaguar's hunting approach (ambush and stalking, powerful bite directed at the skull or neck, swimming ability, and activity periods).
2. **Given** the visitor reads the prey list, **When** they review it, **Then** it includes the jaguar's habitual prey with a short description of each.
3. **Given** the visitor wants proof, **When** they check the cited sources, **Then** each hunting and prey claim is covered by at least one reachable source.

---

### Edge Cases

- A country is in the jaguar's historical range but has no confirmed resident population (e.g. the United States): it must not appear as a current range country with a population figure; it may appear only as a clearly labelled note about historical or sporadic presence.
- Population estimates are ranges with wide uncertainty: the page must show the range and the estimate year, not a single false-precision number.
- A source becomes unavailable: the source list must keep the citation details (title, publisher, year) so the claim remains traceable.
- A photo fails to load: its alt text and caption must remain visible and a fallback must not break the layout.
- The visitor has `prefers-reduced-motion` enabled: map and panel animations must be reduced or removed.
- The viewport is 360 pixels wide: the map, panel, galleries, and text must remain usable without horizontal scrolling.
- A visitor activates the currently selected country again: the panel must not flicker, duplicate, or lose focus.
- Content, scripts, or images are blocked by the environment: the page must still present the text content, including country data and sources.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The page MUST present an interactive map of the American continent showing every country where jaguars live in the wild.
- **FR-002**: Each range country on the map MUST be individually selectable by pointer, touch, and keyboard.
- **FR-003**: The set of range countries MUST include Mexico, Guatemala, Belize, Honduras, Nicaragua, Costa Rica, Panama, Colombia, Venezuela, Guyana, Suriname, French Guiana, Ecuador, Peru, Bolivia, Brazil, Paraguay, and Argentina.
- **FR-004**: Selecting a country MUST display a panel containing: the country name, its jaguar population estimate (number or range), the estimate's reference year, the source citation, the population trend or status, and the main habitat types in that country.
- **FR-005**: Countries without a published population estimate MUST display an explicit "sin estimación publicada" state with a source note, and MUST NOT display zero or any fabricated figure.
- **FR-006**: Every numeric population claim MUST be displayed together with its source and reference year, within the same visible context.
- **FR-007**: The page MUST include a country list alternative that exposes the same countries and the same information as the map.
- **FR-008**: The page MUST state prominently, on the initial view and without interaction, that the jaguar is the best feline on the planet.
- **FR-009**: The page MUST include a curiosities section with at least eight distinct jaguar curiosities, each with a short explanation and a supporting source.
- **FR-010**: The page MUST include a hunting section explaining the jaguar's hunting approach, including ambush and stalking, the bite directed at the skull or neck, its swimming ability, and its main activity periods.
- **FR-011**: The hunting section MUST list the jaguar's habitual prey with a short description of each.
- **FR-012**: The page MUST include a photo gallery of jaguar photographs where each image is at least 1200 pixels on its longest side, clearly shows a jaguar, has descriptive alt text, and carries a visible credit and license.
- **FR-013**: The page MUST include a consolidated sources section listing every source used, each with title, publisher, year, and a reachable link or full citation.
- **FR-014**: All interactive controls MUST be operable with a keyboard alone, MUST expose an accessible name, and MUST show a visible focus indicator.
- **FR-015**: The page MUST be usable at viewport widths from 360 pixels upward without horizontal scrolling.
- **FR-016**: The page MUST respect the visitor's reduced-motion preference.
- **FR-017**: All user-facing content MUST be written in Spanish (Latin American).
- **FR-018**: The page MUST NOT display any population figure or ecological claim that lacks a cited source.
- **FR-019**: The page MUST distinguish current range countries from any country presented only as historical or sporadic presence.

### Key Entities *(include if feature involves data)*

- **Range Country**: A country where jaguars currently live in the wild. Attributes: name, country code, region or subregion, range status, population estimate as a number or range, estimate reference year, trend or status, main habitat types, conservation notes, and the sources that support them.
- **Source**: A publication or dataset backing one or more claims. Attributes: title, publisher, year, link or full citation, and the claims it supports.
- **Curiosity**: A discrete, engaging fact about jaguars. Attributes: short title, explanation, and supporting source.
- **Prey Item**: A species or group the jaguar habitually hunts. Attributes: name, category, short description, and supporting source.
- **Habitat Type**: A natural environment where jaguars live. Attributes: name, short description, and the countries or regions where it occurs.
- **Photograph**: An image used on the page. Attributes: caption, credit, license, and descriptive alternative text.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can reach country-specific population information in at most two interactions from the landing view.
- **SC-002**: 100% of the 18 range countries are present on both the map and the list, and each one shows either a sourced estimate with its reference year or the explicit "sin estimación publicada" state.
- **SC-003**: 100% of displayed population figures show a source and a reference year in the same visible context.
- **SC-004**: At least eight distinct curiosities are present, and 100% of them cite a source.
- **SC-005**: At least six credited photographs are present, and 100% of them have descriptive alt text.
- **SC-006**: A keyboard-only user can reach and activate every one of the 18 countries and read the resulting panel, with 100% of controls having a visible focus indicator and an accessible name.
- **SC-007**: On a viewport of 360 pixels width, 100% of the page's main content sections are reachable and readable without horizontal scrolling.
- **SC-008**: The "best feline on the planet" statement is visible on the initial view without any interaction.
- **SC-009**: The hunting section names and explains the hunting method and lists at least five habitual prey items, each covered by a cited source.
- **SC-010**: Zero unsourced numeric or ecological claims are found in a full content review.
- **SC-011**: The page shows meaningful content within three seconds on a typical mobile connection.

## Assumptions

- The site content is in Spanish (Latin American) because the request and its audience are Spanish-speaking.
- The jaguar data is curated and static; there is no live data feed, no backend, and no user-generated content, so every figure is dated and sourced instead of being presented as live.
- Population estimates are inherently uncertain; the design shows ranges and reference years rather than implying precision.
- The 18 countries listed in FR-003 form the current range set; the United States is presented only as a historical or sporadic presence note, not as a current range country with a population figure.
- High-quality photographs will be sourced from properly licensed sources such as public-domain or openly licensed repositories, and each will be credited; if a suitable licensed image cannot be found for a section, that section uses a licensed alternative rather than an uncredited image.
- Deployment is a publicly readable web page with no accounts, no personal data collection, and no tracking beyond what a static host provides by default.
- The "best feline on the planet" claim is presented as an explicit, enthusiastic editorial statement by the site, supported by the facts shown, rather than as a scientific claim.
- Curiosities and hunting content are sourced from reputable wildlife or conservation publishers.
