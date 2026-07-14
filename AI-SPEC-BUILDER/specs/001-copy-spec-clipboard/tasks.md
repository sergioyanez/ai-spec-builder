---
description: "Task list for Copy Specification to Clipboard"
---

# Tasks: Copy Specification to Clipboard

**Input**: Design documents from `specs/001-copy-spec-clipboard/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (all present)

**Tests**: Not requested. The repo has no test runner (only `npm run lint`), and the spec did not ask
for TDD. No automated test tasks are generated; validation is manual via `quickstart.md`.

**Organization**: Tasks are grouped by user story. This is a **gap-closing** feature — the plan
established that the copy button, `copied` state, `specToText` serialization, and 2s revert already
exist in `components/SpecOutput.tsx`. Tasks target only the unmet requirements (FR-004, FR-005,
FR-006) plus one wording decision.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- File paths are relative to the **application repository root**
  `/home/sergio/proyectos/ai-spec-builder` (the app lives here; Spec Kit tooling lives in the
  `AI-SPEC-BUILDER/` subdirectory).

## ⚠️ Shared-file constraint

Both user stories modify `components/SpecOutput.tsx`. They are **not** safe to run in parallel by
different people. Recommended order: complete **US1**, then **US2**, on the same file sequentially.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the current baseline before editing.

- [X] T001 Run the app from the repo root (`npm run dev`), sign in, generate a spec, and confirm the existing copy button behaviour in `components/SpecOutput.tsx` (label switch + ~2s revert) so changes can be compared against a known baseline.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core prerequisites shared by all stories.

**None.** Both stories build on the existing `SpecOutput.tsx` component and `Spec` type — no shared
schema, migration, or scaffolding is required. Proceed directly to Phase 3.

---

## Phase 3: User Story 1 - Copy a generated specification (Priority: P1) 🎯 MVP

**Goal**: A single click reliably copies the full spec to the clipboard, with a clear 2-second
confirmation, and copying never fails silently.

**Independent Test**: Generate a spec, click the copy button, paste elsewhere and confirm the full
text appears (`quickstart.md` scenarios 1, 4, 5, 6). Delivers value on its own regardless of US2.

### Implementation for User Story 1

> All tasks below edit the same file (`components/SpecOutput.tsx`) → run sequentially, not [P].

- [X] T002 [US1] Wrap the clipboard write in `handleCopy` with `try/catch` in `components/SpecOutput.tsx`: on success set `copied`; on failure do **not** set `copied` (no false "¡Copiado!") and set a new error state instead (FR-005).
- [X] T003 [US1] Add a transient, plain-Spanish inline failure message rendered near the copy button in `components/SpecOutput.tsx` (styled with existing Tailwind utilities), shown only when the copy-error state is set; clear it on the next successful copy (FR-005).
- [X] T004 [US1] Replace the bare `setTimeout` revert with a timer tracked in a `useRef`: `clearTimeout` any prior timer before starting a new 2s timer on each successful copy, and clear it on unmount (via `useEffect` cleanup) in `components/SpecOutput.tsx` (FR-006).
- [X] T005 [US1] Decide and apply the copy button labels in `components/SpecOutput.tsx` (FR-001/FR-003). Default recommendation: keep the current descriptive wording ("Copiar especificación completa" / "¡Copiado en el portapapeles!"). If literal spec wording is preferred, change to "Copiar especificación" / "¡Copiado!". Ensure the two states remain visually distinct.
- [X] T006 [US1] Validate US1 against `quickstart.md` scenarios 1 (copy + paste full text), 4 (simulated failure shows message, no false confirmation), 5 (rapid re-click restarts the 2s window), and 6 (regenerate resets label).

**Checkpoint**: Copy is reliable and resilient, independent of the generating-state work.

---

## Phase 4: User Story 2 - Prevent copying before the spec is ready (Priority: P2)

**Goal**: While a new spec is generating, the copy button is disabled so the user cannot copy an
empty or stale spec.

**Independent Test**: With a spec already shown, trigger a new generation and confirm the copy button
is disabled during generation and re-enables on completion (`quickstart.md` scenarios 2, 3).

### Implementation for User Story 2

- [X] T007 [P] [US2] Surface the generation `loading` flag out of `components/SpecForm.tsx` to its parent (e.g. add an `onLoadingChange?: (loading: boolean) => void` prop and call it wherever `setLoading` runs, including the `finally`/error paths) (FR-004). *(Different file from SpecOutput — parallelizable with US1 file work.)*
- [X] T008 [US2] In `app/app/page.tsx`, hold an `isGenerating` state driven by `SpecForm`'s `onLoadingChange`, and pass it as an `isGenerating` prop to `<SpecOutput>` (FR-004). *(Depends on T007.)*
- [X] T009 [US2] In `components/SpecOutput.tsx`, accept the `isGenerating` prop and set `disabled={isGenerating}` on the copy button, applying the existing disabled Tailwind classes already used in `SpecForm` (`disabled:cursor-not-allowed disabled:opacity-50`) so the disabled state is visible (FR-004). *(Depends on T008; same file as US1 — do after US1 is complete.)*
- [X] T010 [US2] Validate US2 against `quickstart.md` scenarios 2 (button disabled during generation, ignores clicks, re-enables after) and 3 (no enabled copy button when nothing has been generated).

**Checkpoint**: Copy button correctly reflects generation state; both stories work.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final quality gate.

- [X] T011 [P] Run `npm run lint` from the repo root and resolve any issues introduced (constitution Development Workflow gate).
- [X] T012 Run the full `quickstart.md` validation (all 6 scenarios) end-to-end and confirm no regressions to the existing download (.txt/.md/PDF) or reset actions in `components/SpecOutput.tsx`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: None (empty).
- **User Story 1 (Phase 3)**: Can start immediately after Setup. Delivers the MVP increment.
- **User Story 2 (Phase 4)**: Can start after Setup. T007 is independent of US1, but T009 edits the
  same file as US1 and should follow US1's edits to avoid conflicts.
- **Polish (Phase 5)**: After US1 and US2 are complete.

### Within / across stories

- US1 tasks (T002→T003→T004→T005) are sequential — same file.
- US2: T007 → T008 → T009 (data/prop dependency), then T010.
- T009 depends on both T008 (prop exists) and US1 completion (same file).

### Parallel Opportunities

- **T007** (`SpecForm.tsx`) is the only cross-story parallelizable task — it touches a different file
  and can proceed alongside US1's `SpecOutput.tsx` edits.
- **T011** (lint) can run in parallel with final review.
- Otherwise parallelism is limited: the two stories converge on `components/SpecOutput.tsx`.

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1: Setup (T001).
2. Phase 3: US1 (T002–T006) — harden the existing copy action.
3. **STOP and VALIDATE**: quickstart scenarios 1, 4, 5, 6.
4. Ship — the copy feature is complete and resilient on its own.

### Incremental Delivery

1. US1 → validate → demo (resilient copy = MVP).
2. US2 → validate → demo (disabled-while-generating).
3. Polish (lint + full quickstart).

---

## Notes

- [P] = different file, no incomplete dependency. Only T007 and T011 qualify.
- No backend, API-route, or generation-logic changes (spec Assumptions; constitution Principle I & III).
- Tailwind utilities only; English code, Spanish UI copy (constitution Principle IV).
- Commit after each task or logical group.
