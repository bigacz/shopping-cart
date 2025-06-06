import { render, screen } from '@testing-library/react';
import Product from './Product';

import { createRoutesStub, Outlet } from 'react-router';
import { expect, it, vi } from 'vitest';

import ReviewsList from 'components/ReviewsList/ReviewsList';
import StarRating from 'components/StarRating/StarRating';
import userEvent from '@testing-library/user-event';

vi.mock('components/ReviewsList/ReviewsList', () => ({
  default: vi.fn(() => <div data-testid="ReviewsList" />),
}));

vi.mock('components/StarRating/StarRating', () => ({
  default: vi.fn(() => <div data-testid="StarRating" />),
}));

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

const addProduct = vi.fn();

const Stub = createRoutesStub([
  {
    path: '/',
    Component: () => <Outlet context={{ products, addProduct }} />,
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

  screen.getByText(/7.99 €/i);
});

it('renders description', () => {
  setupOnExisitngProduct();

  screen.getByText(/some description text/i);
});

it('renders reviews', () => {
  setupOnExisitngProduct();

  screen.getByTestId('ReviewsList');
  expect(ReviewsList.mock.lastCall[0]).toEqual({
    reviews: 'reviewsExampleValue',
  });
});

it('renders rating', () => {
  setupOnExisitngProduct();

  screen.getByTestId('StarRating');
  expect(StarRating.mock.lastCall[0]).toEqual({
    rating: 3.27,
  });
});

it('renders a button that calls addProduct with current productId', async () => {
  const { user } = setupOnExisitngProduct();

  const button = screen.getByRole('button', { name: /add to cart/i });
  await user.click(button);

  expect(addProduct).toHaveBeenLastCalledWith('48');
});
