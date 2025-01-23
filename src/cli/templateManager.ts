import path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

function copyTemplates(targetDir: string): void {
  console.log(chalk.blue('📝 Copying configuration templates...'));

  // Set the templates source directory relative to the current file
  const templatesDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'templates',
  );

  fs.copyFileSync(
    path.join(templatesDir, 'old.eslintrc.json'),
    path.join(targetDir, '.eslintrc.json'),
  );
  fs.copyFileSync(
    path.join(templatesDir, 'prettier.config.js'),
    path.join(targetDir, 'prettier.config.js'),
  );
  fs.copyFileSync(
    path.join(templatesDir, 'jest.setup.js'),
    path.join(targetDir, 'jest.setup.js'),
  );
  fs.copyFileSync(
    path.join(templatesDir, '.lintstagedrc.json'),
    path.join(targetDir, '.lintstagedrc.json'),
  );

  const workflowsDir = path.join(targetDir, '.github', 'workflows');
  fs.mkdirSync(workflowsDir, { recursive: true });
  fs.copyFileSync(
    path.join(templatesDir, '.github', 'workflows', 'ci.yml'),
    path.join(workflowsDir, 'ci.yml'),
  );
  fs.copyFileSync(
    path.join(templatesDir, '.github', 'dependabot.yml'),
    path.join(targetDir, '.github', 'dependabot.yml'),
  );
}

export { copyTemplates };
