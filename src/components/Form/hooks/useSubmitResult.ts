import { getWinningCategory } from '@/lib/categories';
import { logger } from '@/lib/logger';
import { incrementCategoryCount } from '@/lib/results';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UseSubmitResultOptions = {
  isComplete: boolean;
  selectedChoices: number[];
};

export function useSubmitResult({ isComplete, selectedChoices }: UseSubmitResultOptions) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitWithToken = useCallback(
    async (captchaToken: string) => {
      if (!isComplete || isSubmitting) return;

      setIsSubmitting(true);

      const maxCategory = getWinningCategory(selectedChoices);

      try {
        await incrementCategoryCount(maxCategory, captchaToken);
      } catch (error) {
        logger.error('Failed to submit result', {
          error,
          context: { category: maxCategory },
        });
      }

      navigate(`/result/${maxCategory}`);
    },
    [isComplete, isSubmitting, selectedChoices, navigate],
  );

  return { isSubmitting, submitWithToken };
};
