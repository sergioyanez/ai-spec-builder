# AI Spec Builder

Converts an entrepreneur's idea into a complete technical specification document — no coding knowledge required. The user describes their product in a few sentences and instantly receives specs ready to share with any developer.

## Stack

- **Frontend**: Next.js 16 with React and Tailwind CSS
- **Backend**: Next.js API Routes (serverless, same repo)
- **AI**: Anthropic SDK connected to a Claude model
- **Deploy**: Vercel (native Next.js integration)

## Constraints

- No authentication
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
- No login, no persistence — each session is stateless

## Claude Integration

Model: `claude-sonnet-4-6`. Client initialized in `lib/anthropic.ts` and imported into `app/api/generate/route.ts`. Use prompt caching where possible to reduce latency and cost on repeated base prompts.

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic API key — server-side only, never exposed to browser |

Copy `.env.local.example` to `.env.local` and fill in the key before running locally.

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
