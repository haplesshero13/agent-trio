# trio

A minimal builder/reviewer harness for agentic work.
One rule: the reviewer never shares context with whoever built.

Works for code, research, writing, or anything else.
Works with Claude, Codex, Copilot, or any capable agent.
Zero code. All natural language.

## Design principles

1. **Focus on the specs** — the right specs result in the right output; small errors up front compound and cascade.
2. **Multiple review loops** — even the best models make errors; double-check all work with fresh contexts.
3. **Validate or it isn't real** — LLMs are optimistic by nature; running systems are the only ground truth.
4. **Self-improving** — making the same mistake twice is a failure of the system; capture and spread learnings.
5. **Resumability** — the system survives restarts, crashes, and handoffs; all state persists in the filesystem.

## Quick start

```bash
cp -r trio/ my-project/
cd my-project && git init
# launch your agent and state your goal
```

## How it works

Head instance plans. Building and reviewing happen in a loop:

1. State a goal → head instance writes `PLAN.md`
2. Confirm the plan
3. Build (head instance directly, or delegate to a builder agent)
4. Reviewer evaluates in a **separate context** → writes `REVIEW.md`
5. Loop until APPROVED

The workflow, routing rules, and artifact formats are in `AGENTS.md`.

## Model choices

The reviewer is always a separate, frontier-capability model.
Cheap tokens for building. Stronger reasoning for planning.
Every harness component encodes an assumption about what models can't do
today — with each new model, ask what can be removed.

## .trio/ directory

On first run, create `.trio/` with two files:

- **criteria.md** — what "done" means (reviewer's holdout rubric; builder reads the plan, reviewer reads this)
- **learnings.md** — insights from prior cycles (what worked, what to improve, what can be removed)

`.trio/` is gitignored. It is held out from the builder for the same reason
a test set is held out from model training.

### Starter: `.trio/criteria.md`

```markdown
# Acceptance Criteria

Read by the reviewer only.

## Quality bar

- [ ] Core behavior works end to end per PLAN.md
- [ ] No regressions from previously APPROVED chunks
- [ ] Consistent in style with the rest of the repo

## Constraints

(Project-specific. Examples:)

- No function longer than 80 lines
- All external calls mockable

## Verification

Prefer running behavior over self-reported success. If the builder says
"tests pass," run them. If a file is claimed to exist, check it.
Add project-specific verification steps here.

## APPROVED means

All criteria met and verification passes.
```

### Starter: `.trio/learnings.md`

```markdown
# Learnings

Read by the builder at session start. Appended by the reviewer after every
verdict. Entries are insights — what changes future behavior.

Five lenses:

1. Specs — did the spec cause or prevent the issue?
2. Review — did fresh-context review catch something the builder couldn't?
3. Validation — was the claim verified against running behavior?
4. Self-improvement — is this a repeat? What prevents it next time?
5. Removal — can any process step be dropped now?

Format: insight first, provenance in parens.
Append only.
```

## Agent setup

`AGENTS.md` and `CLAUDE.md` are symlinked.

### For the bootstrapping agent

When setting up a new project from this template:

1. Adapt `.trio/criteria.md` to the project's domain
2. Replace this README with the project's actual documentation
3. Ask the human which agents and models to support
