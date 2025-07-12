import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import StarRating from './StarRating';

it.each([
  { rating: 1, filled: 1 },
  { rating: 2, filled: 2 },
  { rating: 3, filled: 3 },
  { rating: 4, filled: 4 },
  { rating: 5, filled: 5 },
  { rating: undefined, filled: 5 },
  { rating: 6, filled: 5 },
  { rating: 0, filled: 1 },
  { rating: 3.55, filled: 4 },
  { rating: 2.22, filled: 2 },
])(
  'displays $filled filled stars when rating is $rating',
  ({ rating, filled }) => {
    render(<StarRating rating={rating} />);

    const filledStars = screen.getAllByTestId('star-filled');
    expect(filledStars.length).toBe(filled);
  }
);

it.each([
  { rating: 1, empty: 4 },
  { rating: 2, empty: 3 },
  { rating: 3, empty: 2 },
  { rating: 4, empty: 1 },
  { rating: 5, empty: 0 },
  { rating: undefined, empty: 0 },
  { rating: 6, empty: 0 },
  { rating: 0, empty: 4 },
  { rating: 3.55, empty: 1 },
  { rating: 2.22, empty: 3 },
])(
  'displays $empty empty stars when rating is $rating',
  ({ rating, empty }) => {
    render(<StarRating rating={rating} />);

    const emptyStars = screen.queryAllByTestId('star-empty');
    expect(emptyStars.length).toBe(empty);
  }
);
