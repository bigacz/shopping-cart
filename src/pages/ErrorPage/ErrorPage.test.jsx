import ErrorPage from './ErrorPage';

import { it } from 'vitest';
import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';

const Stub = createRoutesStub([
  {
    path: '/',
    Component: ErrorPage,
  },
]);

it('renders a 404 heading', () => {
  render(<Stub initialEntries={['/']} />);

  screen.getByRole('heading', { level: 2, name: /404 error/i });
});

it('renders description', () => {
  render(<Stub initialEntries={['/']} />);

  screen.getByText(/this page doesn't exist/i);
});
