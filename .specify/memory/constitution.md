<!--
Sync Impact Report
==================
Version change: uninitialized template (0.0.0) → 1.0.0
Modified principles:
  - [PRINCIPLE_1_NAME] → I. Clean Code
  - [PRINCIPLE_2_NAME] → II. Tests Always, Test-First (NON-NEGOTIABLE)
  - [PRINCIPLE_3_NAME] → III. React with TypeScript
  - [PRINCIPLE_4_NAME] → IV. Separation of Concerns
  - [PRINCIPLE_5_NAME] → V. Simplicity and Continuous Refactoring
Added sections:
  - Technology and Quality Standards (replaces [SECTION_2_NAME])
  - Development Workflow and Quality Gates (replaces [SECTION_3_NAME])
Removed sections: none
Templates requiring updates:
  - ✅ .specify/templates/tasks-template.md (tests are now mandatory, not optional)
  - ✅ .specify/templates/plan-template.md (Constitution Check gates now concrete)
  - ⚠ .specify/templates/spec-template.md (no change required; user stories already
    independently testable — reviewed, no edit)
  - ⚠ .specify/templates/commands/*.md (directory does not exist in this project)
Follow-up TODOs: none
-->

# Jaguar Exercise Constitution

## Core Principles

### I. Clean Code

Every line of production code MUST be readable, intention-revealing, and minimal.

- Names MUST express intent: no abbreviations, no single-letter identifiers outside
  loop indices, no `data`, `temp`, or `misc` unless the domain term is literally that.
- Functions MUST do one thing. If a function needs a comment to explain a block, that
  block MUST become a named function.
- Functions SHOULD stay under 30 lines and take at most three parameters; beyond that,
  pass an options or parameter object.
- Duplication MUST be removed once a third occurrence appears. Premature abstraction
  before the third occurrence is prohibited (see Principle V).
- Comments MUST explain *why*, never *what*. Dead code, commented-out code, and
  unreachable branches MUST be deleted, not retained.
- Modules MUST depend inward: UI and I/O at the edges, pure domain logic at the core.
  Domain logic MUST NOT import React, browser APIs, or network clients.
- Lint and format rules (ESLint + Prettier) are part of the build, not a suggestion.

**Rationale**: Clean Code is the project's primary maintainability contract. Readable
code reduces review cost and defect rate more than any process.

### II. Tests Always, Test-First (NON-NEGOTIABLE)

Every behavior change MUST ship with automated tests, and tests MUST be written first.

- No feature, bugfix, or refactor is complete without tests that fail before the change
  and pass after it (Red → Green → Refactor).
- Each test MUST assert observable behavior through a public interface (component props,
  rendered output, user interaction, exported function contract) — never private state
  or implementation details.
- Every user-facing behavior MUST have at least one test; every reported bug MUST gain a
  regression test that reproduces it before the fix.
- Tests MUST be deterministic: no reliance on real time, network, or random ordering.
  Use fake timers, injected dependencies, and seeded data.
- A change that breaks an existing test MUST NOT be merged by deleting or weakening
  that test; the test is updated only when the intended behavior genuinely changed,
  and the change MUST be called out in review.
- 100% coverage of branches is not a goal; coverage of *decided behavior* is mandatory.
  Untested error paths and edge cases are defects.

**Rationale**: Tests are the executable specification of this project. Without them,
Clean Code principles (I, IV, V) cannot be safely enforced during refactoring.

### III. React with TypeScript

All UI MUST be built with React and TypeScript.

- TypeScript MUST run in `strict` mode. `any`, implicit `any`, and non-null assertions
  (`!`) are prohibited in application code; use `unknown` with narrowing, discriminated
  unions, or explicit guards instead.
- Every component MUST declare typed props and MUST NOT use `React.FC` with implicit
  children; children MUST be typed explicitly.
- Components MUST be function components. Class components require written
  justification and are limited to error boundaries.
- Hooks rules MUST be respected: no conditional hooks, no hooks in loops, dependencies
  declared exhaustively. Custom hooks MUST start with `use` and own one concern.
- Derived state MUST be computed during render, not stored in `useState`. State MUST
  live at the lowest common ancestor that needs it.
- Side effects MUST be confined to `useEffect`, event handlers, or service modules.
  Rendering MUST be pure.
- Public exports, API payloads, and shared contracts MUST be typed at the boundary and
  validated (e.g. runtime schema) before use.

**Rationale**: Static typing plus React's declarative model is the chosen stack; strict
types convert runtime defects into compile-time failures.

### IV. Separation of Concerns

UI, state, and business logic MUST be separable and independently testable.

- Presentation MUST be separated from data access: components receive data and callbacks
  through props; fetching and persistence live in dedicated hooks or service modules.
- Business rules MUST live in pure, framework-free functions that can be unit tested
  without rendering.
- A component file MUST NOT contain JSX plus network calls plus domain rules; split into
  the component, a hook/container, and a pure module.
- Cross-cutting concerns (auth, logging, error reporting, i18n) MUST be implemented once
  and reused; no ad-hoc duplication per feature.
- Folder structure MUST be feature-oriented (`features/<name>/`) with shared primitives
  in a common layer; imports MUST NOT reach across features' internals.

**Rationale**: Clean boundaries make each unit testable in isolation and keep the cost
of change local.

### V. Simplicity and Continuous Refactoring

Start with the simplest solution that satisfies the specification.

- YAGNI: no speculative abstractions, configuration flags, or extension points without a
  concrete, current requirement.
- KISS: prefer plain functions, explicit data flow, and standard library utilities over
  new dependencies. Every new dependency MUST be justified in the plan.
- Refactoring MUST be continuous: any change that increases complexity requires a
  simplifying follow-up in the same work unit when feasible.
- Complexity MUST be justified in writing; unexplained complexity is a review blocker.
- Boy-scout rule: leave touched code cleaner than found — rename, extract, delete dead
  code — provided the change stays within scope and tests stay green.

**Rationale**: Simplicity keeps the codebase cheap to change; refactoring keeps it that way.

## Technology and Quality Standards

- **Runtime**: React (current stable major) with TypeScript `strict`.
- **Build/tooling**: Vite (unless the plan records a justified alternative).
- **Testing**: Vitest for unit/integration, React Testing Library for component behavior,
  and Playwright for critical end-to-end journeys when a journey is user-critical.
  Tests live beside the code (`*.test.ts[x]`) or in `tests/` per the plan.
- **Lint/format**: ESLint (with react-hooks and @typescript-eslint rules) and Prettier.
  CI MUST fail on lint or type errors.
- **Accessibility**: Interactive components MUST meet WCAG 2.1 AA basics — semantic HTML,
  keyboard operability, labelled controls, visible focus.
- **Prohibited without recorded justification**: `any`, class components, direct DOM
  manipulation in React code, global mutable state, and network calls inside components.

## Development Workflow and Quality Gates

- Flow: specification → plan (with Constitution Check) → tasks → test-first implementation
  → review. Each phase MUST pass its gate before the next begins.
- A task is complete only when: tests written first and passing, lint clean, typecheck
  clean, and behavior demonstrated through tests.
- Review MUST verify compliance with all five principles; a violation MUST be fixed or
  justified in the Complexity Tracking of the plan.
- Commits MUST be small, focused work units that keep tests and code together.
- CI MUST run, at minimum: install, lint, typecheck, and the full test suite.

## Governance

- This constitution supersedes all other practices. Conflicts MUST be resolved in favor
  of this document; exceptions MUST be documented and approved in the plan's Complexity
  Tracking.
- Amendments MUST be proposed with rationale, reviewed, and recorded with a version bump
  following semantic versioning: MAJOR for incompatible removals or redefinitions of
  principles, MINOR for new or materially expanded principles/sections, PATCH for
  clarification or wording fixes.
- Every amendment MUST include a Sync Impact Report and MUST propagate changes to the
  dependent templates and runtime guidance (AGENTS.md, plan).
- Compliance is reviewed at every plan Constitution Check and every code review.

**Version**: 1.0.0 | **Ratified**: 2026-11-23 | **Last Amended**: 2026-11-23
