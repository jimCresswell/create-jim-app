import { exitWithError } from './errorHandling.js';

function normalizeName(rawName: string | undefined): string {
  if (rawName === undefined || rawName === '') {
    exitWithError({
      message: `❌ Error: Invalid app name: "${rawName}"`,
    });
  }
  return rawName.toLowerCase().replace(/[^a-z0-9./\\]/g, '_');
}

export { normalizeName };
