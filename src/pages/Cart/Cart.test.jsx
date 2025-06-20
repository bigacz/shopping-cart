import userEvent from '@testing-library/user-event';
import Cart from './Cart';

import { getByText, render, screen } from '@testing-library/react';
import { Component } from 'lucide-react';
import { createRoutesStub, Outlet } from 'react-router';
import { expect, it, vi } from 'vitest';

const products = [
  {
    id: 48,
    title: 'product name one',
    price: 7.99,
    images: ['https://placehold.co/600x400'],
  },
  {
    id: 52,
    title: 'product name two',
    price: 90.99,
    images: ['https://placehold.co/700x500'],
  },
];

const addProduct = vi.fn();
const removeProduct = vi.fn();

function setup() {
  const user = userEvent.setup();

  const cart = {
    48: 2,
  };

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <Outlet context={{ products, cart, addProduct, removeProduct }} />
      ),
      children: [
        {
          path: 'cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/cart']} />);

  return { user };
}

function setupTwoProducts() {
  const user = userEvent.setup();

  const cart = {
    48: 2,
    52: 1,
  };

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <Outlet context={{ products, cart, addProduct, removeProduct }} />
      ),

      children: [
        {
          path: 'cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/cart']} />);

  return { user };
}

function setupZeroProducts() {
  const user = userEvent.setup();

  const cart = {};

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <Outlet context={{ products, cart, addProduct, removeProduct }} />
      ),

      children: [
        {
          path: 'cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/cart']} />);

  return { user };
}

it('renders product name ', () => {
  setup();

  screen.getByText(/product name one/i);
});

it('renders product price ', () => {
  setup();

  screen.getByText(/7.99 €/i);
});

it('renders product quantity ', () => {
  setup();

  screen.getByText(/2/i);
});

it('renders product image', () => {
  setup();

  const image = screen.getByAltText(/product name one/i);
  expect(image).toHaveAttribute('src', 'https://placehold.co/600x400');
});

it('renders a button', () => {});

it('renders two products', () => {
  setupTwoProducts();

  screen.getByText(/product name one/i);
  screen.getByText(/7.99 €/i);
  screen.getByText(/2/i);
  const image1 = screen.getByAltText(/product name one/i);
  expect(image1).toHaveAttribute('src', 'https://placehold.co/600x400');

  screen.getByText(/product name two/i);
  screen.getByText(/90.99 €/i);
  screen.getByText('1');
  const image2 = screen.getByAltText(/product name two/i);
  expect(image2).toHaveAttribute('src', 'https://placehold.co/700x500');
});

it('renders cart is empty text when cart is empty', () => {
  setupZeroProducts();

  screen.getByText(/cart is empty/i);
});

it('renders no products when cart is empty', () => {
  setupZeroProducts();

  const item = screen.queryByText(/product name/i);
  expect(item).not.toBeInTheDocument();
});

it('renders 0 in total price when nothing is in cart', () => {
  setupZeroProducts();

  screen.getByText(/total price: 0 €/i);
});

it('calculates total price when two different products are in cart', () => {
  const cart = {
    48: 1,
    52: 1,
  };

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => <Outlet context={{ products, cart }} />,

      children: [
        {
          path: 'cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/cart']} />);

  screen.getByText(/total price: 98.98 €/i);
});

it('calculates total price when two same products are in cart', () => {
  const cart = {
    48: 2,
  };

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => <Outlet context={{ products, cart }} />,

      children: [
        {
          path: 'cart',
          Component: Cart,
        },
      ],
    },
  ]);

  render(<Stub initialEntries={['/cart']} />);

  screen.getByText(/total price: 15.98 €/i);
});

it('renders a checkout button when total price is greater than 0', () => {
  setupZeroProducts();

  screen.getByRole('button', { name: /checkout/i });
});

it('renders a disabled checkout button when total price is 0', () => {
  setup();

  const button = screen.getByRole('button', { name: /checkout/i });
  expect(button).toBeDisabled();
});
