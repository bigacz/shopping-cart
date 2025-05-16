import ReviewsList from './ReviewsList';
import { it } from 'vitest';
import { render, screen } from '@testing-library/react';

const reviews = [
  {
    reviewerName: 'John',
    comment: 'good',
    date: '2025-04-30T09:41:02.053Z',
    rating: 5,
  },
  {
    reviewerName: 'Anne',
    comment: 'bad',
    date: '2023-11-05T11:32:12.053Z',
    rating: 2,
  },
];

function setupWithOneReview() {
  render(<ReviewsList reviews={[reviews[0]]} />);
}

function setupWithTwoReviews() {
  render(<ReviewsList reviews={reviews} />);
}

it('renders no comments header when there are no reviews', () => {
  render(<ReviewsList />);

  screen.getByText(/no reviews/i);
});

it('renders reviewer name', () => {
  setupWithOneReview();

  screen.getByText(/John/i);
});

it('renders rating', () => {
  setupWithOneReview();

  screen.getByText(/loved it/i);
});

it('renders comment', () => {
  setupWithOneReview();

  screen.getByText(/good/i);
});

it('renders date', () => {
  setupWithOneReview();

  screen.getByText('30/04/2025');
});

it('renders multiple reviews', () => {
  setupWithTwoReviews();

  screen.getByText(/john/i);
  screen.getByText(/good/i);
  screen.getByText('30/04/2025');
  screen.getByText(/loved it/i);

  screen.getByText(/anne/i);
  screen.getByText(/bad/i);
  screen.getByText('05/11/2023');
  screen.getByText(/could be better/i);
});
