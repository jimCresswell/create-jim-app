import { Command } from 'commander';
import { getPackageJson } from './config.js';
import { exitWithError } from './errorHandling.js';
import { runValidations } from './validation.js';
import { setupApp } from './appSetup.js';
import { normalizeName } from './stringNormalisation.js';

const packagejson = getPackageJson();

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

const appNameArg = program.args[0];

async function main() {
  try {
    runValidations();
    const appName = normalizeName(appNameArg);
    setupApp(appName);
  } catch (error: unknown) {
    exitWithError({
      message: 'An unknown error occurred',
      originalError: error,
    });
  }
}

export { main, exitWithError };
