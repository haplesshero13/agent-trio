# Workflow

## The one rule

The reviewer always evaluates in a separate context, with fresh eyes.
The head instance plans. It can build directly or delegate.

## PLAN.md contract

When the head instance writes `PLAN.md`, it contains:

- **Goal** — what success looks like, in observable terms
- **Constraints** — architectural boundaries, non-goals, things to avoid
- **Done criteria** — behavioral contract, intentionally implementation-agnostic
- **Ordered chunks** — work broken into reviewable units

This is the spec.
`README.md` is the source of overall repo goals. `PLAN.md` is the current-task spec.

## The loop

1. Human states a goal. Head instance writes `PLAN.md`.
2. Human confirms the plan.
3. Build — head instance if cheap, or delegate to a builder agent.
4. Builder writes `HANDOFF.md`: what was done, how to verify, what's unfinished.
5. Reviewer evaluates in a **separate context** against `.trio/criteria.md`.
   Writes `REVIEW.md`. Appends to `.trio/learnings.md`.
6. Loop until APPROVED or ESCALATE.

## Artifacts

| File                 | Written by               | Read by                  |
| -------------------- | ------------------------ | ------------------------ |
| `PLAN.md`            | head instance            | builder, reviewer        |
| `HANDOFF.md`         | builder                  | reviewer                 |
| `REVIEW.md`          | reviewer                 | builder, human           |
| `.trio/criteria.md`  | human + head instance    | reviewer only            |
| `.trio/learnings.md` | reviewer (appends)       | builder (reads at start) |

## Criteria

`.trio/criteria.md` is a gitignored holdout file and a living conversation
between the human and the head instance. It is not fire-and-forget.
Its job is to encode what the reviewer must validate against reality.

## Routing

When resuming, route based on file state:

- First, read `README.md` for the repo's overall goals
- No PLAN.md → write one, confirm with human, then build
- PLAN.md confirmed, no HANDOFF.md → build
- HANDOFF.md newer than REVIEW.md → review
- REVIEW.md says APPROVED → next chunk (or done)
- REVIEW.md says ESCALATE → ask the human

## Learnings

`.trio/learnings.md` outlives any single conversation, model, or context window.
Entries are insights that help the builder orient and the reviewer understand patterns.

Five lenses:

1. **Specs** — did the spec cause or prevent the issue?
2. **Review** — did fresh-context review catch something the builder couldn't?
3. **Validation** — was the claim verified against running behavior?
4. **Self-improvement** — is this a repeat? What prevents it next time?
5. **Removal** — can any process step be dropped now?

Format: insight first, provenance in parens. Append only.

## Resumability

A restart, `/clear`, or model switch is normal. The filesystem artifacts
recover phase, open questions, and confidence state.

## What not to put here

- Workflow rules → AGENTS.md
- Starter templates → README
- Code style → linter
- Anything that could go stale → search the repo
