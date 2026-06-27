import { waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Results } from '@/features/quiz/routes/Results';
import { getCategoryPercentage } from '@/lib/results';
import { renderAtRoute } from '@tests/utils/render';

vi.mock('@/lib/results', () => ({
  getCategoryPercentage: vi.fn(),
}));

describe('Results', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the dream chaser result page', async () => {
    vi.mocked(getCategoryPercentage).mockResolvedValue({
      percentage: 42.5,
      error: null,
    });

    const view = renderAtRoute('/result/dream', '/result/:category', <Results />);

    expect(view.getByText("you're a")).toBeInTheDocument();
    expect(view.getByText('Dream Chaser')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        view.getByText(/42\.5% of users got the result Dream Chaser/),
      ).toBeInTheDocument();
    });
  });

  it('shows a not-found message for invalid categories', () => {
    const view = renderAtRoute('/result/unknown', '/result/:category', <Results />);

    expect(view.getByText('Category not found.')).toBeInTheDocument();
    expect(view.getByRole('link', { name: 'Return Home' })).toHaveAttribute('href', '/');
  });

  it('shows a stats error message when loading fails', async () => {
    vi.mocked(getCategoryPercentage).mockResolvedValue({
      percentage: null,
      error: new Error('network error'),
    });

    const view = renderAtRoute('/result/soul', '/result/:category', <Results />);

    expect(view.getByText('Growth Seeker')).toBeInTheDocument();

    await waitFor(() => {
      expect(view.getByText('Unable to load stats right now.')).toBeInTheDocument();
    });
  });

  it('links back to the home page', async () => {
    vi.mocked(getCategoryPercentage).mockResolvedValue({
      percentage: 10,
      error: null,
    });

    const view = renderAtRoute('/result/adventure', '/result/:category', <Results />);

    await waitFor(() => {
      expect(view.getByText('Voyager')).toBeInTheDocument();
    });

    expect(view.getByRole('link', { name: /Return Home/i })).toHaveAttribute('href', '/');
  });
});
