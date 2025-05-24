import { it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from './App';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

vi.mock('components/Navbar/Navbar', () => ({
  default: () => <div data-testid="navbar" />,
}));

vi.mock('components/Footer/Footer', () => ({
  default: () => <div data-testid="footer" />,
}));

it('renders navbar', () => {
  render(<App />);

  screen.getByTestId('navbar');
});

it('renders navbar', () => {
  render(<App />);

  screen.getByTestId('footer');
});
