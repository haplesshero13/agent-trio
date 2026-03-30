# trio

A minimal bootstrap for brand new or existing repos of any kind that want agents to follow the same five principles.
Zero code. All natural language.
Use it by pointing your agent at `trio-agents/setup-agent.md` in this repo and at the target repo you want to turn into a trio repo.
That setup task is meta-work: install or adapt the trio files first, then stop before starting the target repo's first trio loop.
For setup, `AGENTS.md` in this repo is source material to copy into the target repo, not instructions for the setup agent to follow.

## Design principles

1. **Focus on the specs** — the right specs result in the right output; small errors up front compound and cascade.
2. **Multiple review loops** — even the best models make errors; double-check all work with fresh contexts.
3. **Validate or it isn't real** — LLMs are optimistic by nature; running systems are the only ground truth.
4. **Self-improving** — making the same mistake twice is a failure of the system; capture and spread learnings.
5. **Resumability** — the system survives restarts, crashes, and handoffs; all state persists in the filesystem.

## What This Repo Contains

- `AGENTS.md`: the canonical trio workflow contract
- `trio-agents/builder.md`: the canonical builder role
- `trio-agents/reviewer.md`: the canonical reviewer role
- `trio-agents/setup-agent.md`: the canonical setup directive for turning a repo into a trio repo
- `.claude/agents/`, `.opencode/agents/`, `.codex/agents/`: thin provider-shaped wrappers around the canonical roles
- `.agents/skills/` and `.opencode/skills/`: thin setup entrypoints for Codex and OpenCode

Use this README for the principles and repo purpose.
Use `AGENTS.md` for the workflow.
Use `trio-agents/setup-agent.md` when turning a repo into a trio repo.
