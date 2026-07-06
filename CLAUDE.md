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
  page.tsx              # Main input form (client component)
  layout.tsx            # Root layout and metadata
  api/
    generate/
      route.ts          # POST /api/generate — calls Claude
lib/
  anthropic.ts          # Anthropic SDK singleton client
```

## Key Behaviors

- The single page collects the user's product idea via a textarea
- The user selects which sections to include (all selected by default)
- On submit, the frontend calls `POST /api/generate` with the idea text and selected sections
- The API route sends both to Claude and returns a structured spec
- The spec is displayed on the same page, ready to copy with one click
- Login is required (Clerk) to reach the app; history persists client-side in localStorage

## Claude Integration

Model: `claude-sonnet-4-6`. Client initialized in `lib/anthropic.ts` and imported into `app/api/generate/route.ts`. Use prompt caching where possible to reduce latency and cost on repeated base prompts.

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
