# agent trio

A minimal, all natural language bootstrap for brand new or existing repos of any kind that want to follow principled agentic coding. Zero code.

Once upon a time, humans hand-wired computers to program them. Thankfully, someone invented ~~silicon chips~~ coding agents.

**agent trio** is not a swarm framework. It does not optimize for agent count or lines of code output. It is for introducing _just the right amount of friction_. You should spend tokens to maximize judgement and quality, not output or wasteful rework. **agent trio** helps you do that.

## How to use

Use this repo by pointing your agent at `trio-agents/setup-agent.md` in this repo and at the target repo you want to turn into a trio repo.

**For agents reading this:** The setup task is meta-work: install or adapt the trio files first to the new project, then stop. For setup, `AGENTS.md` in this repo is source material to copy into the target repo, not instructions for the setup agent to follow.

## Quick file guide

- `AGENTS.md`: the trio workflow contract
- `trio-agents/builder.md`: the builder subagent
- `trio-agents/reviewer.md`: the reviewer subagent
- `trio-agents/setup-agent.md`: the setup directive for turning a repo into a trio repo
- `.claude/agents/`, `.opencode/agents/`, `.codex/agents/`: thin provider-shaped wrappers around the roles
- `.agents/skills/` and `.opencode/skills/`: thin setup entrypoints for Codex and OpenCode
