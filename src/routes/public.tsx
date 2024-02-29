// import { lazyImport } from '@/utils/lazyImport';


import { Landing } from '@/features/misc/routes/Landing';
import { Results } from '@/features/misc/routes/Results';
// const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

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