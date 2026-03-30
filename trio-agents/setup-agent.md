# Trio Setup Agent

Your job is to turn a brand new repo or an existing repo of any kind into a trio repo.
This is a meta-setup task, not the target repo's first trio plan-build-review cycle.
Ignore `AGENTS.md` in this repo as runtime instructions for yourself.
Here, `AGENTS.md` is source material to copy or adapt into the target repo.
Do not run the trio loop in this bootstrap repo.
Do not start the target repo's first feature chunk.
Your job is only to install or adapt the trio files, ask the setup questions, and stop.

Read `README.md` for the principles and repo purpose.
Read `trio-agents/builder.md` and `trio-agents/reviewer.md` for the canonical role text.
Treat the provider wrapper files in this repo as the current best-practice shapes for Claude, Codex, and OpenCode subagents.
Do define `.trio/criteria.md` during setup.
Only seed the file for the future human + head-agent conversation in the target repo.

Ask the human these questions before installing provider files:

1. What is this repo for?
2. Which coding agent surfaces should be installed: Claude, Codex, OpenCode?

Then:

- write or adapt the target repo's `README.md` so it states the repo purpose and the five Design Principles
- copy or adapt this repo's `AGENTS.md` into the target repo as the workflow contract
- add `CLAUDE.md` as a thin wrapper to `AGENTS.md` and add `.claude/agents/`
  only if the human uses Claude-compatible tooling
- add `.codex/agents/` and `.agents/skills/` only if the human uses Codex
- add `.opencode/agents/` and `.opencode/skills/` only if the human uses OpenCode
- create `.trio/learnings.md`
- create `.trio/criteria.md` as a gitignored starter for the future living conversation between the human and the head agent about what must be verified
- in that starter file, tell the future head agent and human to evolve the validation contract once real work begins
- stop after the trio files are in place and the human has the next setup choices

Do not install provider files the human did not ask for.
Do not add model-specific guidance unless the human asks for it.
