import { describe, test, expect, vi, Mock } from 'vitest';
import { validateGitHubCLI, validateGitHubLogin } from './githubValidation.js';
import { execSync } from 'child_process';
import { exitWithError } from './errorHandling.js';

vi.mock('child_process', () => ({
  execSync: vi.fn(),
}));

vi.mock('./errorHandling.js', () => ({
  exitWithError: vi.fn(),
}));

describe('validateGitHubCLI', () => {
  test('should validate GitHub CLI installation', () => {
    (execSync as Mock).mockImplementation(() => {});
    validateGitHubCLI();
    expect(execSync).toHaveBeenCalledWith('gh --version', { stdio: 'ignore' });
  });

  test('should handle GitHub CLI not installed', () => {
    (execSync as Mock).mockImplementation(() => {
      throw new Error('Not installed');
    });
    validateGitHubCLI();
    expect(exitWithError).toHaveBeenCalled();
  });
});

describe('validateGitHubLogin', () => {
  test('should validate GitHub login', () => {
    (execSync as Mock).mockImplementation(() => {});
    validateGitHubLogin();
    expect(execSync).toHaveBeenCalledWith('gh auth status', {
      stdio: 'ignore',
    });
  });

  test('should handle GitHub not logged in', () => {
    (execSync as Mock).mockImplementation(() => {
      throw new Error('Not logged in');
    });
    validateGitHubLogin();
    expect(exitWithError).toHaveBeenCalled();
  });
});
