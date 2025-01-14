import { describe, expect, test } from 'vitest';
import { normalizeName } from './stringNormalisation.js';

describe('normalizeName', () => {
  test('converts string to lowercase', () => {
    expect(normalizeName('MyApp')).toBe('myapp');
  });

  test('replaces spaces with hyphens', () => {
    expect(normalizeName('my app')).toBe('my-app');
  });

  test('replaces special characters with hyphens', () => {
    expect(normalizeName('my@app!')).toBe('my-app-');
  });

  test('handles multiple special characters and spaces', () => {
    expect(normalizeName('My Cool App!')).toBe('my-cool-app-');
  });

  test('throws error for undefined input', () => {
    expect(() => normalizeName(undefined)).toThrow();
  });

  test('throws error for empty string', () => {
    expect(() => normalizeName('')).toThrow();
  });
});
