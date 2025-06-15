import Home from './Home';

import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { it } from 'vitest';

const Stub = createRoutesStub([
  {
    path: '/',
    Component: Home,
  },
]);

function setup() {
  render(<Stub initialEntries={['/']} />);
}

it('renders website title', () => {
  setup();

  screen.getByRole('heading', { level: 1, name: /kitchen market/i });
});

it('renders website description', () => {
  setup();

  screen.getByRole('heading', {
    level: 2,
    name: /essentials for every kitchen/i,
  });
});
