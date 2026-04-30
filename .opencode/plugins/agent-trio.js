/**
 * agent-trio plugin for OpenCode.ai
 *
 * Registers the repo-root `skills/` directory and the OpenCode-native
 * `.opencode/agents/` wrappers with OpenCode.
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
  };
};

export default AgentTrioPlugin;
