#!/usr/bin/env node

import { main, exitWithError } from './cli/main.js';

main().catch((err) => {
  exitWithError(err.message);
});
