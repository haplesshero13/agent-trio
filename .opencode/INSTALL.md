# Installing agent-trio for OpenCode

agent-trio ships as an OpenCode plugin. The plugin registers the repository's
root `skills/` directory and the OpenCode-native `.opencode/agents/` wrappers.
Those wrappers read the authoritative role prompts from the repo-root
`agents/` directory, so workflow content is not duplicated.

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed.
- Git.

## Installation from npm

Once the package is published to npm, install it into your global OpenCode
config:

```bash
opencode plugin agent-trio --global
```

Or edit `~/.config/opencode/opencode.json` directly:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["agent-trio"]
}
```

Restart OpenCode. The resolved config should include:

- `skills.paths`: the package's `skills/` directory.
- `agents.paths`: the package's `.opencode/agents/` directory.

## Installation from a git checkout

For local development, or before the npm package is published, clone the repo
and add a small global plugin shim:

```bash
git clone https://github.com/haplesshero13/agent-trio.git ~/.config/opencode/agent-trio
mkdir -p ~/.config/opencode/plugins
cat > ~/.config/opencode/plugins/agent-trio.js <<'EOF'
import AgentTrioPlugin from "../agent-trio/.opencode/plugins/agent-trio.js";
export default AgentTrioPlugin;
export * from "../agent-trio/.opencode/plugins/agent-trio.js";
EOF
```

This matches the common global `~/.config/opencode/opencode.json` setup: keep
model, provider, and permission choices in `opencode.json`, and keep local
plugin files in `~/.config/opencode/plugins/`.

When you run OpenCode inside the agent-trio repo itself, `.opencode/plugins/`
is loaded automatically as a project plugin. No global shim is required for
repo-local testing.

## Verify

```bash
opencode debug config
opencode debug skill
opencode agent list
```

You should see:

- The `using-agent-trio` skill (from `skills/using-agent-trio/`).
- The `builder` and `reviewer` agents (from `.opencode/agents/`), dispatchable as
  `@builder` and `@reviewer`.

Verify by asking: "What is the agent-trio workflow?"

## Pinning a version

When using npm:

```json
{
  "plugin": ["agent-trio@0.1.0"]
}
```

## What the plugin does and does not do

- It **registers** the repo-root `skills/` directory and `.opencode/agents/`
  wrappers. It does not copy or duplicate their contents.
- The `.opencode/agents/` wrappers are thin and read `agents/builder.md` and
  `agents/reviewer.md` at runtime.
- It keeps model and permission choices in your normal OpenCode config. For
  example, `agent.builder.model` and `agent.reviewer.model` can be set in
  `~/.config/opencode/opencode.json`.

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode debug config --print-logs`.
2. Verify the plugin line in your `opencode.json` or the global shim in
   `~/.config/opencode/plugins/agent-trio.js`.
3. Ensure you are running a current OpenCode version.

### Skill not discovered

1. Use OpenCode's `skill` tool to list what is discovered.
2. Confirm the plugin loaded (see above).

### Agents not available

Confirm that `.opencode/agents/builder.md`, `.opencode/agents/reviewer.md`,
`agents/builder.md`, and `agents/reviewer.md` exist in the cloned plugin
directory. The OpenCode wrappers point at the root `agents/` files, so both
sets are required.
