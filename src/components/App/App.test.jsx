import { beforeEach, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';

import App from './App';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import { Outlet } from 'react-router';

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('fetchTestValue') })
);

vi.mock('react-router', () => {
  const originalModule = vi.importActual('react-router');

  return {
    ...originalModule,
    Outlet: vi.fn(),
  };
});

vi.mock('components/Footer/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

vi.mock('components/Navbar/Navbar', () => ({
  default: () => <div data-testid="navbar" />,
}));

it('renders navbar', async () => {
  await act(async () => {
    render(<App />);
  });

  screen.getByTestId('navbar');
});

it('renders footer', async () => {
  await act(async () => {
    render(<App />);
  });

  screen.getByTestId('footer');
});

it('renders outlet with products in context', async () => {
  await act(async () => {
    render(<App />);
  });

  expect(Outlet.mock.lastCall[0].context.products).toBe('fetchTestValue');

  vi.restoreAllMocks();
});
