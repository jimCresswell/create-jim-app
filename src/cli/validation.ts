import { validateGitHubCLI, validateGitHubLogin } from './githubValidation.js';

/**
 * Validate the necessary dependencies are installed.
 */
export function runValidations() {
  validateGitHubCLI();
  validateGitHubLogin();
}
