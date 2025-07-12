import { render, screen } from '@testing-library/react';
import Product from './Product';

import { createRoutesStub, Outlet } from 'react-router';
import { expect, it, vi } from 'vitest';

import ReviewsList from 'components/ReviewsList/ReviewsList';
import StarRating from 'components/StarRating/StarRating';
import userEvent from '@testing-library/user-event';

const products = [
  {
    id: 48,
    title: 'product name',
    description: 'some description text',
    price: 7.99,
    rating: 3.27,
    reviews: [
      {
        reviewerName: 'John',
        comment: 'good',
        date: '2025-04-30T09:41:02.053Z',
        rating: 5,
      },
    ],
    images: ['https://placehold.co/600x400'],
  },
];

const cart = {};

const addProduct = vi.fn();

const Stub = createRoutesStub([
  {
    path: '/',
    Component: () => <Outlet context={{ products, cart, addProduct }} />,
    children: [
      {
        path: 'product/:productId',
        Component: Product,
      },
    ],
  },
]);

function setupOnExisitngProduct() {
  const user = userEvent.setup();
  render(<Stub initialEntries={['/product/48']} />);

  return { user };
}

it('renders no product found text when productId is incorrect', () => {
  render(<Stub initialEntries={['/product/11']} />);

  screen.getByText(/no product found/i);
});

it('renders image', () => {
  setupOnExisitngProduct();

  const image = screen.getByAltText(/product name/i);
  expect(image).toHaveAttribute('src', 'https://placehold.co/600x400');
});

it('renders title ', () => {
  setupOnExisitngProduct();

  screen.getByRole('heading', { name: /product name/i });
});

it('renders price', () => {
  setupOnExisitngProduct();

  screen.getByText(/7.99 \$/i);
});

it('renders description', () => {
  setupOnExisitngProduct();

  screen.getByText(/some description text/i);
});

it('renders reviews', () => {
  setupOnExisitngProduct();

  screen.getByText(/John/i);
  screen.getByText(/loved it/i);
  screen.getByText(/good/i);
  screen.getByText('30/04/2025');
});

it('renders rating', () => {
  setupOnExisitngProduct();

  const stars = screen.queryAllByTestId('star-filled');
  expect(stars.length).toBe(5);
});
