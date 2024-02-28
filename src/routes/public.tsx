// import { lazyImport } from '@/utils/lazyImport';


import { Landing } from '@/features/misc/routes/Landing';

// const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: '/',
    element: <Landing />,
  },
];