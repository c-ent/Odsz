import DreamChaserSvg from '@/svg/DreamChaserSvg.svg';
import GrowthSeekerSvg from '@/svg/GrowthSeekerSvg.svg';
import VoyagerSvg from '@/svg/VoyagerSvg.svg';

export type Category = 'dream' | 'soul' | 'adventure';

export const CATEGORIES: Record<
  Category,
  { title: string; description: string; svg: string }
> = {
  dream: {
    title: 'Dream Chaser',
    description:
      "You're driven by your goals and aspirations. You work steadily to make your dreams a reality, motivated by a clear vision of what you want to achieve.",
    svg: DreamChaserSvg,
  },
  soul: {
    title: 'Growth Seeker',
    description:
      "You value personal growth and self-discovery. You see change as an opportunity to learn about yourself and enjoy exploring different perspectives.",
    svg: GrowthSeekerSvg,
  },
  adventure: {
    title: 'Voyager',
    description:
      "You're naturally curious and love exploring new ideas and experiences. You're drawn to discovery and aren't afraid to step outside your comfort zone.",
    svg: VoyagerSvg,
  },
};

export const CHOICE_TO_CATEGORY: Record<number, Category> = {
  1: 'dream',
  2: 'soul',
  3: 'adventure',
};

export function isCategory(value: string | undefined): value is Category {
  return value === 'dream' || value === 'soul' || value === 'adventure';
}

export function getWinningCategory(selectedChoices: number[]): Category {
  const categoryCounts = selectedChoices.reduce<Partial<Record<Category, number>>>(
    (counts, choiceId) => {
      const category = CHOICE_TO_CATEGORY[choiceId];
      if (!category) return counts;
      return { ...counts, [category]: (counts[category] || 0) + 1 };
    },
    {},
  );

  const entries = Object.entries(categoryCounts) as [Category, number][];
  if (entries.length === 0) return 'dream';

  return entries.reduce((max, entry) => (entry[1] > max[1] ? entry : max))[0];
}
