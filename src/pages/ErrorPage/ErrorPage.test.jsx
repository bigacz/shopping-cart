import ErrorPage from './ErrorPage';

import { expect, it, vi } from 'vitest';
import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';

const Stub = createRoutesStub([
  {
    path: '/',
    Component: () => {
      throw new Error('elo');
    },
    ErrorBoundary: ErrorPage,
  },
]);

it('renders an unexpected error page on error other than 404', () => {
  const originalConsoleError = console.error;
  console.error = vi.fn();
  // REMOVE CONSOLE MOCK IF TEST FAILS

  render(<Stub initialEntries={['/']} />);
  console.error = originalConsoleError;

  screen.getByRole('heading', { name: /unexpected error/i });
  screen.getByText(/something went wrong/i);
});
