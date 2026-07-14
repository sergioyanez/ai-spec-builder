## Why

Users generating multiple specs in a working session have no immediate feedback on how productive the session has been. A lightweight, at-a-glance counter in the header reinforces successful generations and gives a small sense of progress, without introducing any storage or tracking complexity.

## What Changes

- Add a session counter to the generator page header (`/app`) that displays how many specs have been generated in the current session.
- Increment the counter by one on every **successful** spec generation (i.e., each successful `POST /api/generate` call whose result is displayed).
- The counter starts at zero on page load and resets to zero on every page reload — it is purely in-memory session state.
- No persistence: the count is never written to localStorage, cookies, a database, or the server. Loading a spec from history does not change the count.

## Capabilities

### New Capabilities

- `session-spec-counter`: Displays and maintains an in-memory count of successful spec generations for the current page session, shown in the generator header and reset on reload.

### Modified Capabilities

<!-- None: no existing spec-level behavior changes. -->

## Impact

- **UI**: `app/app/page.tsx` header gains a counter element; the success handler (`handleResult`) increments the count.
- **State**: New in-memory React state on the generator page; no new dependencies, APIs, or storage.
- **No impact** on `POST /api/generate`, history/localStorage behavior, auth, or the landing page.
