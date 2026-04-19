# Installing agent-trio for OpenCode

agent-trio ships as an OpenCode plugin. The plugin registers the repository's
root `skills/` and `agents/` directories with OpenCode and injects a small
tool-mapping preamble so the head agent knows how to dispatch builder/reviewer
subagents using OpenCode's native plumbing.

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed.
- Git.

## Installation

Add agent-trio to the `plugin` array in your `opencode.json` (global or
project-level):

```json
{
  "plugin": ["agent-trio@git+https://github.com/haplesshero13/agent-trio.git"]
}
```

Restart OpenCode. The plugin clones the repo on first load, then exposes:

- The `using-agent-trio` skill (from `skills/using-agent-trio/`).
- The `builder` and `reviewer` agents (from `agents/`), dispatchable as
  `@builder` and `@reviewer`.

Verify by asking: "What is the agent-trio workflow?"

## Pinning a version

```json
{
  "plugin": ["agent-trio@git+https://github.com/haplesshero13/agent-trio.git#v0.1.0"]
}
```

## What the plugin does and does not do

- It **registers** the repo-root `skills/` and `agents/` directories. It does
  not copy or duplicate their contents.
- It **injects** a tool-mapping preamble into the first user message of each
  session. The mapping clarifies which OpenCode tools correspond to the
  generic ones referenced in `SKILL.md`.
- It does **not** ship `.opencode/agents/` wrappers. The root `agents/`
  directory is authoritative.

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i trio`.
2. Verify the plugin line in your `opencode.json`.
3. Ensure you are running a current OpenCode version.

### Skill not discovered

1. Use OpenCode's `skill` tool to list what is discovered.
2. Confirm the plugin loaded (see above).

### Agents not available

Confirm that `agents/builder.md` and `agents/reviewer.md` exist in the cloned
plugin directory. The plugin points OpenCode at that directory — if the files
are missing, `@builder` and `@reviewer` will not resolve.
