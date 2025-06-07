import { it } from 'vitest';
import Footer from './Footer';
import { render, screen } from '@testing-library/react';

it('has a contentinfo wrapper', () => {
  render(<Footer />);

  screen.getByRole('contentinfo');
});

it('renders contact header', () => {
  render(<Footer />);

  screen.getByRole('heading', { name: /contact/i });
});

it('renders phone number', () => {
  render(<Footer />);

  screen.getByText(/\+1 \(555\) 293-8472/i);
});

it('renders email', () => {
  render(<Footer />);

  screen.getByText(/support@kitchenmarket.com/i);
});

it('renders shipping address heading', () => {
  render(<Footer />);

  screen.getByRole('heading', { name: /shipping address/i });
});

it('renders business name', () => {
  render(<Footer />);

  screen.getByText(/Kitchen Market Supplies Ltd./i);
});

it('renders street and house number', () => {
  render(<Footer />);

  screen.getByText(/1425 Maplewood Drive/i);
});

it('renders postal code and city', () => {
  render(<Footer />);

  screen.getByText(/94117 San Francisco/i);
});

it('renders country', () => {
  render(<Footer />);

  screen.getByText(/United States/i);
});
