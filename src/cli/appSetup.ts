import { createNextApp } from './appCreator.js';
import { copyTemplates } from './templateManager.js';

export function setupApp(appDir: string) {
  createNextApp(appDir);
  copyTemplates(process.cwd());
}
