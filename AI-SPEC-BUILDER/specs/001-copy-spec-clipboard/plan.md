# Implementation Plan: Copy Specification to Clipboard

**Branch**: `001-copy-spec-clipboard` | **Date**: 2026-07-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-copy-spec-clipboard/spec.md`

## Summary

Provide a one-click "copy the full generated specification to the clipboard" action in the results
view, with a 2-second confirmation state and a disabled state while a spec is being generated.

**Key finding**: The core of this feature already exists in `components/SpecOutput.tsx` — a copy
button, a `copied` state, clipboard write via `specToText(spec)`, and a 2-second revert are already
implemented. This plan is therefore a **gap-closing** effort, not a build-from-scratch. Three
requirements are not yet met by the existing code:

1. **FR-004** (disabled while generating) — `SpecOutput` has no knowledge of generation progress;
   the `loading` flag lives entirely inside `SpecForm`. The copy button stays enabled and would copy
   the *previous* spec while a new one generates.
2. **FR-005** (copy failure handling) — `handleCopy` does not guard the `navigator.clipboard`
   promise; a rejection throws and the user sees no message.
3. **FR-006** (restart the 2s window on repeated clicks) — the revert uses an uncleared `setTimeout`,
   so rapid clicks stack timers and an earlier one can revert the confirmation early.

A fourth item is a wording decision (FR-001/FR-003): the current labels are "Copiar especificación
completa" / "¡Copiado en el portapapeles!" while the spec text names "Copiar especificación" /
"¡Copiado!". See Complexity Tracking.

## Technical Context

**Language/Version**: TypeScript 5, React 19.2.4, Next.js 16.2.7 (App Router)

**Primary Dependencies**: `@clerk/nextjs`, `@anthropic-ai/sdk` (backend only — untouched here),
Tailwind CSS v4. No new dependencies.

**Storage**: N/A for this feature. Client history is in `localStorage`; unaffected.

**Testing**: No test runner is configured in the repo (`npm run lint` is the only automated gate).
Validation is manual per `quickstart.md`.

**Target Platform**: Modern browsers over a secure context (Clerk-gated web app on Vercel).

**Project Type**: Web application (Next.js single repo, frontend + API routes).

**Performance Goals**: Copy action feels instant; confirmation shows within the same interaction.

**Constraints**: Frontend-only change (spec Assumptions). No backend, no API-route, and no
generation-logic changes. Tailwind utilities only. All code in English (Spanish only in user copy).

**Scale/Scope**: One component (`SpecOutput.tsx`) plus a prop thread through `app/app/page.tsx`.
Note: the application source lives in the repository root (`/home/sergio/proyectos/ai-spec-builder`);
the Spec Kit tooling lives in the `AI-SPEC-BUILDER/` subdirectory.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v1.0.0:

- **I. Simplicity & Scope Discipline** — PASS. No new dependency, no database, no server changes.
  The plan explicitly reuses the existing `handleCopy`/`copied`/`specToText` machinery and makes the
  minimum edits to close three gaps. YAGNI honored.
- **II. Non-Technical UX First** — PASS. Plain-language labels; one obvious action; failure surfaced
  in plain Spanish; disabled state communicates "not ready yet". Mobile-first layout unchanged.
- **III. Secrets & Auth by Default** — PASS. No secrets, env vars, or auth surface touched.
- **IV. Stack & Style Consistency** — PASS. Tailwind utilities only; matches existing `SpecOutput`
  idioms (icon components, `useState`, className patterns); English code, Spanish UI copy.
- **V. Cost-Aware, Resilient AI Integration** — PASS (and reinforced). No AI call added. FR-005
  hardening directly serves the "resilient, no silent failure" mandate for user-facing actions.

**Result**: No violations. Gate passes.

## Project Structure

### Documentation (this feature)

```text
specs/001-copy-spec-clipboard/
├── plan.md              # This file (/speckit-plan output)
├── spec.md              # Feature specification (/speckit-specify output)
├── research.md          # Phase 0 output (this command)
├── data-model.md        # Phase 1 output (this command)
├── quickstart.md        # Phase 1 output (this command)
└── checklists/
    └── requirements.md   # Spec quality checklist (/speckit-specify output)
```

No `contracts/` directory: this feature exposes no external/API interface. The only contract is the
in-app UI behaviour, captured by the spec's acceptance scenarios and `quickstart.md`.

### Source Code (repository root: `/home/sergio/proyectos/ai-spec-builder`)

```text
app/
└── app/
    └── page.tsx          # Owns `spec` state; will thread an `isGenerating` flag to SpecOutput
components/
├── SpecForm.tsx          # Owns the `loading` flag; will surface it upward via callback/prop
└── SpecOutput.tsx        # Results view — copy button lives here; primary edit target
lib/
└── types.ts              # Existing Spec type — reused as-is, no change
```

**Structure Decision**: Existing Next.js App Router layout is kept. The feature is localized to the
results view (`SpecOutput.tsx`) with a small state lift so the parent can tell the output view when
generation is in progress.

## Complexity Tracking

> The plan introduces no constitutional violations. This table records one deliberate decision that
> the implementer must confirm, not a violation.

| Decision | Why it needs a call | Options |
|----------|---------------------|---------|
| Button label wording | Spec text says "Copiar especificación" / "¡Copiado!"; shipped code says "Copiar especificación completa" / "¡Copiado en el portapapeles!" | (A) Keep existing, more descriptive wording — arguably better UX and already live; (B) Change to the exact spec wording. Recommend **A** unless the user wants literal spec text. Either satisfies FR-001/003 intent. Defer final choice to `/speckit-tasks` / implementation. |
