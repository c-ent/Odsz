import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Landing } from '@/features/quiz/routes/Landing';
import { renderWithProviders } from '@tests/utils/render';

vi.mock('@/components/Form', () => ({
  Form: () => <div data-testid="quiz-form">Quiz Form</div>,
}));

describe('Landing', () => {
  it('renders the hero banner before the quiz starts', () => {
    const view = renderWithProviders(<Landing />);

    expect(view.getByText('unveil your character')).toBeInTheDocument();
    expect(view.getByRole('button', { name: 'begin' })).toBeInTheDocument();
    expect(view.queryByTestId('quiz-form')).not.toBeInTheDocument();
  });

  it('shows the quiz form after clicking begin', async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    const view = renderWithProviders(<Landing />);

    await user.click(view.getByRole('button', { name: 'begin' }));

    expect(scrollIntoView).toHaveBeenCalled();
    expect(view.getByTestId('quiz-form')).toBeInTheDocument();
  });
});
