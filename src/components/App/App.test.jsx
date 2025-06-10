import { expect, it, vi } from 'vitest';
import {
  act,
  getByRole,
  getByText,
  render,
  screen,
} from '@testing-library/react';

import App from './App';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import { createRoutesStub, Outlet } from 'react-router';
import userEvent from '@testing-library/user-event';
import routes from 'src/routes';

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

global.fetch = vi.fn(() =>
  Promise.resolve({ json: () => Promise.resolve(products) })
);

async function setup() {
  const user = userEvent.setup();

  const Stub = createRoutesStub(routes);

  await act(async () => {
    render(<Stub initialEntries={['/']} />);
  });

  return { user };
}

it('renders home link in navbar', async () => {
  const { user } = await setup();

  const navbar = screen.getByRole('navigation');

  const homeLink = getByRole(navbar, 'link', { name: /kitchen market/i });

  await user.click(homeLink);

  screen.getByRole('heading', { name: /essentials for every kitchen/i });
});

it('renders shop link in navbar', async () => {
  const { user } = await setup();

  const navbar = screen.getByRole('navigation');

  const shopLink = getByRole(navbar, 'link', { name: /products/i });

  await user.click(shopLink);

  screen.getByText(/all products/i);
});

it('renders cart link in navbar', async () => {
  const { user } = await setup();

  const navbar = screen.getByRole('navigation');

  const shopLink = getByRole(navbar, 'link', { name: /cart/i });

  await user.click(shopLink);

  screen.getByText(/your cart/i);
});

it('renders footer', async () => {
  const { user } = await setup();

  const footer = screen.getByRole('contentinfo');

  getByRole(footer, 'heading', { name: /contact/i });
  getByText(footer, /\+1 \(555\) 293-8472/i);
  getByText(footer, /support@kitchenmarket.com/i);
  getByRole(footer, 'heading', { name: /shipping address/i });
  getByText(footer, /Kitchen Market Supplies Ltd./i);
  getByText(footer, /1425 Maplewood Drive/i);
  getByText(footer, /United States/i);
});
