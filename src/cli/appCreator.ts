import { execSync } from 'child_process';
import chalk from 'chalk';

function createNextApp(appDir: string): void {
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

  // Set up Husky.
  console.log(chalk.blue('🐶 Setting up Husky...'));
  execSync('npx husky-init && pnpm install', { stdio: 'inherit' });
  execSync('npx husky set .husky/pre-commit "npx lint-staged"', {
    stdio: 'inherit',
  });
  execSync('npx husky set .husky/pre-push "pnpm type-check && pnpm test"', {
    stdio: 'inherit',
  });
}

export { createNextApp };
