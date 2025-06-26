import { describe, expect, it, vi } from 'vitest';
import {
  act,
  getByDisplayValue,
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

async function setupWithLinks() {
  const user = userEvent.setup();

  const Stub = createRoutesStub(routes);

  await act(async () => {
    render(<Stub initialEntries={['/']} />);
  });

  const navbar = screen.getByRole('navigation');

  const shopLink = getByRole(navbar, 'link', { name: /products/i });
  const cartLink = getByRole(navbar, 'link', { name: /cart/i });

  return { user, shopLink, cartLink };
}

async function setupOnErrorPage() {
  const user = userEvent.setup();

  const Stub = createRoutesStub(routes);
  render(<Stub initialEntries={['/null']} />);

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

  const cartLink = getByRole(navbar, 'link', { name: /cart/i });

  await user.click(cartLink);

  screen.getByText(/your cart/i);
});

it('renders shop now link in home', async () => {
  const { user } = await setup();

  const link = screen.getByRole('link', { name: /shop now/i });

  await user.click(link);

  screen.getByText(/all products/i);
});

it('renders a button that adds product to cart', async () => {
  const { user, cartLink, shopLink } = await setupWithLinks();

  await user.click(cartLink);

  const cartItem = screen.queryByText(/product name/i);
  expect(cartItem).not.toBeInTheDocument();

  await user.click(shopLink);

  const shopItem = screen.getByRole('link', { name: /product name/i });
  await user.click(shopItem);

  const addButton = screen.getByRole('button', { name: /add to cart/i });

  await user.click(addButton);

  expect(addButton).toHaveTextContent(/added/i);

  await user.click(cartLink);

  screen.getByText(/product name/i);
});

it('renders a button that increases quantity of products in cart', async () => {
  const { user, cartLink, shopLink } = await setupWithLinks();

  await user.click(shopLink);
  const productNameNode = screen.getByText(/product name/i);
  await user.click(productNameNode);

  const addButtonProduct = screen.getByRole('button', /add to cart/i);
  await user.click(addButtonProduct);

  await user.click(cartLink);

  const quantityWrapper = screen.getByText(/quantity/i).parentElement;
  const quantityNode = getByDisplayValue(quantityWrapper, /1/i);

  const addButtonCart = screen.getByRole('button', { name: /\+/i });
  await user.click(addButtonCart);

  expect(quantityNode).toHaveValue(2);
});

it('renders a button that decreases quantity of products in cart', async () => {
  const { user, cartLink, shopLink } = await setupWithLinks();

  await user.click(shopLink);
  const productNameNode = screen.getByText(/product name/i);
  await user.click(productNameNode);

  const addButtonProduct = screen.getByRole('button', /add to cart/i);
  await user.click(addButtonProduct);

  await user.click(cartLink);

  const quantityWrapper = screen.getByText(/quantity/i).parentElement;
  const quantityNode = getByDisplayValue(quantityWrapper, /1/i);

  const addButtonCart = screen.getByRole('button', { name: /\+/i });
  await user.click(addButtonCart);

  expect(quantityNode).toHaveValue(2);
  const removeButtonCart = screen.getByRole('button', { name: /-/i });

  await user.click(removeButtonCart);
  expect(quantityNode).toHaveValue(1);
});

it('renders a button that removes product when quantity is 1', async () => {
  const { user, cartLink, shopLink } = await setupWithLinks();

  await user.click(shopLink);
  const productNameNode = screen.getByText(/product name/i);
  await user.click(productNameNode);

  const addButtonProduct = screen.getByRole('button', /add to cart/i);
  await user.click(addButtonProduct);

  await user.click(cartLink);

  const quantityWrapper = screen.getByText(/quantity/i).parentElement;
  const quantityNode = getByDisplayValue(quantityWrapper, '1');

  expect(quantityNode).toHaveValue(1);
  const removeButtonCart = screen.getByRole('button', { name: /-/i });

  const productWrapper = quantityWrapper.parentElement;
  await user.click(removeButtonCart);
  expect(productWrapper).not.toBeInTheDocument();
});

it('calculates total price on cart page', async () => {
  const { user, shopLink, cartLink } = await setupWithLinks();

  await user.click(shopLink);

  const shopItem = screen.getByRole('link', { name: /product name/i });

  await user.click(shopItem);

  const addButtonProduct = screen.getByRole('button', /add to cart/i);
  await user.click(addButtonProduct);

  await user.click(cartLink);
  screen.getByText(/total price: 7.99 €/i);
});

it('renders a quantity input that changes total price', async () => {
  const { user, shopLink, cartLink } = await setupWithLinks();

  await user.click(shopLink);

  const shopItem = screen.getByRole('link', { name: /product name/i });

  await user.click(shopItem);

  const addButtonProduct = screen.getByRole('button', /add to cart/i);
  await user.click(addButtonProduct);

  await user.click(cartLink);
  const totalPriceNode = screen.getByText(/total price: 7.99 €/i);

  const input = screen.getByRole('spinbutton');
  expect(input).toHaveValue(1);

  await user.type(input, '1');

  expect(totalPriceNode).toHaveTextContent(/total price: 87.89 €/i);
});

it('renders footer', async () => {
  await setup();

  const footer = screen.getByRole('contentinfo');

  getByRole(footer, 'heading', { name: /contact/i });
  getByText(footer, /\+1 \(555\) 293-8472/i);
  getByText(footer, /support@kitchenmarket.com/i);
  getByRole(footer, 'heading', { name: /shipping address/i });
  getByText(footer, /Kitchen Market Supplies Ltd./i);
  getByText(footer, /1425 Maplewood Drive/i);
  getByText(footer, /United States/i);
});

it('renders error page on bad url', async () => {
  await setupOnErrorPage();

  screen.getByRole('heading', { level: 2, name: /404 error/i });
});

it('renders home link on error page', async () => {
  const { user } = await setupOnErrorPage();

  const homeLink = screen.getByRole('link', { name: /go home/i });
  await user.click(homeLink);

  screen.getByRole('heading', { name: /essentials for every kitchen/i });
});
