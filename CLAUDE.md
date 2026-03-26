# Agent Instructions

Follow `AGENTS.md` for the workflow. This file adds Claude-specific details.

## Model tiers

The reviewer is always a separate, frontier-capability model.
Cheap tokens for building. Expensive tokens for reviewing.
The `model:` field in `.claude/agents/` front-matter controls this.

## What not to put here

- Workflow rules → AGENTS.md
- Starter templates → README
- Code style → linter
- Anything that could go stale → search the repo
