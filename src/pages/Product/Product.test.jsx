import { render, screen } from '@testing-library/react';
import Product from './Product';

import { createRoutesStub, Outlet } from 'react-router';
import { it } from 'vitest';

const products = [
  {
    id: 48,
    title: 'Bamboo Spatula',
    description: 'some text here',
    price: 7.99,
    rating: 3.27,
    reviews: [
      {
        rating: 5,
        comment: 'Awesome product!',
        date: '2025-04-30T09:41:02.053Z',
        reviewerName: 'Lucas Ramirez',
      },
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp',
    ],
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

it('renders no product found text when productId is incorrect', () => {
  render(<Stub initialEntries={['/product/11']} />);

  screen.getByText(/no product found/i);
});
