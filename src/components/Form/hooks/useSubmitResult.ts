import { getWinningCategory } from '@/lib/categories';
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const submitWithToken = useCallback(
    async (captchaToken: string) => {
      if (!isComplete || isSubmitting) return;

      setIsSubmitting(true);
      setSubmitError(null);

      const maxCategory = getWinningCategory(selectedChoices);
      const { error } = await incrementCategoryCount(maxCategory, captchaToken);

      if (error) {
        setIsSubmitting(false);
        setSubmitError('Something went wrong while saving your result.');
        setCaptchaKey((key) => key + 1);
        return;
      }

      navigate(`/result/${maxCategory}`);
    },
    [isComplete, isSubmitting, selectedChoices, navigate],
  );

  const retry = () => {
    setSubmitError(null);
    setCaptchaKey((key) => key + 1);
  };

  return { isSubmitting, submitError, retry, submitWithToken, captchaKey };
};
