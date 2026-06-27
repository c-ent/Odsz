import { Landing } from '@/features/quiz/routes/Landing';
import { Results } from '@/features/quiz/routes/Results';

export const publicRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/result/:category',
    element: <Results />,
  },
];
