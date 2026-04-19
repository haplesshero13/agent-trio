/**
 * agent-trio plugin for OpenCode.ai
 *
 * Registers the repo-root `skills/` directory and the OpenCode-native
 * `.opencode/agents/` wrappers with OpenCode
 * and injects a tool-mapping preamble into the first user message so the
 * head agent knows which native OpenCode tools correspond to the generic
 * ones referenced in the skill.
 *
 * The workflow contract and role prompts are NOT duplicated here — they live
 * in `skills/using-agent-trio/SKILL.md` and `agents/{builder,reviewer}.md`.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const REPO_ROOT = path.resolve(__dirname, '../..');
const SKILLS_DIR = path.join(REPO_ROOT, 'skills');
const AGENTS_DIR = path.join(REPO_ROOT, '.opencode', 'agents');

const INJECTION_MARKER = '<!-- agent-trio-opencode-bootstrap -->';

const TOOL_MAPPING = `${INJECTION_MARKER}
**agent-trio tool mapping for OpenCode:**
- The \`using-agent-trio\` skill is registered globally from this plugin; load it when planning or executing a trio loop.
- Dispatch builder/reviewer with OpenCode's subagent system (\`@builder\`, \`@reviewer\`). The OpenCode-native wrappers live in \`.opencode/agents/\` and each wrapper reads the authoritative role prompt from \`agents/\` at the repo root.
- Where the skill references \`TodoWrite\`, \`Task\`, or \`Skill\`, use OpenCode's \`todowrite\`, \`@\`-mention subagents, and the native \`skill\` tool respectively.
- \`Read\`, \`Write\`, \`Edit\`, \`Bash\` map directly to OpenCode's native tools.`;

const registerDir = (list, dir) => {
  if (!list.includes(dir) && fs.existsSync(dir)) list.push(dir);
};

export const AgentTrioPlugin = async () => {
  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      registerDir(config.skills.paths, SKILLS_DIR);

      config.agents = config.agents || {};
      config.agents.paths = config.agents.paths || [];
      registerDir(config.agents.paths, AGENTS_DIR);
    },

    'experimental.chat.messages.transform': async (_input, output) => {
      if (!output?.messages?.length) return;
      const firstUser = output.messages.find((m) => m.info?.role === 'user');
      if (!firstUser || !firstUser.parts?.length) return;
      if (firstUser.parts.some((p) => p.type === 'text' && p.text?.includes(INJECTION_MARKER))) return;

      const ref = firstUser.parts[0];
      firstUser.parts.unshift({ ...ref, type: 'text', text: TOOL_MAPPING });
    },
  };
};

export default AgentTrioPlugin;
