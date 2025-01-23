import { exitWithError } from './errorHandling.js';
import { runValidations } from './validation.js';
import { createJimApp } from './appCreator.js';

async function main(appDir: string) {
  try {
    // Validate the necessary dependencies are installed.
    runValidations();

    // Create the Next.js application.
    createJimApp(appDir);

    /** @todo add the new app to GitHub. */
    /** @todo add the new app to Vercel. */
    /** @todo Make sure the GH-Vercel integration is set up. */
  } catch (error: unknown) {
    exitWithError({
      message: 'An unknown error occurred',
      originalError: error,
    });
  }
}

export { main, exitWithError };
