import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Category } from '@/lib/categories';

const mockInvoke = vi.fn();
const mockSelect = vi.fn();
const mockFrom = vi.fn();

vi.mock('@/lib/supabase', () => ({
  supabase: {
    functions: {
      invoke: (...args: unknown[]) => mockInvoke(...args),
    },
    from: (...args: unknown[]) => mockFrom(...args),
  },
}));

import { getCategoryPercentage, incrementCategoryCount } from '@/lib/results';

describe('incrementCategoryCount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls the submit-result edge function with category and captcha token', async () => {
    mockInvoke.mockResolvedValue({ data: { ok: true }, error: null });

    const result = await incrementCategoryCount('dream', 'test-captcha-token');

    expect(result.error).toBeNull();
    expect(mockInvoke).toHaveBeenCalledWith('submit-result', {
      body: { category: 'dream', captchaToken: 'test-captcha-token' },
    });
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('returns invoke errors', async () => {
    const invokeError = new Error('invoke failed');
    mockInvoke.mockResolvedValue({ data: null, error: invokeError });

    const result = await incrementCategoryCount('soul', 'test-captcha-token');

    expect(result.error).toBe(invokeError);
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('returns an error when the edge function responds with failure', async () => {
    mockInvoke.mockResolvedValue({
      data: { error: 'Captcha verification failed' },
      error: null,
    });

    const result = await incrementCategoryCount('adventure', 'bad-token');

    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe('Captcha verification failed');
  });
});

describe('getCategoryPercentage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFrom.mockReturnValue({ select: mockSelect });
  });

  it('calculates the percentage for a category', async () => {
    mockSelect.mockResolvedValue({
      data: [
        { category: 'dream', count: 30 },
        { category: 'soul', count: 20 },
        { category: 'adventure', count: 50 },
      ],
      error: null,
    });

    const result = await getCategoryPercentage('adventure' as Category);

    expect(result.error).toBeNull();
    expect(result.percentage).toBe(50);
  });

  it('returns 0 when there are no results yet', async () => {
    mockSelect.mockResolvedValue({
      data: [
        { category: 'dream', count: 0 },
        { category: 'soul', count: 0 },
        { category: 'adventure', count: 0 },
      ],
      error: null,
    });

    const result = await getCategoryPercentage('dream');

    expect(result.error).toBeNull();
    expect(result.percentage).toBe(0);
  });

  it('returns an error when the query fails', async () => {
    const queryError = new Error('query failed');
    mockSelect.mockResolvedValue({ data: null, error: queryError });

    const result = await getCategoryPercentage('soul');

    expect(result.percentage).toBeNull();
    expect(result.error).toBe(queryError);
  });
});
