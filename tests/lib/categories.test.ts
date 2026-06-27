import { describe, expect, it } from 'vitest';
import {
  CATEGORIES,
  CHOICE_TO_CATEGORY,
  getWinningCategory,
  isCategory,
} from '@/lib/categories';

describe('isCategory', () => {
  it('returns true for valid categories', () => {
    expect(isCategory('dream')).toBe(true);
    expect(isCategory('soul')).toBe(true);
    expect(isCategory('adventure')).toBe(true);
  });

  it('returns false for invalid values', () => {
    expect(isCategory('invalid')).toBe(false);
    expect(isCategory(undefined)).toBe(false);
    expect(isCategory('')).toBe(false);
  });
});

describe('getWinningCategory', () => {
  it('returns dream when there are no choices', () => {
    expect(getWinningCategory([])).toBe('dream');
  });

  it('returns the category with the most votes', () => {
    expect(getWinningCategory([1, 1, 1, 2, 3])).toBe('dream');
    expect(getWinningCategory([2, 2, 2, 1, 3])).toBe('soul');
    expect(getWinningCategory([3, 3, 3, 1, 2])).toBe('adventure');
  });

  it('ignores unknown choice ids', () => {
    expect(getWinningCategory([99, 1, 1])).toBe('dream');
  });

  it('keeps the first leader when counts are tied', () => {
    expect(getWinningCategory([1, 2])).toBe('dream');
    expect(getWinningCategory([2, 1])).toBe('soul');
  });
});

describe('CATEGORIES', () => {
  it('defines metadata for every mapped category', () => {
    const categories = new Set(Object.values(CHOICE_TO_CATEGORY));

    for (const category of categories) {
      expect(CATEGORIES[category].title).toBeTruthy();
      expect(CATEGORIES[category].description).toBeTruthy();
      expect(CATEGORIES[category].svg).toBeTruthy();
    }
  });
});
