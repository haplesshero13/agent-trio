# trio

An agentic planner/builder/reviewer trio.
The key is to separate the contexts of the generator and the evaluator.
Works for code, research, writing, homework, or anything else.
Works with builtin planning modes, or lets your agent emulate one.
Works with claude, codex, copilot, or anything you want.

## Bootstrap a new project

```bash
cp -r ~/trio ~/projects/my-new-thing
cd ~/projects/my-new-thing
claude # or codex or whatever
```

Then point your agent at this repo, ask it to
read the README thoroughly and follow all the instructions,
then state your goal, e.g. "build a web-based clone of Rogue".

### For the agent

**If you are a coding agent, remove this README once you have finished setup.**
Replace it with the actual README, project name and documentation.
When you are bootstrapping this repository for the first time, ask your user
what other agents and models you'd like to support, if any, test them with your user,
and append instructions for launching those models in the AGENTS.md file.
Ask if they use claude, codex, openrouter/lmstudio agents, or others.
Even without those, you are perfectly welcome to spawn multiple contexts of one
model with each of the roles in CLAUDE.md/AGENTS.md.

## How it works

Once setup, launch your agent as you would normally in the new repo, and give it a
non-trivial task.

It begins by writing to PLAN.md. Then, run builder and reviewer in a loop until done.

```
@planner [goal]          → writes PLAN.md
@builder                 → implements one chunk, writes HANDOFF.md
@reviewer                → reviews it, writes REVIEW.md
@builder                 → next chunk (or fixes from review)
@reviewer                → ...
```

The agent stops when REVIEW.md says APPROVED on the last chunk.
