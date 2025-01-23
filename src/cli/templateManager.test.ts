import { beforeEach, describe, test, expect, vi } from 'vitest';
import * as fs from 'fs';
import path from 'path';
import { copyTemplates } from './templateManager.js';

vi.mock('fs');

describe('copyTemplates', () => {
  const targetDir = '/mock/target/dir';
  const templatesDir = path.join(__dirname, 'templates');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should copy configuration templates to the target directory', () => {
    copyTemplates(targetDir);

    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, 'old.eslintrc.json'),
      path.join(targetDir, '.eslintrc.json'),
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, 'prettier.config.js'),
      path.join(targetDir, 'prettier.config.js'),
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, 'jest.config.js'),
      path.join(targetDir, 'jest.config.js'),
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, 'jest.setup.js'),
      path.join(targetDir, 'jest.setup.js'),
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, '.lintstagedrc.json'),
      path.join(targetDir, '.lintstagedrc.json'),
    );
  });

  test('should create workflows directory and copy workflow files', () => {
    copyTemplates(targetDir);

    const workflowsDir = path.join(targetDir, '.github', 'workflows');
    expect(fs.mkdirSync).toHaveBeenCalledWith(workflowsDir, {
      recursive: true,
    });
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, '.github', 'workflows', 'ci.yml'),
      path.join(workflowsDir, 'ci.yml'),
    );
    expect(fs.copyFileSync).toHaveBeenCalledWith(
      path.join(templatesDir, '.github', 'dependabot.yml'),
      path.join(targetDir, '.github', 'dependabot.yml'),
    );
  });
});
