import questionsorig from '@/files/questions.json';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Choice {
  id: number;
  choice: string;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
}

export type UseQuizResult = {
  questions: Question[];
  currentQuestionIndex: number;
  currentQuestion: Question | undefined;
  selectedChoices: number[];
  selectedChoice: number | null;
  isComplete: boolean;
  handleChoiceClick: (choiceId: number) => void;
};

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}

const ADVANCE_DELAY_MS = 700;

export function useQuiz(): UseQuizResult {
  const [questions] = useState(() => shuffle(questionsorig as Question[]));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSelectedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const handleChoiceClick = useCallback((choiceId: number) => {
    if (hasSelectedRef.current) return;

    hasSelectedRef.current = true;
    setSelectedChoice(choiceId);
    setSelectedChoices((prev) => [...prev, choiceId]);

    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);

    advanceTimerRef.current = setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedChoice(null);
      hasSelectedRef.current = false;
    }, ADVANCE_DELAY_MS);
  }, []);

  const isComplete = currentQuestionIndex >= questions.length;
  const currentQuestion: Question | undefined = questions[currentQuestionIndex];

  return {
    questions,
    currentQuestionIndex,
    currentQuestion,
    selectedChoices,
    selectedChoice,
    isComplete,
    handleChoiceClick,
  };
}
