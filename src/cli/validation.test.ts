import { describe, test, expect, vi } from 'vitest';
import { runValidations } from './validation.js';
import { validateGitHubCLI, validateGitHubLogin } from './githubValidation.js';

vi.mock('./githubValidation.js', () => ({
  validateGitHubCLI: vi.fn(),
  validateGitHubLogin: vi.fn(),
}));

describe('runValidations', () => {
  test('should validate GitHub CLI and login', () => {
    runValidations();
    expect(validateGitHubCLI).toHaveBeenCalled();
    expect(validateGitHubLogin).toHaveBeenCalled();
  });
});
