import chalk from 'chalk';

interface ErrorOptions {
  message?: string | undefined;
  originalError?: unknown;
  exitCode?: number;
  showStack?: boolean;
}

export function exitWithError({
  message = 'An unknown error occurred',
  originalError,
  exitCode = 1,
  showStack = process.env['NODE_ENV'] === 'development' ||
    process.env['SHOW_STACK'] === 'true',
}: ErrorOptions): never {
  console.error(chalk.red(`❌ Error: ${message}`));

  if (originalError instanceof Error) {
    console.error(chalk.red(`Original error: ${originalError.message}`));

    if (showStack && originalError.stack) {
      console.error(chalk.gray(originalError.stack));
    }
  } else if (typeof originalError === 'string') {
    console.error(chalk.red(`Original error: ${originalError}`));
  } else {
    console.error(
      chalk.red(`Original error: ${JSON.stringify(originalError)}`),
    );
  }

  process.exit(exitCode);
}
