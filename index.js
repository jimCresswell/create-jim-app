#!/usr/bin/env node

const { execSync } = require('child_process');
const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const program = new Command();

program
  .name('setup-next-app')
  .version('1.0.0')
  .description('A CLI tool to create a production-ready Next.js app with TypeScript, ESLint, Prettier, Jest, Husky, and CI/CD setup.')
  .argument('[app-name]', 'Name of the Next.js application')
  .option('--public', 'Create a public GitHub repository')
  .option('--private', 'Create a private GitHub repository')
  .option('--no-dependabot', 'Skip Dependabot configuration')
  .parse(process.argv);

const options = program.opts();
const appNameArg = program.args[0];

function validateAppName(name) {
  return /^[a-z0-9\-]+$/.test(name);
}

function normalizeName(rawName) {
  return rawName.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function copyTemplates(targetDir) {
  console.log(chalk.blue('📝 Copying configuration templates...'));
  const templatesDir = path.join(__dirname, 'templates');

  shell.cp('-R', `${templatesDir}/.eslintrc.json`, targetDir);
  shell.cp('-R', `${templatesDir}/prettier.config.js`, targetDir);
  shell.cp('-R', `${templatesDir}/jest.config.js`, targetDir);
  shell.cp('-R', `${templatesDir}/jest.setup.js`, targetDir);
  shell.cp('-R', `${templatesDir}/.lintstagedrc.json`, targetDir);
  shell.mkdir('-p', `${targetDir}/.github/workflows`);
  shell.cp('-R', `${templatesDir}/.github/workflows/ci.yml`, `${targetDir}/.github/workflows`);
  shell.cp('-R', `${templatesDir}/.github/dependabot.yml`, `${targetDir}/.github`);
}

function validateGitHubCLI() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    console.log(chalk.green('✅ GitHub CLI is installed.'));
  } catch (error) {
    console.error(chalk.red('❌ GitHub CLI is not installed. Please install it from https://cli.github.com/ and try again.'));
    process.exit(1);
  }
}

async function main() {
  console.log(chalk.blue.bold('\n🚀 Next.js Production App Setup\n'));

  validateGitHubCLI();

  let appName = appNameArg;
  if (!appName) {
    ({ appName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Enter your Next.js app name:',
        validate: (input) => validateAppName(normalizeName(input)) || 'Only lowercase letters, numbers, and hyphens are allowed.',
      }
    ]));
  }

  const appDir = normalizeName(appName);
  if (fs.existsSync(appDir)) {
    console.error(chalk.red(`❌ Error: Directory "${appDir}" already exists.`));
    process.exit(1);
  }

  console.log(chalk.blue('📦 Creating Next.js application...'));
  execSync(`npx create-next-app@latest ${appDir} --typescript --eslint --app --src-dir --tailwind --use-pnpm`, { stdio: 'inherit' });

  process.chdir(appDir);
  console.log(chalk.blue('🔧 Installing dependencies...'));
  execSync(`pnpm install --save-dev eslint prettier husky lint-staged`, { stdio: 'inherit' });

  copyTemplates(process.cwd());

  // Set up Husky.
  console.log(chalk.blue('🐶 Setting up Husky...'));
  execSync('npx husky-init && pnpm install', { stdio: 'inherit' });
  execSync('npx husky set .husky/pre-commit "npx lint-staged"', { stdio: 'inherit' });
  execSync('npx husky set .husky/pre-push "pnpm type-check && pnpm test"', { stdio: 'inherit' });
  
  console.log(chalk.green('\n✅ Setup Complete!'));
  console.log(chalk.green(`👉 cd ${appDir} && pnpm dev`));
}

main().catch((err) => {
  console.error(chalk.red(`❌ An error occurred: ${err.message}`));
  process.exit(1);
});
