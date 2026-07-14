# Quickstart & Validation: Copy Specification to Clipboard

A manual validation guide that proves the feature end-to-end. There is no automated test runner in
this repo; `npm run lint` is the only automated gate.

## Prerequisites

- Node dependencies installed (`npm install`) in the repository root
  (`/home/sergio/proyectos/ai-spec-builder`, **not** the `AI-SPEC-BUILDER/` tooling subdirectory).
- `.env.local` populated (Clerk keys + `ANTHROPIC_API_KEY`) — see project `CLAUDE.md`.
- A modern browser over the dev server's secure/localhost context.

## Setup

```bash
# from the repository root: /home/sergio/proyectos/ai-spec-builder
npm run dev        # starts Next.js at http://localhost:3000
```

Sign in via Clerk, then open the app view (`/app`).

## Validation scenarios

Map to the acceptance scenarios in [spec.md](./spec.md).

### 1. Copy a generated spec (FR-001, FR-002, FR-003 — User Story 1)

1. Enter a product idea and generate a specification.
2. Confirm a copy button labelled "Copiar especificación" (see label note below) appears with the
   result.
3. Click it. **Expected**: label switches to the confirmation ("¡Copiado!"), then reverts after
   ~2 seconds.
4. Paste (Ctrl/Cmd+V) into any external text field. **Expected**: the full spec text appears
   (vision, users, features, flows, architecture, requirements — the `specToText` output).

### 2. Disabled while generating (FR-004 — User Story 2)

1. With a spec already displayed, submit a new idea to generate again.
2. **Expected**: while generation is in progress, the copy button is visibly disabled and does not
   respond to clicks (it must not copy the previous, stale spec).
3. When generation completes, **expected**: the button becomes enabled and copies the new spec.

### 3. Nothing to copy yet (FR-004 edge)

1. Load the app with no spec generated in the session (empty state).
2. **Expected**: no enabled copy button is available — there is nothing to copy.

### 4. Copy failure is handled (FR-005)

1. Simulate a clipboard denial (e.g. in DevTools, temporarily override
   `navigator.clipboard.writeText` to reject, or deny clipboard permission).
2. Click the copy button. **Expected**: a plain-Spanish message indicates the copy did not work, the
   button stays clickable for retry, and the "¡Copiado!" confirmation is **not** shown.

### 5. Rapid repeated clicks restart the window (FR-006)

1. Click copy, and click it again ~1 second later while it still shows the confirmation.
2. **Expected**: the confirmation shows a fresh full 2 seconds from the second click (it does not
   revert early or flicker).

### 6. Regenerate resets the button (edge case)

1. After copying, generate a new spec.
2. **Expected**: the button reflects the new result and shows the original "Copiar especificación"
   label.

## Automated gate

```bash
# from the repository root
npm run lint       # MUST pass (constitution Development Workflow gate)
```

## Notes

- **Label wording** is an open decision (see plan.md Complexity Tracking): the shipped code currently
  reads "Copiar especificación completa" / "¡Copiado en el portapapeles!". Validation passes with
  either the current descriptive wording or the exact spec wording, as long as the states are
  distinct and clear.
- This feature is frontend-only; no API route or generation behaviour changes, so backend validation
  is unchanged.
