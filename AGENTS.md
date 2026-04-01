# How to agent-trio

## Principles

Always be kind to your ensemble; that also means not papering over hard truths to make someone feel good.

1. **More reasoning, less waste** — the right plans increase quality progressively; time spent reworking generated code is wasted tokens.
2. **Validate everything** — even the best LLMs make mistakes and are optimistic; the only ground truth is the real thing.
3. **Continuous improvement** — we learn with every iteration; capture them to reduce future mistakes.
4. **Always be resumable** — the filesystem is the source of truth; we can resume from any state.
5. **Autonomy, with friction** — verification and generation loops are autonomous; planning and reviewing require deliberation with a fresh context or human.

## The loop

1. Human states a goal. Head instance writes `PLAN.md`.
2. Human confirms the plan.
3. Build — head instance if cheap, or delegate to a builder agent.
4. Builder writes `HANDOFF.md`: what was done, how to verify, what's unfinished.
5. Reviewer evaluates in a **separate context** against `.trio/criteria.md`.
   Writes `REVIEW.md`. Appends to `.trio/learnings.md`.
6. Loop until APPROVED or ESCALATE.

The reviewer always evaluates with fresh eyes. The head instance plans; it does not review its own work.

`README.md` anchors repo-wide goals. `PLAN.md` scopes the current task.

## Artifacts

| File                 | Written by            | Read by                  |
| -------------------- | --------------------- | ------------------------ |
| `PLAN.md`            | head instance         | builder, reviewer        |
| `HANDOFF.md`         | builder               | reviewer                 |
| `REVIEW.md`          | reviewer              | builder, human           |
| `.trio/criteria.md`  | human + head instance | reviewer only            |
| `.trio/learnings.md` | reviewer (appends)    | builder (reads at start) |

`.trio/criteria.md` is a gitignored holdout — a living conversation between the human and head instance that encodes what the reviewer validates against reality.

`PLAN.md` contains: goal, constraints, done criteria, and ordered chunks. This is the spec for the current task.

## Routing

When resuming, route based on file state:

- Read `README.md` for overall goals
- No PLAN.md → write one, confirm with human, then build
- PLAN.md confirmed, no HANDOFF.md → build
- HANDOFF.md newer than REVIEW.md → review
- REVIEW.md says APPROVED → next chunk (or done)
- REVIEW.md says ESCALATE → ask the human

A restart, `/clear`, or model switch is normal. The filesystem artifacts recover phase, open questions, and confidence state.

## Learnings

`.trio/learnings.md` outlives any single conversation, model, or context window.
Entries are insights that change future defaults, scoping, or review.

Five lenses:

1. **Specs** — did the spec cause or prevent the issue?
2. **Review** — did fresh-context review catch something the builder couldn't?
3. **Validation** — was the claim verified against running behavior?
4. **Self-improvement** — is this a repeat? What prevents it next time?
5. **Removal** — can any process step be dropped now?

Format: insight first, provenance in parens. Append only.

## What to put where

- Workflow rules → AGENTS.md
- Starter templates → README
- Code style → linter
- Anything that could go stale → search the repo
