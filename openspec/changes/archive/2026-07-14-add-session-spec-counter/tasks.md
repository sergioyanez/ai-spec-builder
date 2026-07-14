## 1. State

- [x] 1.1 Add `const [specCount, setSpecCount] = useState(0)` to the generator page component in `app/app/page.tsx`
- [x] 1.2 Increment the count with the functional updater `setSpecCount((n) => n + 1)` inside `handleResult`, so it only fires on successful generation

## 2. Header UI

- [x] 2.1 Add a small counter element to the existing `<header>` in `app/app/page.tsx` displaying the current `specCount` (e.g., a badge), keeping `print:hidden` behavior consistent
- [x] 2.2 Ensure the counter styling follows the project's minimal Tailwind UI conventions and reads clearly for non-technical users (e.g., "Specs generadas: N")

## 3. Verify

- [x] 3.1 Confirm the counter starts at 0 on load and increments by 1 on each successful generation
- [x] 3.2 Confirm the counter does not change on a failed generation or when loading a spec from history
- [x] 3.3 Confirm the counter resets to 0 on page reload and that no value is written to localStorage, cookies, or the server
- [x] 3.4 Run `npm run lint` and `npm run build` to confirm no regressions
