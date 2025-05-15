import Navbar from './Navbar';

import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

const Stub = createRoutesStub([
  {
    path: '/',
    Component: Navbar,
  },
]);

it('has header that redirects to root directory', () => {
  render(<Stub />);

  const heading = screen.getByRole('heading');
  const link = screen.getByRole('link', { name: /kitchen/i });

  expect(heading).toContainElement(link);
  expect(link).toHaveAttribute('href', '/');
});

it('has link that redirects to shop', () => {
  render(<Stub />);

  const link = screen.getByRole('link', { name: /products/i });
  expect(link).toHaveAttribute('href', '/shop');
});

it('has link with an icon that redirects to cart', () => {
  render(<Stub />);

  const link = screen.getByRole('link', { name: /cart/i });
  expect(link).toHaveAttribute('href', '/cart');

  const icon = link.querySelector('svg');
  expect(link).toContainElement(icon);
});
