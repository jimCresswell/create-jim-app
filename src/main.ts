import { execSync } from 'child_process';
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import * as fs from 'fs';

// Because a decade on Node packages still don't work properly.
const packagejson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

const program = new Command();

program
  .name('setup-next-app')
  .version(packagejson.version)
  .description(packagejson.description)
  .argument('[app-name]', 'Name of the Next.js application')
  .option('--public', 'Create a public GitHub repository')
  .option('--private', 'Create a private GitHub repository')
  .option('--no-dependabot', 'Skip Dependabot configuration')
  .parse(process.argv);

// const options = program.opts();
const appNameArg = program.args[0];

function validateAppName(name: string): boolean {
  return /^[a-z0-9-]+$/.test(name);
}

function normalizeName(rawName: string | undefined): string {
  if (rawName === undefined || rawName === '') {
    console.error(chalk.red(`❌ Error: Invalid app name: "${rawName}"`));
    process.exit(1);
  }
  return rawName.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function copyTemplates(targetDir: string): void {
  console.log(chalk.blue('📝 Copying configuration templates...'));
  const templatesDir = path.join(__dirname, 'templates');

  // @todo: this file is in the old eslint format, update to flat config format.
  fs.copyFileSync(
    path.join(templatesDir, 'old.eslintrc.json'),
    path.join(targetDir, '.eslintrc.json'),
  );
  fs.copyFileSync(
    path.join(templatesDir, 'prettier.config.js'),
    path.join(targetDir, 'prettier.config.js'),
  );
  fs.copyFileSync(
    path.join(templatesDir, 'jest.config.js'),
    path.join(targetDir, 'jest.config.js'),
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

function validateGitHubCLI(): void {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    console.log(chalk.green('✅ GitHub CLI is installed.'));
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        chalk.red(
          `❌ GitHub CLI is not installed. Please install it from https://cli.github.com/ and try again.\n${error.message}`,
        ),
      );
    }

    process.exit(1);
  }
}

function validateGitHubLogin(): void {
  try {
    execSync('gh auth status', { stdio: 'ignore' });
    console.log(chalk.green('✅ User is logged in to GitHub.'));
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        chalk.red(
          `❌ User is not logged in to GitHub. Please log in using "gh auth login" and try again.\n${error.message}`,
        ),
      );
    }
    process.exit(1);
  }
}

async function main(): Promise<void> {
  console.log(chalk.blue.bold('\n🚀 Next.js Production App Setup\n'));

  validateGitHubCLI();
  validateGitHubLogin();

  let appName = appNameArg;
  if (!appName) {
    ({ appName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter your Next.js app name:',
        validate: (input) =>
          validateAppName(normalizeName(input)) ||
          'Only lowercase letters, numbers, and hyphens are allowed.',
      },
    ]));
  }

  const appDir = normalizeName(appName);
  if (fs.existsSync(appDir)) {
    console.error(chalk.red(`❌ Error: Directory "${appDir}" already exists.`));
    process.exit(1);
  }

  console.log(chalk.blue('📦 Creating Next.js application...'));
  execSync(
    `npx create-next-app@latest ${appDir} --typescript --eslint --app --src-dir --tailwind --use-pnpm`,
    { stdio: 'inherit' },
  );

  process.chdir(appDir);
  console.log(chalk.blue('🔧 Installing dependencies...'));
  execSync(`pnpm install --save-dev eslint prettier husky lint-staged`, {
    stdio: 'inherit',
  });

  copyTemplates(process.cwd());

  // Set up Husky.
  console.log(chalk.blue('🐶 Setting up Husky...'));
  execSync('npx husky-init && pnpm install', { stdio: 'inherit' });
  execSync('npx husky set .husky/pre-commit "npx lint-staged"', {
    stdio: 'inherit',
  });
  execSync('npx husky set .husky/pre-push "pnpm type-check && pnpm test"', {
    stdio: 'inherit',
  });

  console.log(chalk.green('\n✅ Setup Complete!'));
  console.log(chalk.green(`👉 cd ${appDir} && pnpm dev`));
}

function exitWithError(message: string): void {
  console.error(chalk.red(`❌ An error occurred: ${message}`));
  process.exit(1);
}

export { main, exitWithError };
