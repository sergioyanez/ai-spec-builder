# AI Spec Builder

Converts an entrepreneur's idea into a complete technical specification document — no coding knowledge required. The user describes their product in a few sentences and instantly receives specs ready to share with any developer.

## Stack

- **Frontend**: Next.js 16 with React and Tailwind CSS
- **Backend**: Next.js API Routes (serverless, same repo)
- **AI**: Anthropic SDK connected to a Claude model
- **Auth**: Clerk (`@clerk/nextjs`) — username + password, no social/email
- **Deploy**: Vercel (native Next.js integration)

## Constraints

- Authentication via Clerk — the whole app is behind login (middleware `proxy.ts` protects every route except `/sign-in` and `/sign-up`)
- No database
- All code written in English

## Project Structure

```
app/
  page.tsx              # Public landing page
  app/page.tsx          # Main authenticated app (form + output + history)
  layout.tsx            # Root layout and metadata
  api/
    generate-spec/
      route.ts          # POST /api/generate-spec — streams a spec from Claude
components/
  SpecForm.tsx          # Idea textarea; calls /api/generate-spec, reads the stream
  SpecOutput.tsx        # Renders the generated spec, one-click copy
  HistorySidebar.tsx    # localStorage-backed history (rename/delete/new)
lib/
  anthropic.ts          # Anthropic SDK singleton client
  prompts.ts            # System prompts (SPEC_SYSTEM_PROMPT)
  types.ts              # Spec type shared client/server
  history.ts            # localStorage history store
  rateLimit.ts          # Per-IP rate limiting for the API route
```

## Key Behaviors

- The main app lives at `app/app/page.tsx` and collects the user's product idea via a textarea (max 2000 chars, matching the API limit)
- The spec always has a **fixed set of 6 sections** — there is no section picker: `vision`, `users`, `features`, `flows`, `architecture`, `requirements`
- On submit, `SpecForm` calls `POST /api/generate-spec` with body `{ description }`
- The route sanitizes and length-checks the input (max 2000 chars), rate-limits per IP, then **streams** the model output back as newline-delimited JSON frames (`delta` / `done` / `error`); the HTTP status stays 200 and post-stream failures arrive as an `error` frame
- The accumulated text is parsed and validated against the strict 6-section schema before it is shown as a finished spec — the streaming preview is never treated as the real output
- The spec is displayed on the same page, ready to copy with one click
- Login is required (Clerk) to reach the app; history persists client-side in localStorage

## Claude Integration

Model: `claude-sonnet-4-6`. Client initialized in `lib/anthropic.ts` and imported into `app/api/generate-spec/route.ts`, which uses `anthropic.messages.stream(...)` with `SPEC_SYSTEM_PROMPT` from `lib/prompts.ts`. Prompt caching is not yet applied — adding a `cache_control` breakpoint on the (stable) system prompt is a pending optimization to reduce latency and cost on repeated base prompts.

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key — server-side only, never exposed to browser |
| `CLERK_SECRET_KEY` | Clerk Backend API secret — server-side only, never exposed to browser |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key — safe to expose to the browser |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up route (`/sign-up`) |

Copy `.env.local.example` to `.env.local` and fill in the keys before running locally.
`.env.local` is never committed — on Vercel/Render, set these in the platform's
environment settings instead. Clerk auth (username/password, Google disabled) is
configured on the Clerk **development** instance; see
[specs/FeatureLogin.md](specs/FeatureLogin.md) for details and the production
migration steps. Auth setup is managed via the Clerk CLI (`clerk config ...`).

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Style

- Tailwind CSS utility classes only — no custom CSS files
- Mobile-first responsive layout
- Clean, minimal UI suited to non-technical users
