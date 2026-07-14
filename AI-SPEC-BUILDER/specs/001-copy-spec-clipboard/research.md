# Phase 0 Research: Copy Specification to Clipboard

The Technical Context had no open `NEEDS CLARIFICATION` items — the spec is self-contained and the
stack is fixed by the constitution. Research here consolidates the decisions that shape the
implementation, grounded in the existing code.

## Decision 1: Reuse the existing copy implementation, close gaps only

- **Decision**: Do not rebuild the feature. Extend the existing `SpecOutput.tsx` copy button.
- **Rationale**: `handleCopy`, the `copied` state, `specToText(spec)`, and the 2s revert already
  exist and already satisfy FR-001, FR-002, FR-003, and FR-007. Rebuilding would violate
  constitution Principle I (Simplicity / smallest change). Only FR-004, FR-005, FR-006 are unmet.
- **Alternatives considered**: New standalone `CopyButton` component — rejected as unnecessary
  abstraction (YAGNI) for a single call site.

## Decision 2: Clipboard mechanism — keep `navigator.clipboard.writeText`

- **Decision**: Continue using `navigator.clipboard.writeText`, wrapped in `try/catch`.
- **Rationale**: The app is a Clerk-gated site served over HTTPS (secure context), where the async
  Clipboard API is supported and is the standard, permission-aware approach. The spec explicitly
  scopes this to "the browser clipboard API".
- **Alternatives considered**: Legacy `document.execCommand("copy")` fallback — rejected; adds
  hidden-textarea complexity for a secure-context-only app, against Principle I. If a genuine
  unsupported-environment case appears, FR-005's failure path covers it gracefully.

## Decision 3: Surface generation state to the results view (FR-004)

- **Decision**: Lift the "is generating" signal so the parent (`app/app/page.tsx`) can pass an
  `isGenerating` boolean prop into `SpecOutput`, which disables the copy button when true.
- **Rationale**: `SpecForm` already owns a `loading` flag but never exposes it; `SpecOutput` cannot
  currently know a new spec is being generated, so it would copy the stale, previously displayed
  spec. Passing a single boolean is the least-coupling fix.
- **Implementation shape**: `SpecForm` reports loading transitions to the parent (e.g. an
  `onLoadingChange`/`onGenerating` callback, or lift the boolean into the page). The page stores it
  and forwards it to `SpecOutput` as `isGenerating`. `SpecOutput` sets `disabled={isGenerating}` and
  applies the existing disabled Tailwind classes already used in `SpecForm`
  (`disabled:cursor-not-allowed disabled:opacity-50`).
- **Alternatives considered**: React context/global store — rejected as overkill for one boolean
  between adjacent components (Principle I).

## Decision 4: Resilient copy — guard the promise (FR-005)

- **Decision**: Wrap the clipboard write in `try/catch`; on success set `copied`, on failure show a
  brief plain-Spanish inline error and leave the button in its original, clickable state (never show
  the "¡Copiado!" confirmation on failure).
- **Rationale**: Directly satisfies FR-005 and constitution Principle V (no silent failure, no raw
  errors surfaced to a non-technical user).
- **Alternatives considered**: `alert()` dialog — rejected; jarring and inconsistent with the app's
  inline, styled feedback. A transient inline message matches the existing UI language.

## Decision 5: Restart the confirmation window on rapid clicks (FR-006)

- **Decision**: Track the revert timer in a ref and `clearTimeout` the previous timer before setting
  a new one; also clear on unmount.
- **Rationale**: The current uncleared `setTimeout` lets stacked timers revert the confirmation
  early. Clearing guarantees a full fresh 2 seconds per successful copy (FR-006) and avoids a
  state update after unmount.
- **Alternatives considered**: Debounce/lock the button during the 2s window — rejected; it changes
  behaviour beyond the spec (spec allows re-clicking; it just requires the window to restart).

## Open questions carried to implementation

- **Label wording** (FR-001/FR-003): keep the current descriptive labels vs. the exact spec wording.
  Non-blocking; recorded in plan.md Complexity Tracking, resolved during `/speckit-tasks` or
  implementation.
