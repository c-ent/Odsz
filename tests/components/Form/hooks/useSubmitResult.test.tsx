import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import type { ReactNode } from 'react';
import { incrementCategoryCount } from '@/lib/results';
import { useSubmitResult } from '@/components/Form/hooks/useSubmitResult';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@/lib/results', () => ({
  incrementCategoryCount: vi.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe('useSubmitResult', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates to the result page after a successful submit', async () => {
    vi.mocked(incrementCategoryCount).mockResolvedValue({ error: null });

    const { result } = renderHook(
      () =>
        useSubmitResult({
          isComplete: true,
          selectedChoices: [1, 1, 2, 3],
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.submitWithToken('captcha-token');
    });

    expect(incrementCategoryCount).toHaveBeenCalledWith('dream', 'captcha-token');
    expect(mockNavigate).toHaveBeenCalledWith('/result/dream');
  });

  it('still navigates to the result page when saving fails', async () => {
    vi.mocked(incrementCategoryCount).mockResolvedValue({
      error: new Error('submit failed'),
    });

    const { result } = renderHook(
      () =>
        useSubmitResult({
          isComplete: true,
          selectedChoices: [2, 2, 2],
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.submitWithToken('captcha-token');
    });

    expect(mockNavigate).toHaveBeenCalledWith('/result/soul');
  });

  it('still navigates to the result page when saving throws', async () => {
    vi.mocked(incrementCategoryCount).mockRejectedValue(new Error('network down'));

    const { result } = renderHook(
      () =>
        useSubmitResult({
          isComplete: true,
          selectedChoices: [3, 3, 3],
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.submitWithToken('captcha-token');
    });

    expect(mockNavigate).toHaveBeenCalledWith('/result/adventure');
  });

  it('does not submit when the quiz is not complete', async () => {
    const { result } = renderHook(
      () =>
        useSubmitResult({
          isComplete: false,
          selectedChoices: [1],
        }),
      { wrapper },
    );

    await act(async () => {
      await result.current.submitWithToken('captcha-token');
    });

    expect(incrementCategoryCount).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
