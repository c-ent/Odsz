import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: () => null,
}));

afterEach(() => {
  cleanup();
});
