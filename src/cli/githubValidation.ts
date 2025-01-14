import { execSync } from 'child_process';
import chalk from 'chalk';
import { exitWithError } from './errorHandling.js';

function validateGitHubCLI(): void {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    console.log(chalk.green('✅ GitHub CLI is installed.'));
  } catch (error) {
    exitWithError({
      message: `❌ GitHub CLI is not installed. Please install it from https://cli.github.com/ and try again.`,
      originalError: error,
    });
  }
}

function validateGitHubLogin(): void {
  try {
    execSync('gh auth status', { stdio: 'ignore' });
    console.log(chalk.green('✅ User is logged in to GitHub.'));
  } catch (error) {
    exitWithError({
      message: `❌ User is not logged in to GitHub. Please log in using "gh auth login" and try again.`,
      originalError: error,
    });
  }
}

export { validateGitHubCLI, validateGitHubLogin };
