import { render, screen } from '@testing-library/react';
import Product from './Product';

import { createRoutesStub, Outlet } from 'react-router';
import { expect, it, vi } from 'vitest';

import ReviewsList from 'components/ReviewsList/ReviewsList';
import StarRating from 'components/StarRating/StarRating';

vi.mock('components/ReviewsList/ReviewsList');
vi.mock('components/StarRating/StarRating');

const products = [
  {
    id: 48,
    title: 'product name',
    description: 'some description text',
    price: 7.99,
    rating: 3.27,
    reviews: 'reviewsExampleValue',
    images: ['https://placehold.co/600x400'],
  },
];

const Stub = createRoutesStub([
  {
    path: '/',
    Component: () => <Outlet context={products} />,
    children: [
      {
        path: 'product/:productId',
        Component: Product,
      },
    ],
  },
]);

function renderOnExisitngProduct() {
  render(<Stub initialEntries={['/product/48']} />);
}

it('renders no product found text when productId is incorrect', () => {
  render(<Stub initialEntries={['/product/11']} />);

  screen.getByText(/no product found/i);
});

it('renders image', () => {
  renderOnExisitngProduct();

  const image = screen.getByAltText(/product name/i);
  expect(image).toHaveAttribute('src', 'https://placehold.co/600x400');
});

it('renders title ', () => {
  renderOnExisitngProduct();

  screen.getByRole('heading', { name: /product name/i });
});

it('render price', () => {
  renderOnExisitngProduct();

  screen.getByText(/7.99 €/i);
});

it('renders description', () => {
  renderOnExisitngProduct();

  screen.getByText(/some description text/i);
});

it('render reviews', () => {
  renderOnExisitngProduct();

  expect(ReviewsList.mock.lastCall[0]).toEqual({
    reviews: 'reviewsExampleValue',
  });
});

it('render rating', () => {
  renderOnExisitngProduct();

  expect(StarRating.mock.lastCall[0]).toEqual({
    rating: 3.27,
  });
});
