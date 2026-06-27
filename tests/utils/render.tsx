import { render, type RenderOptions } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

type RenderWithProvidersOptions = RenderOptions & {
  route?: string;
};

export function renderWithProviders(
  ui: ReactElement,
  { route = '/', ...options }: RenderWithProvidersOptions = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <HelmetProvider>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </HelmetProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export function renderAtRoute(route: string, path: string, element: ReactElement) {
  return renderWithProviders(
    <Routes>
      <Route path={path} element={element} />
    </Routes>,
    { route },
  );
}
