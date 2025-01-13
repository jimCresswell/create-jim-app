#!/usr/bin/env node

import { main, exitWithError } from './main.js';

main().catch((err) => {
  exitWithError(err.message);
});
