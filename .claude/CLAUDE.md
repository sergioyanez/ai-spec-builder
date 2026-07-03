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
  page.tsx          # Main input form
  api/
    generate/
      route.ts      # API route that calls Claude
components/         # Reusable UI components
lib/
  anthropic.ts      # Anthropic SDK client
```

## Key Behaviors

- The single page collects the user's product idea via a textarea
- On submit, the frontend calls `POST /api/generate` with the idea text
- The API route sends the idea to Claude and streams or returns a structured spec
- The spec is displayed on the same page, ready to copy or share
- No login, no persistence — each session is stateless

## Claude Integration

Use `claude-sonnet-4-6` as the default model. Initialize the Anthropic client in `lib/anthropic.ts` and import it into the API route. Use prompt caching where possible to reduce latency and cost on repeated base prompts.

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
