import { describe, expect, test } from 'vitest';

import { testTheTestSetup } from './made_up_function.js';

describe('sum module', () => {
  test('adds 1 + 2 + 3 to equal 6', () => {
    const expected = 6;
    const actual = testTheTestSetup(1, 2, 3);
    expect(actual).toBe(expected);
  });
});
