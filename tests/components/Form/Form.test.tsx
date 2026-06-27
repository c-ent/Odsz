import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Form } from '@/components/Form/Form';
import { useQuiz, type UseQuizResult } from '@/components/Form/hooks/useQuiz';
import { useSubmitResult } from '@/components/Form/hooks/useSubmitResult';

vi.mock('@/components/Form/hooks/useQuiz');
vi.mock('@/components/Form/hooks/useSubmitResult');

const mockQuestion = {
  id: 1,
  question: 'What drives you most?',
  choices: [
    { id: 1, choice: 'Building a legacy' },
    { id: 2, choice: 'Learning about myself' },
    { id: 3, choice: 'Exploring the unknown' },
  ],
};

describe('Form', () => {
  const handleChoiceClick = vi.fn();
  const retry = vi.fn();
  const submitWithToken = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSubmitResult).mockReturnValue({
      isSubmitting: false,
      submitError: null,
      retry,
      submitWithToken,
      captchaKey: 0,
    });
  });

  it('renders the current question and choices', () => {
    vi.mocked(useQuiz).mockReturnValue({
      questions: [mockQuestion],
      currentQuestionIndex: 0,
      currentQuestion: mockQuestion,
      selectedChoices: [],
      selectedChoice: null,
      isComplete: false,
      handleChoiceClick,
    });

    const view = render(<Form />);

    expect(view.getByText('Question 1 out of 1')).toBeInTheDocument();
    expect(view.getByText('What drives you most?')).toBeInTheDocument();
    expect(view.getByText('Building a legacy')).toBeInTheDocument();
    expect(view.getByText('Learning about myself')).toBeInTheDocument();
    expect(view.getByText('Exploring the unknown')).toBeInTheDocument();
  });

  it('calls handleChoiceClick when a choice is selected', async () => {
    const user = userEvent.setup();

    vi.mocked(useQuiz).mockReturnValue({
      questions: [mockQuestion],
      currentQuestionIndex: 0,
      currentQuestion: mockQuestion,
      selectedChoices: [],
      selectedChoice: null,
      isComplete: false,
      handleChoiceClick,
    });

    const view = render(<Form />);

    await user.click(view.getByRole('button', { name: 'Building a legacy' }));

    expect(handleChoiceClick).toHaveBeenCalledWith(1);
  });

  it('calls handleChoiceClick when a choice is activated with the keyboard', async () => {
    const user = userEvent.setup();

    vi.mocked(useQuiz).mockReturnValue({
      questions: [mockQuestion],
      currentQuestionIndex: 0,
      currentQuestion: mockQuestion,
      selectedChoices: [],
      selectedChoice: null,
      isComplete: false,
      handleChoiceClick,
    });

    const view = render(<Form />);

    view.getByRole('button', { name: 'Building a legacy' }).focus();
    await user.keyboard('{Enter}');

    expect(handleChoiceClick).toHaveBeenCalledWith(1);
  });

  it('shows the loading state when the quiz is complete', () => {
    vi.mocked(useQuiz).mockReturnValue({
      questions: [mockQuestion],
      currentQuestionIndex: 1,
      currentQuestion: undefined,
      selectedChoices: [1],
      selectedChoice: null,
      isComplete: true,
      handleChoiceClick,
    } as UseQuizResult);

    vi.mocked(useSubmitResult).mockReturnValue({
      isSubmitting: true,
      submitError: null,
      retry,
      submitWithToken,
      captchaKey: 0,
    });

    const view = render(<Form />);

    expect(view.getByText('Calculating your results')).toBeInTheDocument();
  });

  it('shows an error state with retry when submit fails', async () => {
    const user = userEvent.setup();

    vi.mocked(useQuiz).mockReturnValue({
      questions: [mockQuestion],
      currentQuestionIndex: 1,
      currentQuestion: undefined,
      selectedChoices: [1],
      selectedChoice: null,
      isComplete: true,
      handleChoiceClick,
    } as UseQuizResult);

    vi.mocked(useSubmitResult).mockReturnValue({
      isSubmitting: false,
      submitError: 'Something went wrong while saving your result.',
      retry,
      submitWithToken,
      captchaKey: 0,
    });

    const view = render(<Form />);

    await user.click(view.getByRole('button', { name: 'Try again' }));

    expect(retry).toHaveBeenCalledOnce();
  });
});
