import { validateGitHubCLI, validateGitHubLogin } from './githubValidation.js';

export function runValidations() {
  validateGitHubCLI();
  validateGitHubLogin();
}
