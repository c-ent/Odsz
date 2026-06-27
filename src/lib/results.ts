import type { Category } from '@/lib/categories';
import { logger } from '@/lib/logger';
import { supabase } from '@/lib/supabase';

type SubmitResultResponse = {
  ok?: boolean;
  error?: string;
};

export async function incrementCategoryCount(
  category: Category,
  captchaToken: string,
): Promise<{ error: Error | null }> {
  const { data, error } = await supabase.functions.invoke<SubmitResultResponse>(
    'submit-result',
    {
      body: { category, captchaToken },
    },
  );

  if (error) {
    logger.error('Failed to submit result', {
      error,
      context: { category },
    });
    return { error };
  }

  if (!data?.ok) {
    const message = data?.error ?? 'Submit failed';
    logger.error('Failed to submit result', {
      error: message,
      context: { category },
    });
    return { error: new Error(message) };
  }

  return { error: null };
}

export async function getCategoryPercentage(
  category: Category,
): Promise<{ percentage: number | null; error: Error | null }> {
  const { data: categoriesData, error } = await supabase
    .from('results')
    .select('category, count');

  if (error) {
    logger.error('Failed to fetch category percentages', {
      error,
      context: { category },
    });
    return { percentage: null, error };
  }

  const totalCount = categoriesData.reduce((total, row) => total + row.count, 0);
  const categoryCount =
    categoriesData.find((row) => row.category === category)?.count || 0;
  const percentage = totalCount > 0 ? (categoryCount / totalCount) * 100 : 0;

  return { percentage, error: null };
}
