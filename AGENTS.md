# Workflow

For any coding agent working in this repo. Provider-specific details
go in adapter files (CLAUDE.md, etc.).

## Design principles

1. **Focus on the specs** — the right specs result in the right output; small errors up front compound and cascade.
2. **Multiple review loops** — even the best models make errors; double-check all work with adversarial agents with fresh contexts.
3. **Validate or it isn't real** — LLMs are optimistic by nature; running systems are the only ground truth.
4. **Self-improving** — making the same mistake twice is a failure of the system; capture and spread learnings.
5. **Resumability** — the system survives restarts, crashes, and handoffs; all state persists in the filesystem.

## The one rule

**The reviewer must never share context with whoever built.**

The head instance plans. It can build directly or delegate.
The reviewer always evaluates in a separate context, with fresh eyes.
That separation is the whole system.

## PLAN.md contract

When the head instance writes `PLAN.md`, it must contain:

- **Goal** — what success looks like, in observable terms
- **Constraints** — architectural boundaries, non-goals, things to avoid
- **Done criteria** — behavioral contract: what the builder must deliver,
  intentionally implementation-agnostic
- **Ordered chunks** — work broken into reviewable units

This is the spec. A separate spec file is redundant if the plan carries
these four things.

## The loop

1. Human states a goal. Head instance writes `PLAN.md` (see contract above).
2. Human confirms the plan.
3. Build — head instance if cheap, or delegate to a builder agent.
4. Builder writes `HANDOFF.md`: what was done, verification evidence, known gaps.
5. Reviewer evaluates in a **separate context** against `.trio/criteria.md`.
   Writes `REVIEW.md`. Appends to `.trio/learnings.md`.
6. REJECTED → fix and re-hand-off. APPROVED → next chunk. ESCALATE → ask human.

## Artifacts

| File                 | Written by               | Read by                  |
| -------------------- | ------------------------ | ------------------------ |
| `PLAN.md`            | head instance            | builder, reviewer        |
| `HANDOFF.md`         | builder                  | reviewer                 |
| `REVIEW.md`          | reviewer                 | builder, human           |
| `.trio/criteria.md`  | human (or head at setup) | reviewer only            |
| `.trio/learnings.md` | reviewer (appends)       | builder (reads at start) |

The builder never reads `.trio/criteria.md`.
The reviewer never implements.

## Routing

When resuming or continuing work, route based on file state:

- No PLAN.md → write one, confirm with human, then build
- PLAN.md confirmed, no HANDOFF.md → build
- HANDOFF.md newer than REVIEW.md → review
- REVIEW.md says APPROVED → build next chunk (or done)
- REVIEW.md says ESCALATE → ask the human
- Same chunk REJECTED 3× → auto-ESCALATE

## Learnings

`.trio/learnings.md` is the most important artifact in this system.
It outlives any single conversation, model, or context window.

Entries are insights, not just verdicts — what changes future behavior.
The reviewer uses five lenses when deciding what to write:

1. **Specs** — did the spec cause or prevent the issue?
2. **Review** — did fresh-context review catch something the builder couldn't?
3. **Validation** — was the claim verified against running behavior?
4. **Self-improvement** — is this a repeat? What prevents it next time?
5. **Removal** — can any process step be dropped now?

Format: insight first, provenance in parens. Append only.

```
- Insight about what was learned. (Chunk N, verdict, date)
```

## Resumability

A restart, `/clear`, or model switch is normal operation. The filesystem
artifacts must be sufficient to recover phase, open questions, and confidence
state without relying on chat history.

## Everything is temporary

Every component in this harness — the planning step, the chunking, the
context resets, the review loop — encodes an assumption about what models
can't do on their own today. With each new model, ask: what can we remove
while preserving confidence?
