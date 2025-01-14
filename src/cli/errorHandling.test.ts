import { describe, test, expect, vi } from 'vitest';
import { exitWithError } from './errorHandling.js';

vi.spyOn(process, 'exit').mockImplementation(() => {
  throw new Error('process.exit called');
});

describe('exitWithError', () => {
  test('should log error and exit', () => {
    expect(() => exitWithError({ message: 'Test error' })).toThrow(
      'process.exit called',
    );
  });
});
