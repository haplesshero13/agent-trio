# agent trio

A minimal, all natural language bootstrap for brand new or existing repos of any kind that want to follow principled agentic coding. Zero code.

Once upon a time, humans hand-wired computers to program them. Thankfully, someone invented ~~silicon chips~~ coding agents.

**agent trio** is not a swarm framework. It does not optimize for agent count or lines of code output. It is for introducing _just the right amount of friction_. You should spend tokens to maximize judgement and quality, not output or wasteful rework. **agent trio** helps you do that.

## How to use

Use this repo by pointing your agent at `trio-agents/setup-agent.md` in this repo and at the target repo you want to turn into a trio repo.

**Recommendations.** I recommend you select a more efficient (but not _deliberately cheap_) builder model, and a similar-strength reviewer model. This lets you use expensive tokens for reasoning and judgement. You could for example use Codex + GPT-5.4 (xhigh) as the planner and the separate reviewer subagent, and GPT-5.4 (med) as the builder subagent. Claude Code can spawn Opus reviewer and Sonnet builder subagents. Or create your multi-provider rainbow with OpenCode Zen, a Copilot subscription, and a local LLM; you just need to let your setup agent know your preferences.

## Quick file guide

- `AGENTS.md`: the setup directive for turning a repo into a trio repo
- `trio-agents/AGENTS.md`: the trio head agent + subagent contracts
- `trio-agents/builder.md`: the builder subagent
- `trio-agents/reviewer.md`: the reviewer subagent
- `LEARNINGS.md`: the checked-in lessons that still change how the next loop runs
- `PLAN.md`, `HANDOFF.md`, `REVIEW.md`: the gitignored agent coordination files
- `.claude/agents/`, `.opencode/agents/`, `.codex/agents/`: thin provider wrappers around the roles
