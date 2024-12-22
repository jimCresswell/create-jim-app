#!/usr/bin/env node

const { execSync } = require('child_process');
const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const program = new Command();

// 🛠️ Standard CLI Help and Version
program
  .name('setup-next-app')
  .version('1.0.0')
  .description('A CLI tool to create a production-ready Next.js app with TypeScript, ESLint, Prettier, Jest, Husky, and CI/CD setup.')
  .argument('[app-name]', 'Name of the Next.js application')
  .option('--public', 'Create a public GitHub repository')
  .option('--private', 'Create a private GitHub repository')
  .option('--no-dependabot', 'Skip Dependabot configuration')
  .parse(process.argv);

// Parse CLI arguments
const options = program.opts();
const appNameArg = program.args[0];

// 🚨 Validate App Name
function validateAppName(name) {
  return /^[a-z0-9\-]+$/.test(name);
}

// Normalize app name
function normalizeName(rawName) {
  return rawName.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

async function main() {
  console.log(chalk.blue.bold('\n🚀 Next.js Production App Setup\n'));

  // Step 1: Get App Name
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

  // Step 2: Check Directory
  if (fs.existsSync(appDir)) {
    console.error(chalk.red(`❌ Error: Directory "${appDir}" already exists.`));
    process.exit(1);
  }

  // Step 3: Create Next.js App
  console.log(chalk.blue('📦 Creating Next.js application...'));
  execSync(`npx create-next-app@latest ${appDir} --typescript --eslint --app --src-dir --tailwind --use-pnpm`, { stdio: 'inherit' });

  process.chdir(appDir);

  // Step 4: Install Dependencies
  console.log(chalk.blue('🔧 Installing dependencies...'));
  execSync(`pnpm install --save-dev eslint prettier husky lint-staged @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-react-perf eslint-plugin-import eslint-plugin-unicorn eslint-plugin-simple-import-sort eslint-plugin-optimize-regex eslint-config-prettier eslint-plugin-prettier jest @testing-library/react @testing-library/jest-dom next/jest ts-jest`, { stdio: 'inherit' });

  // Step 5: Set Up Git
  console.log(chalk.blue('📂 Initializing Git...'));
  execSync('git init', { stdio: 'inherit' });

  // Step 6: Create GitHub Repository
  const repoVisibility = options.public ? 'public' : options.private ? 'private' : (await inquirer.prompt([
    {
      type: 'list',
      name: 'repoVisibility',
      message: 'Choose GitHub repository visibility:',
      choices: ['Public', 'Private']
    }
  ])).repoVisibility.toLowerCase();

  console.log(chalk.blue('🌐 Creating GitHub repository...'));
  execSync(`gh repo create ${appDir} --${repoVisibility} --source=. --remote=origin --push`, { stdio: 'inherit' });

  // Step 7: Set Up Husky
  console.log(chalk.blue('🐶 Setting up Husky...'));
  execSync('npx husky-init && pnpm install', { stdio: 'inherit' });
  execSync('npx husky set .husky/pre-commit "npx lint-staged"', { stdio: 'inherit' });
  execSync('npx husky set .husky/pre-push "pnpm type-check && pnpm test"', { stdio: 'inherit' });

  console.log(chalk.green('\n✅ Setup Complete!'));
  console.log(chalk.green(`👉 cd ${appDir} && pnpm dev`));
}

// 🚀 Run Main Function
main().catch((err) => {
  console.error(chalk.red(`❌ An error occurred: ${err.message}`));
  process.exit(1);
});
