<!--
Sync Impact Report
==================
Version change: (template, unversioned) → 1.0.0
Bump rationale: Initial ratification. All template placeholders replaced with
concrete principles derived from project context (CLAUDE.md, stack, constraints).

Modified principles:
- [PRINCIPLE_1_NAME] → I. Simplicity & Scope Discipline
- [PRINCIPLE_2_NAME] → II. Non-Technical User Experience First
- [PRINCIPLE_3_NAME] → III. Secrets & Auth by Default
- [PRINCIPLE_4_NAME] → IV. Stack & Style Consistency
- [PRINCIPLE_5_NAME] → V. Cost-Aware, Resilient AI Integration

Added sections:
- Additional Constraints (renamed from [SECTION_2_NAME])
- Development Workflow (renamed from [SECTION_3_NAME])

Removed sections: none

Templates requiring updates:
- ✅ .specify/templates/plan-template.md (Constitution Check references constitution
  generically; no hardcoded principle names — no edit needed)
- ✅ .specify/templates/spec-template.md (no constitution-coupled sections — no edit needed)
- ✅ .specify/templates/tasks-template.md (task categories compatible — no edit needed)

Deferred TODOs:
- RATIFICATION_DATE set to 2026-07-10 (first formal adoption). Adjust if an earlier
  original adoption date is preferred.
-->

# AI Spec Builder Constitution

## Core Principles

### I. Simplicity & Scope Discipline

The product does one thing: turn a plain-language product idea into a technical
specification. Scope creep is the primary risk and MUST be actively resisted.

- No database. State that must persist client-side uses `localStorage`; server routes stay stateless.
- Apply YAGNI: do not add abstractions, dependencies, or configuration for hypothetical futures.
- Prefer the smallest change that satisfies the requirement. A new dependency MUST be justified
  against the value it adds versus the maintenance and bundle cost it imposes.

**Rationale**: The app's value is speed and clarity. Every unnecessary moving part slows delivery,
enlarges the attack surface, and dilutes the single-purpose experience.

### II. Non-Technical User Experience First

The target user is an entrepreneur with no coding knowledge. Every user-facing decision MUST
favor their comprehension over technical elegance.

- UI copy MUST avoid jargon; flows MUST be obvious without documentation.
- Core outcomes (generate a spec, copy it, review history) MUST be reachable in one obvious action.
- Layout MUST be mobile-first and responsive.
- Errors MUST be surfaced in plain language that tells the user what to do next.

**Rationale**: If a non-technical founder cannot succeed unaided, the product has failed its
core promise regardless of backend quality.

### III. Secrets & Auth by Default

Authentication and secret handling are non-negotiable and MUST NOT be weakened for convenience.

- The entire app sits behind Clerk auth; middleware protects every route except `/sign-in` and `/sign-up`.
- `ANTHROPIC_API_KEY` and `CLERK_SECRET_KEY` are server-side only and MUST NEVER reach the browser.
- Only `NEXT_PUBLIC_*` variables may be exposed client-side, and only when genuinely required there.
- `.env.local` MUST NOT be committed; platform environment settings hold production secrets.

**Rationale**: A leaked API key means direct financial loss and abuse; bypassed auth exposes the
whole app. These failures are severe and hard to reverse, so they are guarded by default, not by review alone.

### IV. Stack & Style Consistency

The codebase MUST read as one coherent whole, matching the established stack and conventions.

- Stack is fixed: Next.js 16 (App Router), React, Tailwind CSS, Next.js API Routes, Clerk, Anthropic SDK.
- Styling uses Tailwind utility classes only — no custom CSS files.
- All code, identifiers, and comments are written in English.
- New code MUST match the surrounding files' naming, structure, and idioms.

**Rationale**: Consistency lowers the cognitive cost of every future change and keeps a small
project maintainable without heavyweight process.

### V. Cost-Aware, Resilient AI Integration

Claude is the engine of the product; its integration MUST be deliberate about cost, latency,
and failure.

- Use the model designated in project guidance (`claude-sonnet-4-6`) via the singleton client in `lib/anthropic.ts`.
- Apply prompt caching on stable base prompts to reduce repeated latency and cost.
- API failures (rate limits, exhausted balance, timeouts) MUST be caught and returned to the user
  as clear, actionable messages — never a raw stack trace or silent hang.

**Rationale**: The AI call is the app's largest recurring cost and its most likely failure point;
handling both explicitly protects budget and user trust.

## Additional Constraints

- **Deployment**: Vercel, using its native Next.js integration. Secrets are configured in the
  platform environment, never in the repository.
- **Data**: No persistent server-side storage. Client history lives in `localStorage` and is
  disposable; the app MUST function correctly when it is empty or cleared.
- **Auth environment**: Clerk is configured on the development instance (username/password, social
  disabled); production migration steps are tracked in `specs/FeatureLogin.md`.

## Development Workflow

- **Commands**: `npm run dev` (local), `npm run build` (production build), `npm run lint` (ESLint).
- **Lint gate**: `npm run lint` MUST pass before a change is considered complete.
- **Constitution check**: Feature planning MUST verify alignment with these principles; any
  deviation MUST be recorded in the plan's Complexity Tracking with a justification and the
  rejected simpler alternative.
- **Reviews**: Changes touching auth, secrets, or the AI integration warrant explicit scrutiny
  against Principles III and V before merge.

## Governance

This constitution supersedes ad-hoc practice. When guidance conflicts, the constitution wins.

- **Amendments**: Proposed as a change to this file, with a version bump and an updated Sync
  Impact Report. Amendments MUST state their rationale.
- **Versioning**: Semantic. MAJOR for backward-incompatible principle removals or redefinitions;
  MINOR for a new principle or materially expanded guidance; PATCH for clarifications and wording.
- **Compliance**: Plans and reviews MUST verify adherence. Unjustified complexity is grounds to
  reject a change. Runtime development guidance lives in `CLAUDE.md`.

**Version**: 1.0.0 | **Ratified**: 2026-07-10 | **Last Amended**: 2026-07-10
