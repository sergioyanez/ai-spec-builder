## Context

The generator lives in `app/app/page.tsx`, a client component. It already tracks
in-memory React state (`spec`, `activeId`, `isGenerating`) and persists spec
history to localStorage via `lib/history`. Successful generations flow through a
single callback, `handleResult(newSpec, idea)`, invoked by `SpecForm` when
`POST /api/generate` returns a spec. The header is a plain `<header>` block at
the top of the same component. This is a small, self-contained UI addition with
no new dependencies.

## Goals / Non-Goals

**Goals:**

- Show a live count of successful generations in the `/app` header.
- Increment exactly once per successful generation, at the existing success
  callback.
- Keep the state purely in memory so it resets naturally on reload.

**Non-Goals:**

- Any persistence (localStorage, cookies, server, DB).
- Counting history loads, retries of failed calls, or landing-page visits.
- Cross-tab or cross-session aggregation.

## Decisions

- **Local React state on the page component.** Add `const [specCount, setSpecCount] = useState(0)` in `app/app/page.tsx`. This is the simplest place: it already owns the success callback and the header. A reload remounts the component, resetting to zero for free — satisfying the "reset on reload / no persistence" requirement without extra code.
  - *Alternative considered:* a `useSyncExternalStore`-backed store like `lib/history`. Rejected — that pattern exists to survive reloads via localStorage, which is exactly what we must **not** do here. Plain `useState` is a better fit.

- **Increment inside `handleResult`.** `handleResult` fires only when a generation succeeds and a spec is displayed, so `setSpecCount((n) => n + 1)` there guarantees one increment per success and zero on failure. Using the functional updater avoids stale-closure double-count issues.
  - *Alternative considered:* incrementing inside `SpecForm` on fetch success. Rejected — keeps counter logic co-located with the header and the existing success path in one component.

- **Render in the header.** Add a small, unobtrusive counter element to the existing `<header>` (e.g., a badge reading the current count). Keep `print:hidden` behavior consistent with the surrounding header. Non-technical, minimal styling per project UI guidelines.

## Risks / Trade-offs

- **Double increment under React Strict Mode** → Using the functional updater (`n => n + 1`) and incrementing in the event-driven `handleResult` (not in an effect) avoids Strict Mode double-invocation concerns.
- **Miscount if `handleResult` is ever reused for non-generation flows** → Currently it is only called on genuine generation success; note this so future edits keep the invariant.
- **Trivial rollback** → The change is additive and isolated to one component; reverting the diff fully removes it.
