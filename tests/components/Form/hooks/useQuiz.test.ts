import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuiz } from '@/components/Form/hooks/useQuiz';

vi.mock('@/files/questions.json', () => ({
  default: [
    {
      id: 1,
      question: 'Question one?',
      choices: [
        { id: 1, choice: 'Alpha' },
        { id: 2, choice: 'Beta' },
        { id: 3, choice: 'Gamma' },
      ],
    },
    {
      id: 2,
      question: 'Question two?',
      choices: [
        { id: 1, choice: 'Alpha' },
        { id: 2, choice: 'Beta' },
        { id: 3, choice: 'Gamma' },
      ],
    },
  ],
}));

describe('useQuiz', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts on the first question', () => {
    const { result } = renderHook(() => useQuiz());

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.questions).toHaveLength(2);
    expect(['Question one?', 'Question two?']).toContain(
      result.current.currentQuestion?.question,
    );
    expect(result.current.isComplete).toBe(false);
  });

  it('records a choice and advances after the delay', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.handleChoiceClick(1);
    });

    expect(result.current.selectedChoices).toEqual([1]);
    expect(result.current.selectedChoice).toBe(1);

    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.selectedChoice).toBeNull();
  });

  it('ignores additional clicks before advancing', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.handleChoiceClick(1);
      result.current.handleChoiceClick(2);
    });

    expect(result.current.selectedChoices).toEqual([1]);
  });

  it('marks the quiz complete after all questions are answered', () => {
    const { result } = renderHook(() => useQuiz());

    act(() => {
      result.current.handleChoiceClick(1);
      vi.advanceTimersByTime(700);
    });

    act(() => {
      result.current.handleChoiceClick(2);
      vi.advanceTimersByTime(700);
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.currentQuestion).toBeUndefined();
  });
});
