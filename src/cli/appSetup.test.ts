import { describe, test, expect, vi } from 'vitest';
import { setupApp } from './appSetup.js';
import { createNextApp } from './appCreator.js';
import { copyTemplates } from './templateManager.js';

vi.mock('./appCreator.js', () => ({
  createNextApp: vi.fn(),
}));

vi.mock('./templateManager.js', () => ({
  copyTemplates: vi.fn(),
}));

describe('setupApp', () => {
  test('should create app and copy templates', () => {
    setupApp('test-app');
    expect(createNextApp).toHaveBeenCalledWith('test-app');
    expect(copyTemplates).toHaveBeenCalled();
  });
});
