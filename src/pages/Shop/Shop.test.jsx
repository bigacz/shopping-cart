import { expect, it } from 'vitest';
import Shop from './Shop';
import { createRoutesStub, Outlet } from 'react-router';
import { render, screen } from '@testing-library/react';

const products = [
  {
    id: 48,
    title: 'product name 1',
    price: 7.99,
    images: ['https://placehold.co/700x500'],
  },
  {
    id: 52,
    title: 'product name 2',
    price: 90.99,
    images: ['https://placehold.co/600x400'],
  },
];

const Stub = createRoutesStub([
  {
    path: '/',
    Component: () => <Outlet context={{ products }} />,
    children: [
      {
        path: 'shop',
        Component: Shop,
      },
    ],
  },
]);

it('renders product image', () => {
  render(<Stub initialEntries={['/shop']} />);

  const image = screen.getByAltText('product name 1');
  expect(image).toHaveAttribute('src', 'https://placehold.co/700x500');
});

it('renders product name', () => {
  render(<Stub initialEntries={['/shop']} />);

  screen.getByText('product name 1');
});

it('renders product price', () => {
  render(<Stub initialEntries={['/shop']} />);

  screen.getByText(/7.99 \$/i);
});

it('product wrapper is a link that redirects to current product page', () => {
  render(<Stub initialEntries={['/shop']} />);

  const wrapper = screen.getByRole('link', { name: /product name 1/i });
  expect(wrapper).toHaveAttribute('href', '/product/48');
});

it('renders multiple products', () => {
  render(<Stub initialEntries={['/shop']} />);

  const image1 = screen.getByAltText('product name 1');
  expect(image1).toHaveAttribute('src', 'https://placehold.co/700x500');

  screen.getByText('product name 1');
  screen.getByText(/7.99 \$/i);

  const image2 = screen.getByAltText('product name 2');
  expect(image2).toHaveAttribute('src', 'https://placehold.co/600x400');

  screen.getByText('product name 2');
  screen.getByText(/90.99 \$/i);
});
