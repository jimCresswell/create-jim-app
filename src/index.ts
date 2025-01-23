#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { exitWithError, main } from './cli/main.js';
import { normalizeName } from './cli/stringNormalisation.js';

export function getPackageJson() {
  return JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
  );
}
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

if (!appNameArg) {
  exitWithError({ message: 'App name is required' });
}

const appName = normalizeName(appNameArg);

// All directories must be absolute paths
// constructed from the appName and the
// current working directory.
const appDir = path.join(process.cwd(), appName);

// DEBUG
// console.log('appDir', appDir);

main(appDir).catch((err: Error) => {
  exitWithError({ message: err.message });
});
