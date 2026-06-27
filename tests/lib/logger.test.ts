import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@/lib/logger';

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs structured errors in development', () => {
    vi.stubEnv('DEV', true);

    logger.error('Something failed', {
      error: new Error('boom'),
      context: { category: 'dream' },
    });

    expect(console.error).toHaveBeenCalledWith('[odsz] Something failed', {
      category: 'dream',
      error: 'boom',
    });

    vi.unstubAllEnvs();
  });

  it('does not log in production', () => {
    vi.stubEnv('DEV', false);

    logger.error('Something failed', {
      error: new Error('boom'),
      context: { category: 'dream' },
    });

    expect(console.error).not.toHaveBeenCalled();

    vi.unstubAllEnvs();
  });
});
