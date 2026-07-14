# Phase 1 Data Model: Copy Specification to Clipboard

This feature introduces **no new persistent entities and no new domain types**. It operates entirely
on data that already exists in memory. This document records the data it reads and the transient UI
state it manages.

## Existing data consumed (no changes)

### Spec (`lib/types.ts`)

The full generated specification currently displayed in the results view. The copy action serializes
this object to plain text and writes it to the clipboard. Reused as-is; not modified.

| Field | Type | Role in this feature |
|-------|------|----------------------|
| `vision` | `string` | Included in copied text |
| `users` | `SpecUser[]` | Included in copied text |
| `features` | `SpecFeatureGroup[]` | Included in copied text |
| `flows` | `SpecFlow[]` | Included in copied text |
| `architecture` | `SpecArchitecture` | Included in copied text |
| `requirements` | `SpecRequirements` | Included in copied text |

**Serialization**: `specToText(spec: Spec): string` in `SpecOutput.tsx` already produces the full
plain-text form used for copying. Reused unchanged. (A separate `specToMarkdown` exists for
downloads and is out of scope here.)

## Transient UI state

Local component state in `SpecOutput.tsx` — none of it is persisted.

| State | Type | Source | Purpose |
|-------|------|--------|---------|
| `copied` | `boolean` | existing `useState` | Drives the "¡Copiado!" confirmation label/styling |
| revert timer | `ref` to timeout id | **new** | Holds the active 2s timer so it can be cleared/restarted (FR-006) |
| copy error | `boolean`/`string` | **new** | Signals a failed copy so a plain-Spanish message can render (FR-005) |
| `isGenerating` | `boolean` (prop) | **new**, lifted from `SpecForm`'s `loading` via parent | Disables the copy button during generation (FR-004) |

## State transitions (copy button)

```text
              spec present, not generating
Idle ───────────────────────────────────────────► Ready ("Copiar especificación")
                                                     │
                     click ─► clipboard write        │
                        ┌───── success ──────────────┤
                        ▼                             │
   Confirmed ("¡Copiado!")  ── 2s (restartable) ──►  Ready
                                                     │
                        └───── failure ──────────────┤
                                                     ▼
                                        Error message + Ready (retry allowed)

  isGenerating = true (any point) ─► Disabled (button not clickable)
  isGenerating = false again ──────► Ready
```

**Validation rules** (behavioural, from requirements):

- The button is interactive only when a `Spec` is present **and** `isGenerating` is false (FR-004).
- The "Confirmed" state persists exactly 2 seconds and restarts on each successful copy (FR-003,
  FR-006).
- A failed copy MUST NOT enter the "Confirmed" state (FR-005).
