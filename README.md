# trio

A minimal builder/reviewer harness for agentic work.
One rule: the reviewer never shares context with whoever built.

Works for code, research, writing, or anything else.
Works with Claude, Codex, Copilot, or any capable agent.
Zero code. All natural language.

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

The full workflow, routing rules, and artifact formats are in `AGENTS.md`.

## .trio/ directory

On first run, create `.trio/` with two files:

- **criteria.md** — what "done" means (reviewer's holdout rubric; builder never reads it)
- **learnings.md** — the confidence trail (what was proven, what broke, what patterns hold)

`.trio/` is gitignored. It is held out from the builder for the same reason
a test set is held out from model training.

### Starter: `.trio/criteria.md`

```markdown
# Acceptance Criteria

Read by the reviewer only. The builder must never see this file.

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
All criteria met and verification passes. Partial credit is REJECTED with notes.
```

### Starter: `.trio/learnings.md`

```markdown
# Learnings

Read by the builder at session start. Appended by the reviewer after every
verdict. Entries are insights, not just verdicts — what changes future behavior.

Five lenses for what matters:
1. Specs — did the spec cause or prevent the issue?
2. Review — did fresh-context review catch something the builder couldn't?
3. Validation — was the claim verified against running behavior?
4. Self-improvement — is this a repeat? What prevents it next time?
5. Removal — can any process step be dropped now?

Format: insight first, provenance in parens.
Append only. Never delete.
```

## Agent setup

Provider-specific adapter files point to `AGENTS.md`:

| Provider | Adapter | Agent definitions |
|---|---|---|
| Claude | `CLAUDE.md` | `.claude/agents/builder.md`, `reviewer.md` |
| Codex | — (reads `AGENTS.md` directly) | — |
| Others | optional adapter file | follow `AGENTS.md` workflow |

### For the bootstrapping agent

When setting up a new project from this template:
1. Adapt `.trio/criteria.md` to the project's domain
2. Replace this README with the project's actual documentation
3. Ask the human which agents and models to support
