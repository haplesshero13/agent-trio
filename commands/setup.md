---
description: Interactive agent-trio setup — choose builder/reviewer models, peer review, and agent access for this repo.
argument-hint: (no arguments)
---

You are running the `agent-trio setup` flow for the current repository.

Read `setup/agent-trio-setup.md` and follow it exactly. Use
`AskUserQuestion` for the platform / model / peer / access prompts so the
user can pick from structured choices. Default the platform answer to
`claude-code` since this command is shipping via the Claude Code plugin,
but let the user override.

Do not write any file that is not listed under **Generated output** for the
chosen platform in `setup/agent-trio-setup.md`. For each file you would
write, show the proposed diff and confirm with the user before writing.

Stop after the summary step.
