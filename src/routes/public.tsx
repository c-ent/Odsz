import { Landing } from '@/features/quiz/routes/Landing';
import { NotFound } from '@/features/quiz/routes/NotFound';
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
  {
    path: '*',
    element: <NotFound />,
  },
];
